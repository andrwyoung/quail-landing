"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ScreenTemplate from "@/components/screen-template";
import DiscordButton from "@/components/ui/discord-button";
import EmailModal from "@/components/email-modal";
import { AppStoreButton } from "@/components/ui/ctas/app-store-button";
import { GooglePlayButton } from "@/components/ui/ctas/google-play-button";
import { trackEvent } from "@/lib/amplitude";

const PAGE_TRACKING_LOCATION = "mobile_landing";
export default function MobileLandingPage() {
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const utmSource = searchParams.get("utm_source");

  // Track UTM source
  useEffect(() => {
    if (utmSource) {
      console.log("User came from:", utmSource);
      // Store in sessionStorage for tracking throughout the session
      sessionStorage.setItem("utm_source", utmSource);

      // Track UTM source in Amplitude
      trackEvent("landing_page_visit", {
        page: PAGE_TRACKING_LOCATION,
      });
    }
  }, [utmSource]);

  return (
    <ScreenTemplate>
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center mt-16 lg:mt-24 mb-8 lg:mb-16 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-header font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight mb-3 text-text">
          The World&apos;s First Memory Optimized Reader
        </h1>
        <p className="font-header text-sm md:text-lg lg:text-xl md:text-text mb-2 text-text-light">
          Read your entire reading list at once, remember everything.
        </p>
      </section>

      {/* Mobile App Download Section */}
      <section className="flex flex-col md:flex-row  gap-8 w-full sm:w-auto max-w-2xl mx-auto px-6 mb-24">
        {/* iOS Box */}
        <div className="bg-surface rounded-xl shadow-md px-10 py-6 flex flex-col items-center">
          <h2 className="font-header font-medium text-text text-2xl mb-1">
            iOS
          </h2>
          <p className="text-text-light text-sm mb-4">
            Download on the app store!
          </p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <AppStoreButton trackingLocation={PAGE_TRACKING_LOCATION} />
          </div>
        </div>

        {/* Android Box */}
        <div className="bg-surface rounded-xl shadow-md px-10 py-6 flex-1 flex flex-col items-center">
          <h2 className="font-header font-medium text-text text-2xl mb-1">
            Android
          </h2>
          <p className="text-text-light text-sm mb-4">
            Download in the Play store!
          </p>
          <div className="flex-1 flex flex-col items-center justify-center">
            <GooglePlayButton trackingLocation={PAGE_TRACKING_LOCATION} />
          </div>
        </div>
      </section>

      {/* Feedback/Community Section */}
      <section className="flex flex-col items-center justify-center max-w-4xl mx-auto px-6 mb-12">
        <p className="font-header text-sm md:text-base mb-4 text-center text-text-light">
          Have a question, or just want to share feedback?
        </p>
        <DiscordButton
          variant="white"
          trackingLocation={PAGE_TRACKING_LOCATION}
        />
      </section>

      <EmailModal open={emailModalOpen} setOpen={setEmailModalOpen} />
    </ScreenTemplate>
  );
}
