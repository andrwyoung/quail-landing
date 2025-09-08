import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClientSudo } from "@/lib/supabase/supabase-server";
import { headers } from "next/headers";
import {
  STRIPE_IS_PROD,
  StripeProduct,
} from "@/types/constants/stripe-constants";
import { getTierLevel, stripeClient } from "@/lib/stripe/stripe-helpers";

const endpointSecret = STRIPE_IS_PROD
  ? process.env.STRIPE_WEBHOOK_SECRET!
  : "whsec_ec3d199a94d0a6cbf0088bc4d4b237ac6621f023984c34b3190309e9ba7217b5";

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

  // Handle the event
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
      .from("users")
      .update({ tier: getTierLevel(tier) })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user license", error);
    } else {
      console.log(`User ${userId} upgraded`);
    }
  }

  return NextResponse.json({ received: true });
}
