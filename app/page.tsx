"use client";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Features from "./sections/features";
import FadingHighlight from "./components/fading-text";

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
        className="flex flex-col max-w-4xl items-start justify-center 
      min-h-[65vh] pt-[18vh] text-center mb-32 "
      >
        <div className="text-left">
          <h1
            className="font-header font-medium leading-20 text-left
             text-5xl md:text-6xl text-text mb-6"
          >
            World’s First <br />
            <FadingHighlight scrolled={scrolled} fontClass="font-semibold px-1">
              Memory Optimized
            </FadingHighlight>{" "}
            Reader
          </h1>
          <p className="text-lg max-w-2xl mb-8 font-medium">
            You forget{" "}
            <FadingHighlight scrolled={scrolled} fontClass="font-bold">
              70% of what you read
            </FadingHighlight>{" "}
            within 24 hours, and 90% by the end of the week. Is there a way to
            keep your reading from{" "}
            <FadingHighlight scrolled={scrolled} fontClass="font-bold">
              fading away
            </FadingHighlight>
            ?
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href="#get-started"
            className={`px-6 py-2  text-background font-bold rounded-lg transition-all duration-300
              ${
                scrolled
                  ? "bg-accent hover:bg-accent-hover"
                  : "bg-primary hover:bg-primary-hover"
              }`}
          >
            Get in App Store
          </a>
          {/* <a
            href="#learn-more"
            className="px-6 py-1.5 border-2  border-accent text-accent-active font-semibold rounded-lg hover:bg-secondary-bg transition"
          >
            Learn More
          </a> */}
        </div>
      </section>
      {/* </section> */}

      {/* Features Section */}
      <section
        id="features"
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto py-24 px-6"
      >
        <Features />
      </section>

      {/* Call to Action */}
      <section
        id="cta"
        className="bg-surface rounded-lg text-text text-center py-20 px-6"
      >
        <h2 className="font-header text-3xl md:text-4xl mb-4">
          Ready to start?
        </h2>
        <p className="mb-8 text-lg">
          Join thousands of developers building with Quail today.
        </p>
        <a
          href="#get-started"
          className="px-8 py-3 bg-background text-primary font-semibold rounded-lg hover:bg-text-inverse hover:text-background transition"
        >
          Get Started
        </a>
      </section>
    </main>
  );
}
