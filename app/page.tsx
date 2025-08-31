"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import Features from "./sections/features";
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
      <section
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
              Whether you read ebooks, newsletters, or wikipedia articles, we want you to
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
              className={`rounded-full px-14 md:px-16 py-2 md:py-3 text-lg font-bold text-center border-2 border-primary
              shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer ease-out transform hover:-translate-y-0.5 
              active:translate-y-0 active:scale-95 ${
                showForm
                  ? "text-primary"
                  : " bg-primary hover:bg-primary-hover text-background"
              }`}
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
      <section className="max-w-5xl mx-auto mt-8 mb-24 px-6 text-center">
        <h2 className="font-header font-bold text-4xl md:text-5xl mb-2">
          From passive consumption to retention
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold mb-10">
          How Quail Works
        </h3>
        <div className="grid grid-cols-1 gap-10 md:gap-12 text-left">
          <div className="p-6 rounded-lg bg-secondary-bg">
            <h4 className="font-header text-xl mb-3">Save Everything</h4>
            <p className="text-md text-text-light">
              Save all your PDFs, epubs, newsletters, web clips, and more in one place.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-secondary-bg">
            <h4 className="font-header text-xl mb-3">Collect the most important ideas</h4>
            <p className="text-md text-text-light">
              As you read, clip the quotes or sections you want to remember. Quail brings them back just when you’re about to forget.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-secondary-bg">
            <h4 className="font-header text-xl mb-3">Reinforce with Incremental Learning</h4>
            <p className="text-md text-text-light">
              Review your clips in minutes and uncover new connections across your knowledge.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full text-center px-6 mb-24">
        <p className="text-sm md:text-md text-text-light">
          (If you don't know what to read first, we got you! Import any article from wikipedia to begin learning)
        </p>
      </div>

      <section className="w-full text-center mb-24 px-6">
        <h2 className="font-header font-bold text-5xl md:text-6xl">Clip, Clip, Clip</h2>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="max-w-3xl mx-auto mt-48 mb-36 px-6">
        <Testimonials />
      </section> */}

      {/* Features Section */}
      <section
        id="features"
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-48 mb-48 px-6"
      >
        <Features />
      </section>

      

      <section className="max-w-3xl mx-auto mb-32 px-6 flex flex-col gap-8 items-center">
        <h1 className="text-3xl font-header">FAQ</h1>
        <FAQ />
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="bg-surface rounded-lg text-text text-center py-20 mx-8 px-12 mb-12 flex flex-col items-center"
      >
        <h2 className="font-header font-semibold text-3xl md:text-4xl mb-4">
          Unlock your memory
        </h2>
        <p className="mb-12 text-md">
          Join thousands of learners optimizing their memory with Quail.
        </p>
        <button
          type="button"
          title="Scroll to sign up sheet"
          aria-label="Scroll to sign up sheet"
          onClick={onSecondaryCtaClick}
          className="flex w-fit justify-center px-8 py-2 text-md md:text-lg bg-background border-2 border-primary text-primary font-bold 
          rounded-full hover:bg-primary hover:text-background transition-all duration-200 cursor-pointer"
        >
          Optimize Your Memory
        </button>
      </section>
    </main>
  );
}
