"use client";
import Navbar from "../components/navigation/navbar";
import FadingHighlight from "../components/fading-text";
import FAQ from "./sections/faq";
import ForgettingCurve from "../components/forgetting-curve";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePageScroll } from "@/hooks/use-page-scroll";
import Footer from "@/components/navigation/footer";
import { FaFeatherPointed } from "react-icons/fa6";

const steps = [
  {
    title: "You import anything",
    text: "PDFs, EPUBs, newsletters, web clips—seamlessly in one place.",
  },
  {
    title: "You clip what matters",
    text: "Highlight while reading. Context saves automatically—no extra steps.",
  },
  {
    title: "You review on time",
    text: "Short refreshers arrive just before you’d forget. Effortless retention.",
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

export default function Home() {
  const { scrolled } = usePageScroll();

  return (
    <main className="relative flex flex-col items-center min-h-screen bg-background text-text font-body">
      <Navbar scrolled={scrolled} />

      {/* Hero Section with full-width gradient - extended to cover navbar area */}
      <section
        id="home"
        className="relative overflow-hidden w-full -mt-[80px] pt-[80px]"
        style={{
          minHeight: "calc(100vh - 0px)",
          background: `
            radial-gradient(1800px 900px at 18% -10%, color-mix(in oklab, var(--color-primary) 26%, transparent) 0%, transparent 65%),
            radial-gradient(1400px 750px at 82% 15%, color-mix(in oklab, var(--color-accent) 18%, transparent) 0%, transparent 70%),
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

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl px-4 md:px-6 items-center justify-center min-h-[65vh] pt-[14vh] mx-auto">
          <div className="text-left">
            <h1
              className="font-header font-medium leading-12 md:leading-16 lg:leading-20 text-left
             text-4xl md:text-5xl lg:text-6xl text-text mb-6"
            >
              <FadingHighlight scrolled={scrolled} fontClass="px-1">
                World’s First
              </FadingHighlight>
              <br />
              Memory Optimized{" "}
              <FadingHighlight scrolled={scrolled} fontClass="px-1">
                Reader
              </FadingHighlight>
            </h1>
            <p className="text-md md:text-lg max-w-2xl mb-8">
              <FadingHighlight scrolled={scrolled} fontClass="">
                Ideal for busy readers who forget insights days after finishing
                a book or newsletter. You import any text. You
              </FadingHighlight>{" "}
              read normally.{" "}
              <FadingHighlight scrolled={scrolled} fontClass="">
                You mark what&apos;s important and remember it effortlessly with
                auto-built reviews that fit your life. We help you
              </FadingHighlight>{" "}
              <span className="font-bold">Remember what matters.</span>
            </p>

            {/* Always visible email signup */}
            <div className="w-full max-w-lg mx-auto">
              <form className="flex gap-3 flex-wrap justify-center items-center">
                {/* [GPT-5] (Edit made) Add required name input and optional phone input */}
                <Input
                  type="text"
                  required
                  placeholder="Your name"
                  className="bg-surface min-w-[200px] flex-1"
                />
                <Input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="bg-surface min-w-[280px] flex-1"
                />
                <Input
                  type="tel"
                  placeholder="Phone number (optional)"
                  className="bg-surface min-w-[200px] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover 
                  cursor-pointer font-bold text-text-inverse  transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary/25"
                >
                  Request Invite
                </button>
              </form>
              <div className="flex justify-center gap-3 mt-3 text-sm text-text-light">
                <span className="px-3 py-1 rounded-md bg-surface/50 border border-border">
                  No spam
                </span>
                <span className="px-3 py-1 rounded-md bg-surface/50 border border-border">
                  1-click opt-out
                </span>
              </div>
            </div>
          </div>
          <aside className="w-full flex justify-center md:justify-end mt-16 mb-12 md:my-0">
            <div className="relative w-full max-w-md">
              <ForgettingCurve />
            </div>
          </aside>
        </div>
      </section>

      {/* Section separator */}
      <div aria-hidden="true" className="w-full border-t border-border my-12" />

      {/* Forgetting Statistic Section */}
      <section className="max-w-3xl mx-auto mt-16 mb-12 px-6 text-center">
        <h2 className="font-header font-semibold text-4xl md:text-5xl leading-tight mb-4">
          You forget 70% in a day and 90% in a week
        </h2>
        <p className="font-header font-medium text-2xl md:text-2xl mt-2">
          Quail fixes that. Start retaining more today.
        </p>
      </section>

      {/* Section separator */}
      <div aria-hidden="true" className="w-full border-t border-border my-12" />

      {/* How It Works Section - Simplified */}
      <section
        id="how"
        className="max-w-5xl mx-auto mt-8 mb-24 px-6 flex flex-col items-center"
      >
        <Image
          src={"/books4.png"}
          alt={"kale reading books"}
          width={1208}
          height={864}
          className="max-w-md mb-18 self-center"
        />
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-wider font-bold text-text-light mb-3">
            How Quail works
          </div>
          <h2 className="font-header text-3xl md:text-4xl font-semibold text-text">
            Designed for retention
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-surface border border-border rounded-xl px-6 py-6 shadow-md"
            >
              <div className="flex flex-row items-center gap-4 mb-2">
                {/* <div className="flex text-lg items-center justify-center w-8 h-8 rounded-full bg-primary text-text-inverse font-bold ">
                  {idx + 1}
                </div> */}
                <div className="relative w-10 h-10 flex items-center justify-center select-none">
                  <Image
                    src="/bookicon.png"
                    alt="Book icon"
                    fill
                    className="object-contain"
                  />
                  <span className="absolute text-md font-bold text-text-inverse translate-x-[1px] -translate-y-[4px] -rotate-16">
                    {idx + 1}
                  </span>
                </div>
                <div className="text-lg font-semibold text-text">
                  {step.title}
                </div>
              </div>
              <p className="text-text-light">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Clip Clip Clip: Introducing Incremental Reading */}
        <div className="mt-12 bg-surface/50 border border-border rounded-2xl p-6 shadow-md">
          <h3 className="font-header text-2xl mb-4 text-text">
            Clip, Clip, Clip: How it sticks
          </h3>
          <p className="text-base text-text-light mb-4">
            You clip a key insight. Quail turns it into short reviews so you
            keep it, even when life gets busy.
          </p>
          <p className="text-base text-text-light">
            This is incremental reading. Read in small, repeated passes to build
            lasting memory. No decks to manage. Just retention that fits your
            day.
          </p>
        </div>
      </section>

      {/* Section separator */}
      <div aria-hidden="true" className="w-full border-t border-border my-12" />

      {/* Trust Signals/Proof Section */}
      <section className="max-w-4xl mx-auto mb-24 px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <Image
              src="/mockup3.jpg"
              alt="Quail app mobile interface showing learning screen"
              className="w-full max-w-md mx-auto rounded-3xl shadow-2xl transform -rotate-12 origin-center"
              style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              width={1431}
              height={1200}
            />
          </div>

          <div className="order-1 md:order-2 flex flex-col gap-8">
            <div className="relative bg-surface border border-border rounded-2xl p-6 shadow-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center text-center gap-1">
                <div className="font-header text-5xl font-bold text-text mb-1">
                  -60%
                </div>
                <div className="text-xs uppercase tracking-widest font-bold text-primary mb-1">
                  Fewer tools
                </div>

                <p className="text-sm text-text-light mt-1">
                  Replaces e-readers + highlight tools + spaced repetition
                  apps-even if separate tools overwhelmed you before.
                </p>
              </div>
            </div>

            <div className="relative bg-surface border border-border rounded-2xl p-6 shadow-md overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center text-center gap-1">
                <div className="font-header text-5xl font-bold text-text mb-1">
                  +3x
                </div>
                <div className="text-xs uppercase tracking-widest font-bold text-accent-active mb-1">
                  Memory retention
                </div>

                <p className="text-sm text-text-light mt-1">
                  Achieve +3x better recall after two weeks in early testing.
                  Real results, minimal effort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section separator */}
      <div aria-hidden="true" className="w-full border-t border-border my-12" />

      {/* Read → Mark → Review explainer */}
      <section className="max-w-5xl mx-auto mb-24 px-6">
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
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="max-w-3xl mx-auto mt-48 mb-36 px-6">
        <Testimonials />
      </section> */}

      <section
        id="faq"
        className="max-w-3xl mx-auto mb-32 px-6 flex flex-col gap-8 items-center"
      >
        <h1 className="text-3xl font-header font-semibold">FAQ</h1>
        <FAQ />
      </section>

      {/* Final Call to Action */}
      <section id="cta" className="max-w-2xl mx-auto mb-12 px-6">
        <div className="bg-surface border border-border rounded-2xl p-8 text-center shadow-lg">
          <div className="text-xs uppercase tracking-wider font-bold text-text-light mb-3">
            Join the waitlist
          </div>
          <h2 className="font-header text-2xl md:text-3xl font-bold text-text mb-6">
            Get early access
          </h2>

          <form className="flex gap-3 flex-wrap justify-center items-center mb-4">
            {/* [GPT-5] (Edit made) Add required name input and optional phone input */}
            <Input type="text" required placeholder="Your name" />
            <Input type="email" required placeholder="your@email.com" />
            <Input type="tel" placeholder="Phone number (optional)" />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-text-inverse cursor-pointer font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-primary/25"
            >
              Request Invite
            </button>
          </form>

          <div className="flex justify-center gap-3 text-sm text-text-light">
            <span className="px-3 py-1 rounded-md bg-background border border-border">
              No spam
            </span>
            <span className="px-3 py-1 rounded-md bg-background border border-border">
              1-click opt-out
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
