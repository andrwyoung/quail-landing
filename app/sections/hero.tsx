"use client";
import FadingHighlight from "../../components/fading-text";
import EmailSignup from "@/components/email-signup";
import FadeInOnScroll, {
  FadeIn,
} from "@/components/ui/animations/fade-in-on-scroll";

interface HeroProps {
  scrolled: boolean;
}

export default function Hero({ scrolled }: HeroProps) {
  return (
    <div className="flex flex-col items-start">
      <FadeIn>
        <h1
          className="font-header font-medium leading-12 md:leading-16 lg:leading-20 text-left
           text-4xl md:text-5xl lg:text-6xl text-text mb-6"
        >
          World&apos;s First Memory Optimized Reader
        </h1>
      </FadeIn>
      <FadeInOnScroll>
        <p className="text-md md:text-lg max-w-2xl mb-8">
          <FadingHighlight scrolled={scrolled} fontClass="">
            For busy readers who <strong>forget insights</strong> after reading
            books or newsletters. You import any text. We help you
          </FadingHighlight>{" "}
          <strong>remember what matters.</strong>
        </p>

        {/* Always visible email signup */}
        <div className="flex flex-col md:mr-20">
          <EmailSignup />
        </div>
      </FadeInOnScroll>
    </div>
  );
}
