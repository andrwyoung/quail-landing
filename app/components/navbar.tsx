import React from "react";
import Image from "next/image";

export default function Navbar({
  scrolled,
  onClick,
}: {
  scrolled: boolean;
  onClick: () => void;
}) {
  return (
    <div
      //   className={`sticky top-0 z-50 w-full bg-background  transition-all duration-700
      //     ${scrolled ? "bg-surface text-secondary shadow-sm" : "shadow-none"}`}
      className={`sticky top-0 z-50 w-full bg-transparent transition-all duration-700`}
    >
      <div
        className="flex flex-row justify-between items-center py-2 md:py-3 px-2 md:px-4 max-w-5xl mx-auto
        rounded-full bg-secondary-bg shadow-md gap-2"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-row items-center transition-transform gap-1 hover:scale-105"
        >
          <Image
            src="/logo-lighter.png"
            alt="Inquiryon Logo. Sparkle!"
            width={40}
            height={40}
            className="w-6 h-6 md:w-10 md:h-10"
          />
          <h6 className="text-lg md:text-2xl font-header text-text">Quail</h6>
        </a>

        <nav className="flex flex-row items-center gap-3 md:gap-6 text-xs md:text-base font-header whitespace-nowrap">
          <a
            href="#how"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("how")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-accent"
          >
            How it Works
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("faq")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-accent"
          >
            FAQ
          </a>
        </nav>
        <button
          type="button"
          onClick={onClick}
          title="Scroll to sign up sheet"
          aria-label="Scroll to sign up sheet"
          className={`py-1 md:py-2 px-3 md:px-6 rounded-full font-body font-bold text-xs md:text-base
            transition-all duration-700 cursor-pointer border-2 border-primary
            ${
              scrolled
                ? "bg-primary hover:bg-primary-hover text-text-inverse"
                : "bg-background hover:bg-primary text-primary hover:text-text-inverse"
            }`}
        >
          Apply for Early Access
        </button>
      </div>
    </div>
  );
}
