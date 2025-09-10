import { StripeProduct } from "@/types/constants/stripe-constants";
import { toast } from "sonner";
import { supabase } from "../supabase/supabase-client";

export async function startCheckout(product: StripeProduct) {
  try {
    // Always pull the current access token
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session?.access_token) {
      throw new Error("No Supabase session");
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ product }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Checkout error:", res.status, res.statusText, text);
      throw new Error(`Stripe checkout failed (${res.status})`);
    }

    const { url } = await res.json();
    window.location.href = url;
  } catch (e) {
    console.error(e);
    toast.error("Failed to start checkout");
  }
}
