"use client";
import { useEffect, useState } from "react";
import ScreenTemplate from "@/components/screen-template";
import { useMetadataStore } from "@/store/metadata-store";
import { startCheckout } from "@/lib/stripe/start-checkout";
import { getHasLicense } from "@/lib/stripe/user-has-license";
import LoginModal from "@/components/login-modal";
import { StripeProduct } from "@/types/constants/stripe-constants";
import { SubscriptionTier } from "@/types/user-types";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { PricingCard } from "./pricing-card";
import { useAppLinkSession } from "@/hooks/auth/use-app-link-session";

const MONTHLY_ORIGINAL = 14.99;
const MONTHLY_DISCOUNT = 8.97;
const ANNUAL_ORIGINAL = 12.0;
const ANNUAL_DISCOUNT = 5.97;
const LIFETIME_PRICE = 35;

const monthlyPercentOff = Math.round(
  ((MONTHLY_ORIGINAL - MONTHLY_DISCOUNT) / MONTHLY_ORIGINAL) * 100
);
const annualPercentOff = Math.round(
  ((ANNUAL_ORIGINAL - ANNUAL_DISCOUNT) / ANNUAL_ORIGINAL) * 100
);

export default function PricingPage() {
  const params = useSearchParams();

  const user = useMetadataStore((s) => s.user);
  const profile = useMetadataStore((s) => s.profile);
  const setRedirectedFromApp = useMetadataStore((s) => s.setRedirectedFromApp);
  const redirectedFromApp = useMetadataStore((s) => s.redirectedFromApp);

  const [loading, setLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // log in if done correctly
  useAppLinkSession();

  useEffect(() => {
    const checkout = params.get("checkout");
    const fromApp = params.get("fromApp") === "1";

    // handle checkout cancel case
    if (checkout === "cancelled" && fromApp) {
      setRedirectedFromApp(true);
      toast.info("Checkout was cancelled.");

      // clean link
      window.history.replaceState({}, "", "/pricing");
      return;
    }
  }, [params, setRedirectedFromApp]);

  async function handleCheckout(product: StripeProduct) {
    if (!user?.id) {
      setLoginModalOpen(true);
      return;
    }

    setLoading(true);
    await startCheckout(product, redirectedFromApp);
    setLoading(false);
  }

  const alreadyBought = getHasLicense(
    profile?.subscription_tier as SubscriptionTier
  );
  const buyButtonsDisabled = loading || alreadyBought;
  const ACTIVE_SUB_CTA = "Subscription Active";

  const monthlyCta = alreadyBought ? ACTIVE_SUB_CTA : "Get Started";
  const annualCta = alreadyBought ? ACTIVE_SUB_CTA : "Get Annual";
  const lifetimeCta = alreadyBought ? ACTIVE_SUB_CTA : "Claim Offer";

  return (
    <ScreenTemplate>
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <div className="flex flex-col items-center min-h-screen font-body px-6 py-16">
        <div
          className="relative max-w-[450px] group cursor-pointer mb-4 opacity-80"
          title="Apple??!!?!"
        >
          <Image
            src={"/splash/pricing.png"}
            alt="Pricing Image"
            width={1505}
            priority
            height={1068}
            className="opacity-100 select-none"
          />
        </div>
        <div className="max-w-5xl w-full mx-auto">
          <div className="flex flex-col items-center mb-20">
            <h1 className="font-header font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight mb-2">
              Pricing
            </h1>
            <p className="text-lg md:text-xl text-text-light max-w-2xl mx-auto">
              Simple plans with a simple promise.
            </p>
          </div>

          <div className="flex flex-col items-center mb-32">
            <h3 className="font-header font-medium text-xl mb-1">
              Our Promise To You:
            </h3>
            <p className="text-xs text-text-light/70 mb-6">
              Edward and Andrew — October 12, 2025
            </p>
            <div
              className="text-text-light  flex flex-col justify-between md:flex-row text-center
            max-w-2xl md:text-center gap-4 "
            >
              <div className="bg-surface rounded-md px-6 py-6 flex-1 ">
                <h4 className="font-header font-medium text-text text-lg mb-4">
                  1. Lock-in price forever
                </h4>
                <div className="h-px bg-border mb-1 mx-12" />

                <p>
                  Your price <strong>never changes</strong> as long as you stay
                  subscribed.
                </p>
              </div>

              <div className="bg-surface rounded-md px-6 py-6 flex-1">
                <h4 className="font-header font-medium text-text text-lg mb-4">
                  2. Keep all your features
                </h4>
                <div className="h-px bg-border mb-1 mx-12" />
                <p className="">
                  We will never remove or re-paywall any major features you
                  already have.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24">
            {/* Monthly */}
            <PricingCard
              title="Monthly"
              price={MONTHLY_DISCOUNT}
              original={MONTHLY_ORIGINAL}
              percentOff={monthlyPercentOff}
              period="mo"
              cta={monthlyCta}
              onClick={() => handleCheckout("monthly_price_1")}
              disabled={buyButtonsDisabled}
              features={[
                "Import unlimited articles, books, PDFs, and more",
                "Access to our custom memory optimization algorithm",
                "Unlimited spaced repetition cards",
                "Cancel anytime",
                "Try every feature for 14 days free. Cancel anytime.",
                "Consistent updates!",
              ]}
            />

            {/* Annual */}
            <PricingCard
              title="Annual"
              price={ANNUAL_DISCOUNT}
              original={ANNUAL_ORIGINAL}
              percentOff={annualPercentOff}
              period="mo"
              cta={annualCta}
              onClick={() => handleCheckout("annual_price_1")}
              disabled={buyButtonsDisabled}
              // badge="Save Annually"
              subtext="Billed yearly"
              features={[
                "Everything in Monthly",
                "Best value for consistent learners",
                "Priority support",
                "Year-club perks",
              ]}
            />

            {/* Lifetime */}
            <PricingCard
              title="Lifetime"
              price={LIFETIME_PRICE}
              cta={lifetimeCta}
              onClick={() => handleCheckout("lifetime_price_1")}
              disabled={buyButtonsDisabled}
              badge="Best Deal"
              highlight
              subtext="One-time payment. No subscription."
              features={[
                "Full access to everything",
                "One time payment",
                "Lifetime updates",
                "Be a Quail Early Supporter and lock in your access forever!",
              ]}
            />
          </div>
        </div>
      </div>
    </ScreenTemplate>
  );
}
