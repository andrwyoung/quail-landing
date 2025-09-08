export const STRIPE_IS_PROD = process.env.NODE_ENV === "production";
export const STRIPE_DISABLED =
  process.env.FORCE_DISABLE_STRIPE === "true" && STRIPE_IS_PROD;

export type StripeProduct = "monthly" | "annual" | "lifetime";
export const STRIPE_PRICE_IDS: Record<
  StripeProduct,
  { live: string; sandbox: string }
> = {
  monthly: {
    live: "price_1RfXbrJcOESYvFKz9eJD9EB5",
    sandbox: "price_1RfWTIQoMcencYPuYkMzd3Kr",
  },
  annual: {
    live: "price_1RfXqUJcOESYvFKzHhgmaQlR",
    sandbox: "price_1RfnSaQoMcencYPuSBKhb7Tn",
  },
  lifetime: {
    live: "price_1RfXqUJcOESYvFKzHhgmaQlR",
    sandbox: "price_1RfnSaQoMcencYPuSBKhb7Tn",
  },
};

export const STRIPE_SUCCESS_PATH = "/checkout/success";
export const STRIPE_CANCEL_PATH = "/?checkout=cancelled";

export const VALID_STRIPE_PRODUCTS = Object.keys(
  STRIPE_PRICE_IDS
) as StripeProduct[];
