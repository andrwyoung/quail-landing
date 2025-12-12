"use client";
import FadingHighlight from "../../components/fading-text";
import FadeInOnScroll, {
  FadeIn,
} from "@/components/ui/animations/fade-in-on-scroll";
import Pop from "@/components/ui/animations/pop";
import { IosAppStoreButton } from "@/components/ui/ctas/ios-app-store-button";
import { GooglePlayButton } from "@/components/ui/ctas/google-play-button";

interface HeroProps {
  scrolled: boolean;
}

const PAGE_TRACKING_LOCATION = "main_page_hero";
export default function Hero({ scrolled }: HeroProps) {
  return (
    <div className="flex flex-col items-start">
      <FadeIn>
        <h1
          className="font-header font-medium leading-15 md:leading-16 lg:leading-20 text-left
           text-5xl md:text-5xl lg:text-6xl text-text mb-6"
        >
          World&apos;s First <Pop>Memory Optimized Reader</Pop>
        </h1>
      </FadeIn>
      <FadeInOnScroll>
        <p className="text-md md:text-lg max-w-2xl mb-8">
          <FadingHighlight scrolled={scrolled} fontClass="">
            For busy readers who <strong>forget insights</strong> after reading
            books or newsletters. You import any text. We help you
          </FadingHighlight>{" "}
          <strong>remember what matters!</strong>
        </p>

        {/* Always visible email signup */}
        <div className="flex flex-col md:mr-20 items-center md:items-start">
          <p className="mb-2 font-medium">Download now! 100% free to use</p>
          {/* <EmailSignup /> */}
          <div className="flex md:flex-row gap-4 flex-col">
            <IosAppStoreButton trackingLocation={PAGE_TRACKING_LOCATION} />
            <GooglePlayButton trackingLocation={PAGE_TRACKING_LOCATION} />
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
