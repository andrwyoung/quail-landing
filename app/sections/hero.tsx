"use client";
import FadingHighlight from "../../components/fading-text";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import RequestInviteButton from "@/components/request-invite-button";

function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

interface HeroProps {
  scrolled: boolean;
}

export default function Hero({ scrolled }: HeroProps) {
  return (
    <div className="flex flex-col items-start">
      <h1
        className="font-header font-medium leading-12 md:leading-16 lg:leading-20 text-left
           text-4xl md:text-5xl lg:text-6xl text-text mb-6"
      >
        World&apos;s First Memory Optimized Reader
      </h1>
      <FadeIn>
        <p className="text-md md:text-lg max-w-2xl mb-8">
          <FadingHighlight scrolled={scrolled} fontClass="">
            For busy readers who <strong>forget insights</strong> after reading
            books or newsletters. You import any text. We help you
          </FadingHighlight>{" "}
          <strong>remember what matters.</strong>
        </p>

        {/* Always visible email signup */}
        <div className="flex flex-col md:mr-20">
          <form className="flex gap-3 flex-wrap justify-start items-start ">
            {/* [GPT-5] (Edit made) Add required name input and optional phone input */}
            <Input
              type="text"
              required
              placeholder="Name"
              className="bg-surface min-w-[200px] flex-1"
            />
            <Input
              type="email"
              required
              placeholder="Email"
              className="bg-surface min-w-[280px] flex-1"
            />
            <Input
              type="tel"
              placeholder="Phone Number (Optional)"
              className="bg-surface min-w-[200px] flex-1"
            />
            <RequestInviteButton label="Request Invite" />
          </form>
          <div className="flex self-center gap-3 mt-3 text-sm text-text-light">
            <span className="px-3 py-1 rounded-md bg-surface/50 border border-border">
              No spam
            </span>
            <span className="px-3 py-1 rounded-md bg-surface/50 border border-border">
              1-click opt-out
            </span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
