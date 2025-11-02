"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ScreenTemplate from "@/components/screen-template";
import { FaApple } from "react-icons/fa6";
import DiscordButton from "@/components/ui/discord-button";
import EmailModal from "@/components/email-modal";
import { ButtonSquare } from "@/components/ui/button-square";
import { IOS_QUAIL_LINK } from "@/types/constants/constants";
import { trackEvent } from "@/lib/amplitude";

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
        page: "mobile_landing",
      });
    }
  }, [utmSource]);

  const handleIOSClick = () => {
    trackEvent("ios_download_click", { location: "mobile_landing" });
  };

  const handleAndroidDiscordClick = () => {
    trackEvent("android_discord_click", { location: "android_section" });
  };

  const handleEmailModalOpen = () => {
    setEmailModalOpen(true);
    trackEvent("android_email_modal_open", { location: "android_section" });
  };

  const handleFeedbackDiscordClick = () => {
    trackEvent("feedback_discord_click", { location: "feedback_section" });
  };
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
            <a
              href={IOS_QUAIL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleIOSClick}
              className="inline-flex items-center gap-2 px-6 py-2 bg-black dark:bg-white hover:bg-black/80 
              dark:hover:bg-white/80 text-white  dark:text-black rounded-xl 
            font-bold transition-all duration-150 shadow-lg hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              <FaApple className="size-5" />
              <span>iOS App Store</span>
            </a>
          </div>
        </div>

        {/* Android Box */}
        <div className="bg-surface rounded-xl shadow-md px-10 py-6 flex-1 flex flex-col items-center">
          <h2 className="font-header font-medium text-text text-2xl mb-1">
            Android
          </h2>
          <p className="text-text-light text-sm mb-4">Join our Open Beta!</p>
          {/* <div className="rounded-full bg-surface px-4 w-fit text-xs py-0.5 mb-4">
            <p className="text-white font-bold">Open Beta</p>
          </div> */}
          {/* <div className="h-px bg-border mb-4 mx-12" /> */}
          <div className="flex flex-col items-center gap-3">
            <div onClick={handleAndroidDiscordClick}>
              <DiscordButton text="Apply on Discord" />
            </div>
            <div className="flex items-center gap-3 w-full">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-text-light font-mono">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <ButtonSquare onClick={handleEmailModalOpen}>
              Enter your Email
            </ButtonSquare>
          </div>
        </div>
      </section>

      {/* Feedback/Community Section */}
      <section className="flex flex-col items-center justify-center max-w-4xl mx-auto px-6 mb-12">
        <p className="font-header text-sm md:text-base mb-4 text-center text-text-light">
          Have a question, or just want to share feedback?
        </p>
        <div onClick={handleFeedbackDiscordClick}>
          <DiscordButton variant="white" />
        </div>
      </section>

      <EmailModal open={emailModalOpen} setOpen={setEmailModalOpen} />
    </ScreenTemplate>
  );
}
