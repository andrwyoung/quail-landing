import React, { useState } from "react";
import Link from "next/link";
import LoginModal from "../login-modal";
import { useMetadataStore } from "@/store/metadata-store";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../ui/logo";

export default function Navbar({ scrolled = true }: { scrolled?: boolean }) {
  const [openLogin, setOpenLogin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const user = useMetadataStore((s) => s.user);
  const loggedIn = !!user;

  return (
    <div
      //   className={`sticky top-0 z-50 w-full bg-background  transition-all duration-700
      //     ${scrolled ? "bg-surface text-secondary shadow-sm" : "shadow-none"}`}
      className={`sticky top-0 z-50 w-full transition-all duration-700 ${
        scrolled
          ? "bg-surface text-secondary shadow-sm"
          : "shadow-none bg-transparent "
      }`}
    >
      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      <div
        className="flex flex-row justify-between items-center py-2 md:py-3 px-4 mx-auto
          gap-2"
      >
        <Link
          href="/"
          // onClick={(e) => {
          //   e.preventDefault();
          //   document
          //     .getElementById("home")
          //     ?.scrollIntoView({ behavior: "smooth" });
          // }}
          className="flex flex-row items-center transition-transform gap-1 hover:scale-105"
        >
          <Logo />
          <h6 className="text-lg md:text-2xl font-header text-text">Quail</h6>
        </Link>

        <nav
          className="flex-row items-center gap-3 hidden lg:flex md:gap-8 text-lg md:text-xl font-header 
         translate-x-[20%] font-medium whitespace-nowrap"
        >
          <a
            href="#how"
            onClick={(e) => {
              // [GPT-5] (Edit made) Route to landing section from other pages
              e.preventDefault();
              if (pathname === "/") {
                document
                  .getElementById("how")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/#how");
              }
            }}
            className="hover:text-primary"
          >
            How it Works
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              // [GPT-5] (Edit made) Route to landing section from other pages
              e.preventDefault();
              if (pathname === "/") {
                document
                  .getElementById("faq")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/#faq");
              }
            }}
            className="hover:text-primary"
          >
            FAQ
          </a>
          {/* [GPT-5] (Edit made) Move Pricing link to third position */}
          <a href="/pricing" className="hover:text-primary">
            Pricing
          </a>
        </nav>

        <div className="flex flex-row items-center gap-4">
          {/* [GPT-5] (Edit made) Show Pricing in mobile navbar */}
          <Link
            href="/pricing"
            className="font-body text-sm md:hidden hover:underline hover:text-primary transition-all 
            font-semibold duration-150"
          >
            Pricing
          </Link>
          <button
            className="font-body text-sm md:text-base hover:underline hover:text-primary
              transition-all duration-150 cursor-pointer font-semibold"
            onClick={() => {
              if (loggedIn) router.replace("/dashboard");
              else setOpenLogin(true);
            }}
          >
            {loggedIn ? "Account" : "Login"}
          </button>

          <button
            type="button"
            onClick={() => {
              // [GPT-5] (Edit made) Route to landing CTA from other pages
              if (pathname === "/") {
                document
                  .getElementById("cta")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/#cta");
              }
            }}
            title="Scroll to sign up sheet"
            aria-label="Scroll to sign up sheet"
            className={`hidden md:flex py-1  px-3 md:px-6 rounded-full font-body font-bold text-xs md:text-base
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
    </div>
  );
}
