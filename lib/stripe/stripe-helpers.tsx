import Stripe from "stripe";
import {
  STRIPE_IS_PROD,
  StripeProduct,
  UserTier,
} from "../../types/stripe-settings";

const key = STRIPE_IS_PROD
  ? process.env.STRIPE_SECRET_KEY!
  : process.env.STRIPE_SANDBOX_SECRET_KEY!;

export const stripeClient = new Stripe(key, {
  apiVersion: "2025-05-28.basil",
});

export function getTierLevel(tier: StripeProduct): UserTier {
  if (tier === "license") {
    return "beta";
  }
  return "free";
}
