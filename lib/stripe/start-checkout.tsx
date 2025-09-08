import { StripeProduct } from "@/types/constants/stripe-constants";
import { toast } from "sonner";

export async function startCheckout(userId: string, product: StripeProduct) {
  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ userId, product }),
    });

    if (!res.ok) {
      throw new Error(
        `Stripe checkout failed (${res.status} ${res.statusText})`
      );
    }

    const { url } = await res.json();
    window.location.href = url;
  } catch (e) {
    console.error(e);
    toast.error("Failed to load checkout");
  }
}
