"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { useMetadataStore } from "@/store/metadata-store";
import { startCheckout } from "@/lib/stripe/start-checkout";
import { getHasLicense } from "@/lib/stripe/user-has-license";
import LoginModal from "@/components/login-modal";
import { StripeProduct } from "@/types/constants/stripe-constants";
import { SubscriptionTier } from "@/types/user-types";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase-client";
import { toast } from "sonner";
import Footer from "@/components/navigation/footer";

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
  const setUser = useMetadataStore((s) => s.setUser);
  const setProfile = useMetadataStore((s) => s.setProfile);
  const setRedirectedFromApp = useMetadataStore((s) => s.setRedirectedFromApp);
  const redirectedFromApp = useMetadataStore((s) => s.redirectedFromApp);

  const [loading, setLoading] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    const checkout = params.get("checkout");
    const fromApp = params.get("fromApp") === "1";

    // edge case: came back from a cancelled checkout and originally from app
    if (checkout === "cancelled" && fromApp) {
      setRedirectedFromApp(true);
      toast.info("Checkout was cancelled.");

      // clean link
      window.history.replaceState({}, "", "/pricing");
      return;
    }

    if (!accessToken || !refreshToken) {
      console.warn("no tokens in URL → likely not coming from mobile.");
      return;
    }

    (async () => {
      try {
        // hydrate Supabase session
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) throw error;
        // toast.success("Signed in via mobile session!");

        // Get user + profile directly
        const {
          data: { user },
        } = await supabase.auth.getUser(accessToken);

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user?.id)
          .single();

        setUser(user);
        setProfile(profile);
        setRedirectedFromApp(true);

        // Remove tokens from URL
        window.history.replaceState({}, "", "/pricing");
      } catch (e) {
        console.error("[pricing] auto-login failed", e);
      }
    })();
  }, [params, setUser, setProfile, setRedirectedFromApp]);

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
    <main className="text-text bg-background  overflow-x-clip">
      <Navbar />
      <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
      <div className="flex flex-col items-center min-h-screen font-body px-6 py-16">
        <div className="max-w-5xl w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-header mb-3">Pricing</h1>
            <p className="text-text-light text-base md:text-lg">
              Simple plans to help you remember what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Monthly */}
            <div className="rounded-2xl border border-primary/20 bg-surface p-6 md:p-8 flex flex-col">
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
                {/* [GPT-5] (Edit made) Update Monthly features per request */}
                <li>• Full access to spaced review</li>
                <li>• Works with articles, PDFs, and more</li>
                <li>• Cancel anytime</li>
                {/* [GPT-5] (Edit made) Additive bullets, not replacements */}
                <li>• Try every feature for 14 days free. Cancel anytime.</li>
                <li>• Access to our memory optimization algorithm</li>
                <li>• Lock in your price.</li>
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
            <div className="relative rounded-2xl border border-primary/20 bg-surface p-6 md:p-8 flex flex-col">
              <div className="absolute -top-3 left-6">
                <span className="inline-flex items-center rounded-full bg-primary text-text-inverse px-3 py-1 text-xs font-semibold shadow-sm">
                  {/* [GPT-5] (Edit made) Rename badge */}
                  Best value
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
                {/* [GPT-5] (Edit made) Update Annual features per request */}
                <li>• Everything in Monthly</li>
                <li>• Best value for consistent learners</li>
                <li>• Priority support</li>
                {/* [GPT-5] (Edit made) Additive bullets, not replacements */}
                <li>• Try every feature for 14 days free. Cancel anytime.</li>
                <li>• Access to our memory optimization algorithm</li>
                <li>• Lock in your price.</li>
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

          {
            /* Limited-time offer */
            // [GPT-5] (Edit made) Add red/pink "Best ceal" tag next to the existing offer tag
          }
          <div className="mt-10 md:mt-12 mb-24">
            <div className="rounded-2xl border border-primary/20 bg-surface p-6 md:p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="inline-flex items-center rounded-full bg-primary text-text-inverse px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-sm">
                  Very limited time offer
                </span>
                <span className="inline-flex items-center rounded-full bg-rose-500 text-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide shadow-sm">
                  {/* [GPT-5] (Edit made) Fix typo */}
                  Best deal
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-header mb-1">
                ${LIFETIME_PRICE}
              </div>
              {/* [GPT-5] (Edit made) Update lifetime subheaders */}
              <div className="text-text-light">
                One‑time payment. No subscription.
              </div>
              <div className="text-text-light mb-4">Incredible value.</div>
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
      </div>
      <Footer />
    </main>
  );
}
