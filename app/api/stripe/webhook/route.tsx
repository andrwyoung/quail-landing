import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClientSudo } from "@/lib/supabase/supabase-server";
import { headers } from "next/headers";
import { getTierLevel, stripeClient } from "@/lib/stripe/stripe-helpers";
import {
  STRIPE_USE_LIVE,
  StripeProduct,
} from "@/types/constants/stripe-constants";
import { nowDate } from "@/utils/now-ms";

const endpointSecret = STRIPE_USE_LIVE
  ? process.env.STRIPE_WEBHOOK_SECRET!
  : // $ stripe listen --forward-to localhost:3000/api/stripe/webhook
    "whsec_Dx47GWKkneaQiyLQFYEqFqXB6l87dQ98";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    if (!endpointSecret) throw new Error("Missing signature or secret");

    const stripeSignature = (await headers()).get("stripe-signature");
    const rawBody = await req.text();

    event = stripeClient.webhooks.constructEvent(
      rawBody,
      stripeSignature as string,
      endpointSecret as string
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // OPTION 1: handle 1 time payments
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const tier = session.metadata?.type as StripeProduct;

    if (!userId || !tier) {
      console.error("No user_id or tier in session metadata");
      return NextResponse.json({ received: true });
    }

    // Update Supabase user record
    const supabase = await createClientSudo();

    const { error } = await supabase
      .from("profiles")
      .update({ subscription_tier: getTierLevel(tier), updated_at: nowDate() })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user license", error);
    } else {
      console.log(`User ${userId} upgraded`);
    }
  }

  return NextResponse.json({ received: true });
}
