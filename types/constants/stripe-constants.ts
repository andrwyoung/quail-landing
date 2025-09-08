export const STRIPE_USE_LIVE = false && process.env.NODE_ENV === "production";
export const STRIPE_DISABLED = process.env.FORCE_DISABLE_STRIPE === "true";

export type StripeProduct =
  | "monthly_price_1"
  | "annual_price_1"
  | "lifetime_price_1";
export const STRIPE_PRICE_IDS: Record<
  StripeProduct,
  { live: string; sandbox: string }
> = {
  monthly_price_1: {
    live: "",
    sandbox: "price_1S4r54FEpOpwp9xeNza6fWLg",
  },
  annual_price_1: {
    live: "",
    sandbox: "price_1S59d9FEpOpwp9xefHrOupxY",
  },
  lifetime_price_1: {
    live: "",
    sandbox: "price_1S4r5sFEpOpwp9xewpj9C8ft",
  },
};

export const STRIPE_SUCCESS_PATH = "/checkout/success";
export const STRIPE_CANCEL_PATH = "/pricing?checkout=cancelled";
export const STRIPE_CHECKOUT_SUCCESS_PATH = "/";

export const VALID_STRIPE_PRODUCTS = Object.keys(
  STRIPE_PRICE_IDS
) as StripeProduct[];
