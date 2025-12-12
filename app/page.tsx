"use client";
import Navbar from "../components/navigation/navbar";
import FAQ from "./sections/faq";
import ForgettingCurve from "../components/forgetting-curve";
import Image from "next/image";
import { usePageScroll } from "@/hooks/use-page-scroll";
import Footer from "@/components/navigation/footer";
import { FaFeatherPointed } from "react-icons/fa6";
import Hero from "./sections/hero";
import FadeInOnScroll from "@/components/ui/animations/fade-in-on-scroll";
import { motion } from "framer-motion";
import { EmailSignupHandle } from "@/components/email-signup";
import { useRef } from "react";
import ThemeImage from "@/components/ui/theme-image";
import { GooglePlayButton } from "@/components/ui/ctas/google-play-button";
import { IosAppStoreButton } from "@/components/ui/ctas/ios-app-store-button";
import DiscordButton from "@/components/ui/discord-button";

const PAGE_TRACKING_LOCATION = "main_bottom_cta";
const steps = [
  {
    title: "Import anything",
    text: (
      <>
        PDFs, EPUBS, newsletters, web clips{" "}
        <strong>seamlessly in one place</strong>.
      </>
    ),
  },
  {
    title: "Clip what matters",
    text: (
      <>
        Highlight while reading. <strong>Context saves automatically</strong>.
        No extra steps.
      </>
    ),
  },
  {
    title: "Review on time",
    text: (
      <>
        Short refreshers arrive <strong>just before</strong> you’d forget.
        Effortless retention.
      </>
    ),
  },
];

const loopSteps = [
  {
    title: "Read normally",
    text: "Open anything in your library and read as usual - no new workflow to learn.",
  },
  {
    title: "Clip what matters",
    text: "Highlight a sentence or block that's important. Each clip gets automatically scheduled to come back when you need to see it again - no setup required.",
  },
  {
    title: "Review at the right time",
    text: "Each day, a short review shows only what’s due - arriving right before you’d forget - so the important ideas stick while the noise falls away.",
  },
];

// let lastConfettiTime = 0;
// const COOLDOWN_MS = 2000; // 2 seconds

