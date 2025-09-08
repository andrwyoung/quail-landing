import Stripe from "stripe";
import {
  STRIPE_IS_PROD,
  StripeProduct,
} from "../../types/constants/stripe-constants";
import { SubscriptionTier } from "@/types/user-types";

const key = STRIPE_IS_PROD
  ? process.env.STRIPE_SECRET_KEY!
  : process.env.STRIPE_SANDBOX_SECRET_KEY!;

export const stripeClient = new Stripe(key, {
  apiVersion: "2025-08-27.basil",
});

export function getTierLevel(tier: StripeProduct): SubscriptionTier | null {
  if (tier === "monthly_price_1") return "monthly_1";
  if (tier === "annual_price_1") return "annual_1";
  if (tier === "lifetime_price_1") return "lifetime_1";

  return null;
}

export function isSubscription(tier: StripeProduct): boolean {
  if (tier === "monthly_price_1" || tier === "annual_price_1") return true;
  return false;
}
