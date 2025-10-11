"use client";

import { useState } from "react";
import ThemeImage from "../ui/theme-image";

export default function Footer() {
  const [flip, setFlip] = useState(false);

  return (
    <footer className="w-full border-t border-border bg-background text-text-light py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo and brand */}
        <div
          onClick={() => setFlip((prev) => !prev)}
          className={`flex items-center gap-2 cursor-pointer group ${
            flip ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div
            className={`flex flex-row-reverse items-end select-none ${
              flip ? "scale-x-[-1]" : ""
            }`}
          >
            <ThemeImage
              lightSrc="/logo3.png"
              darkSrc="/logo-lighter.png"
              alt="Quail Logo. Quack!"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <ThemeImage
              lightSrc="/logo3.png"
              darkSrc="/logo-lighter.png"
              alt="Quail Logo. Quack!"
              width={40}
              height={40}
              className={`w-4 h-4 md:w-8 md:h-8 -translate-y-0.5 ml-1 `}
            />
            <ThemeImage
              lightSrc="/logo3.png"
              darkSrc="/logo-lighter.png"
              alt="Quail Logo. Quack!"
              width={40}
              height={40}
              className={`w-2 h-2 md:w-4 md:h-4 -translate-y-1 `}
            />
          </div>
          <span
            className="font-header text-xl font-medium text-text translate-y-0.5 select-none group-hover:text-primary 
          transition-all duration-200"
          >
            Quail
          </span>
        </div>

        {/* Center: Nav links */}
        <nav className="flex gap-6 text-sm">
          <a href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a
            href="/contact"
            className="text-primary hover:text-accent hover:underline transition-colors"
          >
            Contact Us
          </a>
          {/* <CopySupportEmail text="Contact" /> */}
        </nav>

        {/* Right: Copyright */}
        <div className="text-xs text-text-muted text-center md:text-right">
          © {new Date().getFullYear()} Quail. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