export default function Home() {
  const { scrolled } = usePageScroll();
  const signupRef = useRef<EmailSignupHandle>(null);

  // const handleConfetti = (e: React.MouseEvent) => {
  //   const now = Date.now();
  //   if (now - lastConfettiTime < COOLDOWN_MS) return;
  //   lastConfettiTime = now;

  //   fireConfetti(e.clientX, e.clientY);
  // };

  return (
    <main className="relative flex flex-col items-center min-h-screen bg-background text-text font-body overflow-x-clip">
      <Navbar scrolled={scrolled} signupRef={signupRef} />

      {/* Hero Section with full-width gradient - extended to cover navbar area */}
      <section
        id="home"
        className="relative overflow-hidden w-full -mt-[80px] pt-[80px]"
        style={{
          minHeight: "calc(100vh - 0px)",
          background: `
            radial-gradient(1800px 900px at 50% 0%, color-mix(in oklab, var(--color-primary) 20%, transparent) 0%, transparent 65%),
            radial-gradient(1400px 750px at 20% 15%, color-mix(in oklab, var(--color-accent) 14%, transparent) 0%, transparent 30%),
            linear-gradient(180deg, color-mix(in oklab, var(--color-background) 92%, #000 8%), var(--color-background))
          `,
        }}
      >
        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />

        <div
          className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-7xl px-4 
        md:px-6 items-center justify-center min-h-[65vh] pt-[14vh] mx-auto"
        >
          <Hero scrolled={scrolled} />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative max-w-xs md:max-w-md xl:max-w-xl group cursor-pointer select-none"
            title="Hi!"
            // onClick={handleConfetti}
          >
            {/* default image */}
            <ThemeImage
              src={"/landing-page/books1.png"}
              alt="Hero Image"
              width={1932}
              priority={true}
              height={1382}
              className="opacity-100 group-hover:opacity-0 select-none"
            />
            <ThemeImage
              src={"/landing-page/books2.png"}
              alt="Hero Image Hover"
              width={1932}
              priority={true}
              height={1382}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 select-none"
            />
          </motion.div>
        </div>
      </section>

      {/* <section className="max-w-2xl mb-28">
        <Testimonials />
      </section> */}

      {/* Forgetting Statistic Section */}
      <section
        className="max-w-3xl mx-auto mt-48 md:mt-12 mb-28 px-2 flex flex-col items-center 
      text-center rounded-2xl"
      >
        <h2 className="font-header font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight px-4">
          You forget 70% in a day and 90% in a week
        </h2>
        <FadeInOnScroll className="relative w-full max-w-xl px-6 py-6 ">
          <ForgettingCurve />
        </FadeInOnScroll>
      </section>

      {/* How It Works Section - Simplified */}

      <section
        id="how"
        className="max-w-7xl mx-auto mt-8 mb-32 px-6 flex flex-col items-center"
      >
        <FadeInOnScroll>
          <div className="relative max-w-md mb-18 self-center group"></div>
          <div className="text-center mb-18 ">
            <div className="text-xs uppercase tracking-wider font-bold text-text-light mb-3">
              How Quail works
            </div>
            <h2 className="font-header text-3xl md:text-4xl font-medium text-text">
              Designed for retention
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-16 mb-32 md:mb-20">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* hanging book */}
                <Image
                  src={`/landing-page/number-books/book-num${idx + 1}.png`}
                  alt="Book icon"
                  width={200}
                  height={240}
                  className="absolute -top-6 left-6 w-18 object-contain z-10 "
                />

                <div
                  className="flex flex-col gap-4 relative bg-surface border 
              border-border rounded-xl px-4 py-4 shadow-md overflow-clip z-0"
                >
                  {/* gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-bl from-primary/1 hover:from-primary/5
                to-transparent transition-all duration-300"
                  />

                  {/* title */}
                  <div className="flex items-center pl-24 ">
                    <h3 className="text-xl xl:text-2xl font-header font-medium text-primary-text z-10">
                      {step.title}
                    </h3>
                  </div>

                  <div
                    aria-hidden="true"
                    className="w-full border-t border-border"
                  />

                  <div className="absolute left-0 right-0 top-0 bg-primary/15 z-5" />
                  {/* body */}
                  <p className="text-text-light px-4">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeInOnScroll>

        {/* Clip Clip Clip: Introducing Incremental Reading */}
        <FadeInOnScroll>
          <div className="flex flex-col md:flex-row justify-center  md:gap-8">
            <div
              className="relative max-w-md group cursor-pointer opacity-95 "
              title="Look!"
            >
              <ThemeImage
                src={"/landing-page/paper1.png"}
                alt="Clip Image"
                width={1141}
                height={1001}
                className="opacity-100 group-hover:opacity-0 select-none"
              />
              <ThemeImage
                src={"/landing-page/paper2.png"}
                alt="Clip Image Hover"
                width={1141}
                height={1001}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 select-none"
              />
            </div>
            <div className="mt-12 rounded-2xl p-6 max-w-md">
              <div className="text-xs uppercase tracking-wider font-bold text-text-light mb-3">
                How it sticks
              </div>
              <h3 className="font-header text-3xl font-medium mb-4 text-text">
                Clip, Clip, Clip!
              </h3>
              <p className="text-base text-text-light mb-4">
                Clip a key insight, and Quail turns it into short reviews so you
                remember even when life gets busy.
              </p>
              <p className="text-base text-text-light">
                <strong>This is incremental reading</strong>: read in small,
                repeated passes to build lasting memory. No decks to manage.
                Just retention that fits your day!
              </p>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Trust Signals/Proof Section */}
      <section className="max-w-5xl mx-auto mb-48 px-6">
        <div className="grid md:grid-cols-2 gap-18 items-center justify-center">
          <div className="grid md:grid-cols-2 gap-12 text-center ">
            <div>
              <div className="font-header text-6xl font-bold text-primary mb-2">
                1
              </div>
              <div className="text-sm uppercase tracking-widest font-bold text-text-light">
                All-in-one tool
              </div>
              <p className="text-base text-text-light mt-2">
                The <strong>only</strong> tool combining distraction-free
                reading with evidence-based learning.
              </p>
            </div>

            <div>
              <div className="font-header text-6xl font-bold text-accent mb-2">
                +60%
              </div>
              <div className="text-sm uppercase tracking-widest font-bold text-text-light">
                stronger recall
              </div>
              <p className="text-base text-text-light mt-2">
                Achieve up to 60% better recall over five weeks. With minimal
                effort for you [
                <a
                  href="https://pubmed.ncbi.nlm.nih.gov/19076480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  Cepeda et al. 2008
                </a>
                ]
              </p>
            </div>
          </div>

          <div
            className="relative max-w-sm group cursor-pointer opacity-95 "
            title="Wow!"
          >
            <ThemeImage
              src={"/landing-page/phone1.png"}
              alt="Clip Image"
              width={1076}
              height={1010}
              className="opacity-100 group-hover:opacity-0 select-none"
            />
            <ThemeImage
              src={"/landing-page/phone2.png"}
              alt="Clip Image Hover"
              width={1076}
              height={1010}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 select-none"
            />
          </div>
        </div>
      </section>

      {/* Section separator */}
      {/* <div aria-hidden="true" className="w-full border-t border-border my-12" /> */}

      {/* Read → Mark → Review explainer */}
      <section className="max-w-5xl mx-auto mb-48 px-6">
        <FadeInOnScroll>
          <div className="bg-surface/70 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="text-xs uppercase tracking-[.18em] font-bold text-primary">
              One simple loop
            </div>
            <h3 className="font-header font-semibold text-2xl md:text-3xl mt-1 mb-4">
              Read · Clip · Review
            </h3>

            <div className="grid gap-5">
              {loopSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-center"
                >
                  <FaFeatherPointed className="text-primary text-xl scale-x-[-1]" />
                  <div>
                    <h4 className="font-header text-lg mb-1">{step.title}</h4>
                    <p className="text-sm md:text-base text-text-light">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm md:text-base text-text-light mt-6">
              This simple loop builds lasting memory. In minutes a day. Even if
              you&apos;re short on time. Just a reader that revives your key
              ideas-exactly when you need them.
            </p>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="max-w-3xl mx-auto mt-48 mb-36 px-6">
        <Testimonials />
      </section> */}

      <section
        id="faq"
        className="max-w-3xl mx-auto mb-32 px-6 flex flex-col gap-8 items-center"
      >
        <h1 className="text-4xl font-header font-semibold">FAQ</h1>
        <FAQ />
      </section>

      {/* Final Call to Action */}
      <FadeInOnScroll>
        <section
          id="cta"
          className="max-w-2xl mx-auto mb-18 px-6 flex flex-col items-center"
        >
          <div
            className="relative max-w-sm group cursor-pointer mb-4 opacity-80"
            title="Waiting..."
          >
            <ThemeImage
              src={"/landing-page/flower1.png"}
              alt="Waitlist Image"
              width={1479}
              height={949}
              className="opacity-100 group-hover:opacity-0 select-none"
            />
            <ThemeImage
              src={"/landing-page/flower2.png"}
              alt="Waitlist Image Hover"
              width={1479}
              height={949}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 select-none"
            />
          </div>

          <div className="bg-surface rounded-xl px-8 py-6 text-center shadow-xl ">
            <div className="text-xs uppercase tracking-wider font-bold text-text-light mb-2">
              Free to Use
            </div>
            <h2 className="font-header text-2xl md:text-3xl font-bold text-text mb-6">
              Try it out!
            </h2>

            {/* <EmailSignup ref={signupRef} /> */}

            <div className="flex flex-col items-center">
              <p className="mb-4 font-medium">
                Download the app and try it out for yourself:
              </p>
              {/* <EmailSignup /> */}
              <div className="flex md:flex-row gap-4 flex-col">
                <IosAppStoreButton trackingLocation={PAGE_TRACKING_LOCATION} />
                <GooglePlayButton trackingLocation={PAGE_TRACKING_LOCATION} />
              </div>

              <p className="font-medium mt-12 mb-2">
                Or chat with us on Discord!
              </p>
              <DiscordButton
                variant="white"
                trackingLocation={PAGE_TRACKING_LOCATION}
              />
            </div>
          </div>
        </section>
      </FadeInOnScroll>

      <Footer />
    </main>
  );
}
