export const STRIPE_IS_PROD = process.env.NODE_ENV === "production";
export const STRIPE_DISABLED =
  process.env.FORCE_DISABLE_STRIPE === "true" && STRIPE_IS_PROD;

export const STRIPE_PRICE_IDS: Record<
  StripeProduct,
  { live: string; sandbox: string }
> = {
  license: {
    live: "price_1RfXbrJcOESYvFKz9eJD9EB5",
    sandbox: "price_1RfWTIQoMcencYPuYkMzd3Kr",
  },
  pro: {
    live: "price_1RfXqUJcOESYvFKzHhgmaQlR",
    sandbox: "price_1RfnSaQoMcencYPuSBKhb7Tn",
  },
};

export const STRIPE_SUCCESS_PATH = "/checkout/success";
export const STRIPE_CANCEL_PATH = "/dashboard?checkout=cancelled";

export type StripeProduct = "license" | "pro";
export const VALID_STRIPE_PRODUCTS = Object.keys(
  STRIPE_PRICE_IDS
) as StripeProduct[];
