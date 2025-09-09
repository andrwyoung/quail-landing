"use client";
import { useState } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useMetadataStore } from "@/store/metadata-store";
import { startCheckout } from "@/lib/stripe/start-checkout";
import { getHasLicense } from "@/lib/stripe/user-has-license";
import LoginModal from "@/components/login-modal";
import { StripeProduct } from "@/types/constants/stripe-constants";
import { SubscriptionTier } from "@/types/user-types";

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
  const user = useMetadataStore((s) => s.user);
  const profile = useMetadataStore((s) => s.profile);
  const [loading, setLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  async function handleCheckout(product: StripeProduct) {
    if (!user?.id) {
      setLoginModalOpen(true);
      return;
    }

    setLoading(true);
    await startCheckout(user.id, product);
    setLoading(false);
  }

  const alreadyBought = getHasLicense(profile?.subscription_tier as SubscriptionTier);
  const buyButtonsDisabled = loading || alreadyBought;
  const ACTIVE_SUB_CTA = "Subscription Active";

  const monthlyCta = alreadyBought ? ACTIVE_SUB_CTA : "Get Started";
  const annualCta = alreadyBought ? ACTIVE_SUB_CTA : "Get Annual";
  const lifetimeCta = alreadyBought ? ACTIVE_SUB_CTA : "Claim Offer";

  return (
    <>
      <Navbar />
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <main className="flex flex-col items-center min-h-screen bg-background text-text font-body px-6 py-16">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-header mb-3">Pricing</h1>
            <p className="text-text-light text-base md:text-lg">
              Simple plans to help you remember what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Monthly */}
            <div className="rounded-2xl border border-primary/20 bg-secondary-bg p-6 md:p-8 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-header text-2xl">Monthly</h2>
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                  {monthlyPercentOff}% off
                </span>
              </div>

              <div className="mb-6">
                <div className="text-text-light text-sm line-through">
                  ${MONTHLY_ORIGINAL.toFixed(2)}/mo
                </div>
                <div className="text-4xl md:text-5xl font-header tracking-tight">
                  ${MONTHLY_DISCOUNT.toFixed(2)}
                  <span className="text-xl align-top ml-1">/mo</span>
                </div>
              </div>

              <ul className="text-sm md:text-base text-text-light space-y-2 mb-6">
                <li>• Full access to spaced review</li>
                <li>• Works with articles, PDFs, and more</li>
                <li>• Cancel anytime</li>
              </ul>

              <Button
                onClick={() => handleCheckout("monthly_price_1")}
                type="button"
                disabled={buyButtonsDisabled}
                className="mt-auto inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary text-text-inverse hover:bg-primary-hover transition-colors px-6 py-2 font-bold"
              >
                {monthlyCta}
              </Button>
            </div>

            {/* Annual */}
            <div className="relative rounded-2xl border border-primary/20 bg-secondary-bg p-6 md:p-8 flex flex-col">
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center rounded-full bg-primary text-text-inverse px-3 py-1 text-xs font-semibold shadow-sm">
                  Best deal
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="font-header text-2xl">Annual</h2>
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                  {annualPercentOff}% off
                </span>
              </div>

              <div className="mb-6">
                <div className="text-text-light text-sm line-through">
                  ${ANNUAL_ORIGINAL.toFixed(2)}/mo
                </div>
                <div className="text-4xl md:text-5xl font-header tracking-tight">
                  ${ANNUAL_DISCOUNT.toFixed(2)}
                  <span className="text-xl align-top ml-1">/mo</span>
                </div>
                <div className="text-xs text-text-light mt-1">
                  Billed yearly
                </div>
              </div>

              <ul className="text-sm md:text-base text-text-light space-y-2 mb-6">
                <li>• Everything in Monthly</li>
                <li>• Best value for consistent learners</li>
                <li>• Priority support</li>
              </ul>

              <Button
                onClick={() => handleCheckout("annual_price_1")}
                disabled={buyButtonsDisabled}
                type="button"
                className="mt-auto inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary text-text-inverse hover:bg-primary-hover transition-colors px-6 py-2 font-bold"
              >
                {annualCta}
              </Button>
            </div>
          </div>

          {/* Limited-time offer */}
          <div className="mt-10 md:mt-12">
            <div className="rounded-2xl border border-primary/20 bg-secondary-bg p-6 md:p-8 text-center">
              <div className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
                Very limited time offer
              </div>
              <div className="text-3xl md:text-4xl font-header mb-1">
                ${LIFETIME_PRICE}
              </div>
              <div className="text-text-light mb-4">Price of a book</div>
              <Button
                onClick={() => handleCheckout("lifetime_price_1")}
                disabled={buyButtonsDisabled}
                type="button"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary 
                text-text-inverse hover:bg-primary-hover transition-colors px-8 min-w-48 py-2 font-bold"
              >
                {lifetimeCta}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
