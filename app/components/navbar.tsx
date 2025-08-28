import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <div
      //   className={`sticky top-0 z-50 w-full bg-background  transition-all duration-700
      //     ${scrolled ? "bg-surface text-secondary shadow-sm" : "shadow-none"}`}
      className={`sticky top-0 z-50 w-full bg-background  transition-all duration-700`}
    >
      <div className="flex flex-row justify-between items-center py-4 px-4">
        <Link
          href="/"
          className="flex flex-row items-center transition-transform gap-2"
        >
          {/* <Image
            src="/logo.png"
            alt="Inquiryon Logo. Sparkle!"
            width={40}
            height={40}
          /> */}
          <div className="h-6 w-6 bg-accent translate-y-0.5 rounded-md"></div>
          <h6 className="text-2xl font-header hover:text-primary">Quail</h6>
        </Link>
        {/* <div className="hidden lg:flex flex-row gap-10 text-lg font-medium font-header">
          {[
            { name: "Home", href: "#" },
            { name: "Features", href: "#features" },
            { name: "About", href: "#about" },
            { name: "FAQ", href: "#faq" },
          ].map((item) => (
            <div key={item.name} className="relative group">
              <a href={item.href} className="hover:text-accent">
                {item.name}
              </a>
            </div>
          ))}
        </div> */}
        <button
          className={`py-1 px-4 rounded-md  text-text-inverse font-body font-bold
            transition-all duration-700
            ${scrolled ? "bg-primary" : "bg-accent"}`}
        >
          Get in App Store
        </button>
      </div>
    </div>
  );
}
