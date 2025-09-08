"use client";
import { useMetadataStore } from "@/store/metadata-store";
import { useState } from "react";
import { startCheckout } from "@/lib/stripe/start-checkout";
import { currentLocalUserHasLicense } from "@/lib/stripe/user-has-license";
import { Button } from "./ui/button";
import { STRIPE_DISABLED } from "@/types/constants/stripe-constants";
import { useRouter } from "next/navigation";

export default function BuyButton() {
  const user = useMetadataStore((s) => s.user);
  const router = useRouter();

  const hasLicense = currentLocalUserHasLicense();

  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (!user?.id) {
      router.push("/login");
      return;
    }

    setLoading(true);
    await startCheckout(user.id, "monthly");
    setLoading(false);
  }

  return (
    <>
      {hasLicense ? (
        <h1 className="w-full text-center opacity-90">License Active</h1>
      ) : (
        <Button
          variant="secondary"
          className={`w-full font-header bg-secondary`}
          title="Buy Mudboard License"
          onClick={handleCheckout}
          disabled={STRIPE_DISABLED}
        >
          {loading ? "Redirecting..." : "Get License"}
        </Button>
      )}
    </>
  );
}
