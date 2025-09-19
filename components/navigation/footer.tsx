import CopySupportEmail from "../ui/copy-email";
import Logo from "../ui/logo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background text-text-light py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo and brand */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-header text-xl font-medium text-text">
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
          <CopySupportEmail text="Contact" />
        </nav>

        {/* Right: Copyright */}
        <div className="text-xs text-text-muted text-center md:text-right">
          © {new Date().getFullYear()} Quail. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
