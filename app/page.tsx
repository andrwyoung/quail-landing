"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Features from "./sections/features";
import FadingHighlight from "./components/fading-text";
import Testimonials from "./sections/testimonials";
import Image from "next/image";
import FAQ from "./sections/faq";
import EmailSignup from "./components/email-signup";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex flex-col items-center min-h-screen bg-background text-text font-body">
      <Navbar scrolled={scrolled} />

      {/* Hero Section */}
      <section
        className="flex flex-col max-w-4xl px-4 md:px-6 items-start justify-center 
      min-h-[65vh] pt-[18vh] text-center mb-48"
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
          <p className="text-md md:text-lg max-w-2xl mb-8 font-bold">
            <FadingHighlight scrolled={scrolled} fontClass="font-medium">
              You forget
            </FadingHighlight>{" "}
            70% of what you read{" "}
            <FadingHighlight scrolled={scrolled} fontClass="font-medium">
              within 24 hours, and 90% by the end of the week. Is there a way to
              keep your reading from
            </FadingHighlight>{" "}
            fading away?
          </p>

          <div className="flex gap-4 items-center">
            {/* <a
            href="#get-started"
            className={`px-8 py-2 text-lg text-background font-bold rounded-lg transition-all duration-150
              ${
                scrolled
                  ? "bg-primary hover:bg-primary-hover"
                  : "bg-primary hover:bg-primary-hover"
              }`}
          >
            Try now for free
          </a> */}
            <EmailSignup />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="max-w-3xl mx-auto mb-36 px-6">
        <Testimonials />
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-48 px-6"
      >
        <Features />
      </section>

      {/* Jank Mockup Section */}
      <div className="max-w-4xl mb-16 px-4">
        <Image
          src={"/mockup3.jpg"}
          alt={"Quial Mockup on Iphone"}
          width={1377}
          height={1200}
        />
      </div>

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
        <a
          type="button"
          href="#get-started"
          className="flex w-fit justify-center px-8 py-3 text-lg bg-background border-2 border-primary text-primary font-bold 
          rounded-md hover:bg-primary hover:text-background transition"
        >
          Optimize Your Memory
        </a>
      </section>
    </main>
  );
}
