import { createClientSudo } from "@/lib/supabase/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import {
  STRIPE_CANCEL_PATH,
  STRIPE_PRICE_IDS,
  STRIPE_SUCCESS_PATH,
  STRIPE_USE_LIVE,
  StripeProduct,
  VALID_STRIPE_PRODUCTS,
} from "@/types/constants/stripe-constants";
import { isSubscription, stripeClient } from "@/lib/stripe/stripe-helpers";

export async function POST(req: NextRequest) {
  if (process.env.FORCE_DISABLE_STRIPE === "true") {
    return new NextResponse("Stripe is disabled", { status: 403 });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  const supabase = await createClientSudo();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error("Failed to get user");
  }

  if (!user?.id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const body = await req.json();
  const productType: StripeProduct = body.product;
  const redirectedFromApp = body.redirectedFromApp;

  if (!VALID_STRIPE_PRODUCTS.includes(productType)) {
    return new NextResponse("Invalid product type", { status: 400 });
  }

  if (!productType) {
    throw new Error("Failed to get product type");
  }

  try {
    const session = await stripeClient.checkout.sessions.create({
      mode: isSubscription(productType) ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_USE_LIVE
            ? STRIPE_PRICE_IDS[productType].live
            : STRIPE_PRICE_IDS[productType].sandbox,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: redirectedFromApp
        ? `quailreader://checkout/success?product=${productType}`
        : `${req.nextUrl.origin}${STRIPE_SUCCESS_PATH}?product=${productType}`,

      cancel_url: redirectedFromApp
        ? `quailreader://checkout/cancel`
        : `${req.nextUrl.origin}${STRIPE_CANCEL_PATH}`,
      metadata: {
        user_id: user.id,
        type: productType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return new NextResponse("Failed to create Stripe session", { status: 500 });
  }
}
