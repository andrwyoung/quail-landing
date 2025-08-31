"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import FadingHighlight from "./components/fading-text";
import Image from "next/image";
import FAQ from "./sections/faq";
import EmailSignup from "./components/email-signup";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const formId = "waitlist-panel";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onSecondaryCtaClick = () => {
    window.scrollTo({ top: 314, behavior: "smooth" });
    setShowForm(true);
  };

  return (
    <main className="relative flex flex-col items-center min-h-screen bg-background text-text font-body">
      <Navbar scrolled={scrolled} onClick={onSecondaryCtaClick} />

      {/* Hero Section */}
      <section id="home"
        className="grid md:grid-cols-2 gap-8 max-w-5xl px-4 md:px-6 items-center justify-center 
      min-h-[65vh] pt-[18vh]"
      >
        <div className="text-left">
          <h1
            className="font-header font-medium leading-12 md:leading-20 text-left
             text-4xl md:text-6xl text-text mb-6"
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
              Import any text. 
            </FadingHighlight>{" "}
            <span>Read normally. </span>
            <FadingHighlight scrolled={scrolled} fontClass="">
              Mark what's important. Quail auto‑builds a review queue with evidence-based memory techniques. We help you to
            </FadingHighlight>{" "}
            <span className="font-bold">Remember what matters</span>
          </p>

          <div className="w-full flex justify-center mb-6">
            <button
              ref={buttonRef}
              type="button"
              aria-controls={formId}
              aria-expanded={showForm}
              title="Open sign up sheet"
              className="rounded-full px-14 md:px-16 py-2 md:py-3 text-lg font-bold text-center border-0
              shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer ease-out transform hover:-translate-y-0.5 
              active:translate-y-0 active:scale-95 bg-gradient-to-b from-[#E6D5C3] to-[#F2E7DA] text-[#1A1A1A] hover:brightness-105"
              onClick={() => setShowForm((v) => !v)}
            >
              Get Early Access
            </button>
          </div>
        </div>
        <aside className="w-full flex justify-center md:justify-end">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-3xl p-2 shadow-2xl border border-black/10">
              <div className="overflow-hidden rounded-2xl border border-black/5">
                <Image
                  src={"/mockup3.jpg"}
                  alt={"Quial Mockup on Iphone"}
                  width={1377}
                  height={1200}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </aside>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            id={formId}
            role="region"
            aria-label="Waitlist sign-up"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-2xl bg-surface/70 rounded-md  mx-4 px-5 pt-8 pb-2">
              <EmailSignup />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgetting Statistic Section */}
      <section className="max-w-3xl mx-auto mt-16 mb-24 px-6 text-center">
        <h2 className="font-header font-bold text-4xl md:text-5xl">
          You forget 70% in a day and 90% in a week
        </h2>
        <p className="font-header font-semibold text-2xl md:text-3xl mt-2">
          Quail is here to fix that
        </p>
      </section>

      {/* How It Works Section */}
      <section id="how" className="max-w-5xl mx-auto mt-8 mb-24 px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Left: Features-style card */}
          <div className="bg-surface/70 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="text-xs uppercase tracking-[.18em] font-bold text-primary">How Quail Works</div>
            <h2 className="font-header text-2xl md:text-3xl mt-1 mb-4">Designed for retention</h2>

            <div className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-start mb-5">
              <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-primary/70" />
              <div>
                <h4 className="font-header text-lg mb-1">Import anything</h4>
                <p className="text-sm md:text-base text-text-light">Save all your PDFs, epubs, newsletters, web clips, and more into your library. As long as it's text.</p>
                <p className="text-xs text-text-light mt-2">(If you don't know what to read first, we got you! Import any article from wikipedia to begin learning)</p>
              </div>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-start mb-5">
              <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-primary/70" />
              <div>
                <h4 className="font-header text-lg mb-1">Collect the most important ideas</h4>
                <p className="text-sm md:text-base text-text-light">As you read, clip the quotes or sections you want to remember. Quail brings them back just when you’re about to forget.</p>
              </div>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-start mb-5">
              <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-primary/70" />
              <div>
                <h4 className="font-header text-lg mb-1">Reinforce with Spaced Repetition</h4>
                <p className="text-sm md:text-base text-text-light">Review your clips tailored to your memory and uncover new connections across your knowledge.</p>
              </div>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-start">
              <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-primary/70" />
              <div>
                <h4 className="font-header text-lg mb-1">Focus on What Matters</h4>
                <p className="text-sm md:text-base text-text-light">Reinforce only the most important ideas. Let noise fall away.</p>
              </div>
            </div>
          </div>

          {/* Right: Proof quotes copied from quail.html */}
          <aside className="grid gap-4">
            <div className="p-5 rounded-md bg-surface/60 border border-white/10">
              <strong className="block mb-1">Why it works</strong>
              <p className="text-sm md:text-base text-text-light">Forgetting follows a curve. Hitting ideas right before they fade produces the best retention for the least time. Quail automates that timing per item.</p>
            </div>
            <div className="p-5 rounded-md bg-surface/60 border border-white/10">
              <strong className="block mb-1">Who it’s for</strong>
              <p className="text-sm md:text-base text-text-light">Founders, super readers, researchers - anyone who needs ideas to stick without turning reading into a second job.</p>
            </div>
            <div className="p-5 rounded-md bg-surface/60 border border-white/10">
              <strong className="block mb-1">What it replaces</strong>
              <p className="text-sm md:text-base text-text-light">Your e-reader + highlights + spaced-repetition app juggling. Quail compresses that stack to lower friction.</p>
            </div>
          </aside>
        </div>
      </section>

      

      <section className="w-full text-center mb-24 px-6">
        <h2 className="font-header font-bold text-5xl md:text-6xl">Clip, Clip, Clip</h2>
      </section>

      {/* Read → Mark → Review explainer */}
      <section className="max-w-5xl mx-auto mb-24 px-6">
        <div className="bg-surface/70 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="text-xs uppercase tracking-[.18em] font-bold text-primary">One simple loop</div>
          <h3 className="font-header text-2xl md:text-3xl mt-1 mb-4">Read · Clip · Review</h3>

          <div className="grid gap-5">
            <div className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-start">
              <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-primary/70" />
              <div>
                <h4 className="font-header text-lg mb-1">Read normally</h4>
                <p className="text-sm md:text-base text-text-light">Open anything in your library and read as usual - no new workflow to learn.</p>
              </div>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-start">
              <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-primary/70" />
              <div>
                <h4 className="font-header text-lg mb-1">Clip what matters</h4>
                <p className="text-sm md:text-base text-text-light">Highlight a sentence or block that's important. Each clip gets automatically scheduled to come back when you need to see it again - no setup required.</p>
              </div>
            </div>

            <div className="grid grid-cols-[24px_1fr] gap-3 md:gap-4 items-start">
              <div className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-primary/70" />
              <div>
                <h4 className="font-header text-lg mb-1">Review at the right time</h4>
                <p className="text-sm md:text-base text-text-light">Each day, a short review shows only what’s due - arriving right before you’d forget - so the important ideas stick while the noise falls away.</p>
              </div>
            </div>
          </div>

          <p className="text-sm md:text-base text-text-light mt-6">This simple loop builds lasting memory in minutes a day. Just a reader that brings back your important ideas exactly when you need them.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="max-w-3xl mx-auto mt-48 mb-36 px-6">
        <Testimonials />
      </section> */}

      <section className="max-w-3xl mx-auto mb-32 px-6 flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-header">FAQ</h1>
        <FAQ />
      </section>

      {/* Call to Action */}
      <section id="cta" className="mx-8 px-6 md:px-12 mb-12 w-full">
        <div className="max-w-3xl mx-auto text-text text-center py-14 md:py-16 px-6 md:px-10 
          bg-surface/70 border border-white/10 rounded-2xl flex flex-col items-center">
          <h2 className="font-header font-semibold text-3xl md:text-4xl mb-3">
            Shape the future of reading
          </h2>
          <p className="mb-10 text-md">
            Request an invite to the most powerful reader to-date!
          </p>
          <button
            type="button"
            title="Scroll to sign up sheet"
            aria-label="Scroll to sign up sheet"
            onClick={onSecondaryCtaClick}
            className="flex w-fit justify-center px-8 py-2 text-md md:text-lg bg-background border-2 border-primary text-primary font-bold 
            rounded-full hover:bg-primary hover:text-background transition-all duration-200 cursor-pointer"
          >
            Unlock the future
          </button>
        </div>
      </section>
    </main>
  );
}
