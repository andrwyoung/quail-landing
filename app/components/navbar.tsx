import Link from "next/link";
import Image from "next/image";

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
          className="flex flex-row items-center transition-transform gap-1 hover:scale-105"
        >
          <Image
            src="/logo3.png"
            alt="Inquiryon Logo. Sparkle!"
            width={40}
            height={40}
          />
          {/* <div className="h-6 w-6 bg-accent translate-y-0.5 rounded-md"></div> */}
          <h6 className="text-2xl font-header text-primary">Quail</h6>
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
          type="button"
          className={`py-1 px-4 rounded-md   font-body font-bold
            transition-all duration-700 cursor-pointer border-2 border-primary
            ${
              scrolled
                ? "bg-primary hover:bg-primary-hover text-text-inverse"
                : "bg-background hover:bg-primary text-primary hover:text-text-inverse"
            }`}
        >
          Start now for free
        </button>
      </div>
    </div>
  );
}
