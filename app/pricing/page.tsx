"use client";
// [GPT-5] (Edit made) Keep navbar on pricing page and mirror scroll behavior

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
// [GPT-5] (Edit made) Implement pricing page with two tiers and limited-time offer

export default function PricingPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const monthlyOriginal = 14.99;
  const monthlyDiscount = 8.97;
  const annualOriginal = 12.0;
  const annualDiscount = 5.97;

  const monthlyPercentOff = Math.round(
    ((monthlyOriginal - monthlyDiscount) / monthlyOriginal) * 100
  );
  const annualPercentOff = Math.round(
    ((annualOriginal - annualDiscount) / annualOriginal) * 100
  );

  return (
    <>
      <Navbar scrolled={scrolled} />
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
              <div className="text-text-light text-sm line-through">${monthlyOriginal.toFixed(2)}/mo</div>
              <div className="text-4xl md:text-5xl font-header tracking-tight">${monthlyDiscount.toFixed(2)}<span className="text-xl align-top ml-1">/mo</span></div>
            </div>

            <ul className="text-sm md:text-base text-text-light space-y-2 mb-6">
              <li>• Full access to spaced review</li>
              <li>• Works with articles, PDFs, and more</li>
              <li>• Cancel anytime</li>
            </ul>

            <a
              href="/#cta"
              className="mt-auto inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary text-text-inverse hover:bg-primary-hover transition-colors px-6 py-2 font-bold"
            >
              Get started
            </a>
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
              <div className="text-text-light text-sm line-through">${annualOriginal.toFixed(2)}/mo</div>
              <div className="text-4xl md:text-5xl font-header tracking-tight">${annualDiscount.toFixed(2)}<span className="text-xl align-top ml-1">/mo</span></div>
              <div className="text-xs text-text-light mt-1">Billed yearly</div>
            </div>

            <ul className="text-sm md:text-base text-text-light space-y-2 mb-6">
              <li>• Everything in Monthly</li>
              <li>• Best value for consistent learners</li>
              <li>• Priority support</li>
            </ul>

            <a
              href="/#cta"
              className="mt-auto inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary text-text-inverse hover:bg-primary-hover transition-colors px-6 py-2 font-bold"
            >
              Get annual
            </a>
          </div>
        </div>

        {/* Limited-time offer */}
        <div className="mt-10 md:mt-12">
          <div className="rounded-2xl border border-primary/20 bg-secondary-bg p-6 md:p-8 text-center">
            <div className="text-sm text-primary font-semibold uppercase tracking-wide mb-2">
              Very limited time offer
            </div>
            <div className="text-3xl md:text-4xl font-header mb-1">$35</div>
            <div className="text-text-light mb-4">Price of a book</div>
            <a
              href="/#cta"
              className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-primary text-text-inverse hover:bg-primary-hover transition-colors px-6 py-2 font-bold"
            >
              Claim offer
            </a>
          </div>
        </div>
        </div>
      </main>
    </>
  );
}


