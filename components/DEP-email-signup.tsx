import { Input } from "./ui/input";
import { FaCrow } from "react-icons/fa6";
import { fireConfetti } from "@/utils/fire-confetti";
import React from "react";
import { NOTION_SUBSCRIBE_POST_URL } from "@/types/constants/constants";

type Status = "idle" | "loading" | "success" | "error";

type EmailSignupProps = {
  action?: string; // POST endpoint to recieve { email }
  className?: string;
  onSuccess?: () => void; // Optional callback on successful submit
};

export type EmailSignupHandle = {
  focusFirstInput: () => void;
};

const EmailSignup = React.forwardRef<EmailSignupHandle, EmailSignupProps>(
  ({ action = NOTION_SUBSCRIBE_POST_URL, className = "", onSuccess }, ref) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [status, setStatus] = React.useState<Status>("idle");
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const [trap, setTrap] = React.useState(""); // honeypot to catch bots
    const [clickPosition, setClickPosition] = React.useState<{
      x: number;
      y: number;
    } | null>(null);

    const hasError = status === "error" && !!errorMsg;
    const errorId = hasError ? "email-signup-error" : undefined;
    const statusId = "email-signup-status";

    // Expose ref to parent
    const firstInputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => ({
      focusFirstInput() {
        firstInputRef.current?.focus();
      },
    }));

    const fields = [
      {
        id: "name-signup-input",
        type: "text" as const,
        autoComplete: "name",
        inputMode: undefined,
        placeholder: "Name",
        value: name,
        set: setName,
        label: "Full name",
        inputClass: "min-w-[200px]",

        inputRef: firstInputRef, // ONLY THIS
      },
      {
        id: "email-signup-input",
        type: "email" as const,
        autoComplete: "email",
        inputMode: "email" as const,
        placeholder: "Email Address",
        value: email,
        set: setEmail,
        label: "Email address",
        inputClass: "min-w-[280px]",
      },
      {
        id: "phone-signup-input",
        type: "tel" as const,
        autoComplete: "tel",
        inputMode: "tel" as const,
        placeholder: "Phone Number (Optional)",
        value: phone,
        set: setPhone,
        label: "Phone number",
        inputClass: "min-w-[200px]",
      },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMsg(null);

      // Bot check
      if (trap) return;

      const valueName = name.trim();
      const valueEmail = email.trim();

      // Basic client-side validation
      if (!valueName) {
        setStatus("error");
        setErrorMsg("Please enter your name.");
        return;
      }

      const ok = /\S+@\S+\.\S+/.test(valueEmail);
      if (!ok) {
        setStatus("error");
        setErrorMsg("Please enter a valid email address.");
        return;
      }

      try {
        setStatus("loading");

        const res = await fetch(action, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: valueName, email: valueEmail, phone }),
        });

        if (!res.ok) {
          // Try to surface server message if present
          let msg = "Subscription failed.";
          try {
            const data = await res.json();
            if (data?.error) msg = data.error;
          } catch {
            /* ignore */
          }
          throw new Error(msg);
        }

        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");

        // delight: add some confetti
        fireConfetti(clickPosition?.x, clickPosition?.y);

        onSuccess?.();
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === "string"
            ? err
            : "Something went wrong. Please try again.";

        setStatus("error");
        setErrorMsg(message);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={`w-full flex flex-col items-center ${className}`}
        aria-busy={status === "loading" ? true : undefined}
        aria-describedby={statusId}
        noValidate
      >
        {/* accessability: screen readers */}
        <label htmlFor="name-signup-input" className="sr-only">
          Full name
        </label>
        <label htmlFor="email-signup-input" className="sr-only">
          Email address
        </label>
        <label htmlFor="phone-signup-input" className="sr-only">
          Phone number
        </label>
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-xl flex flex-wrap gap-2 md:gap-3 justify-center mb-4">
            {fields.map(
              ({
                id,
                autoComplete,
                inputMode,
                placeholder,
                value,
                set,
                inputClass,
                inputRef,
              }) => (
                <Input
                  key={id}
                  id={id}
                  value={value}
                  // type={type}
                  autoComplete={autoComplete}
                  inputMode={inputMode}
                  onChange={(e) => {
                    setErrorMsg(null);
                    setStatus("idle");
                    set(e.target.value);
                  }}
                  ref={inputRef}
                  placeholder={placeholder}
                  aria-invalid={hasError ? true : undefined}
                  aria-describedby={errorId || statusId}
                  spellCheck={false}
                  className={`${inputClass} bg-surface border border-text/20 flex-1`}
                ></Input>
              )
            )}
          </div>

          <div className="mt-3 w-full flex justify-center">
            <button
              type="submit"
              disabled={status === "loading"}
              title="Join the Waitlist!"
              aria-controls={statusId}
              onClick={(e) => {
                setClickPosition({ x: e.clientX, y: e.clientY });
              }}
              className={`px-8 py-2 text-md  rounded-xl transition-all duration-150 font-bold
                       bg-primary hover:bg-primary-hover text-background hover:shadow-lg
                       disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
                       shadow-lg shadow-primary/25 hover:-translate-y-0.5 
                       inline-flex items-center justify-center gap-2 active:scale-95`}
            >
              {status === "loading" ? (
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.25"
                  />
                  <path d="M22 12a10 10 0 0 1-10 10" fill="currentColor" />
                </svg>
              ) : (
                <FaCrow />
              )}
              {status === "loading" ? "Submitting..." : "Request Invite!"}
            </button>
          </div>
        </div>
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label>
            Leave this field empty
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
            />
          </label>
        </div>
        {/* Status / errors */}
        <div
          id={statusId}
          className="mt-2 text-sm font-semibold  "
          role="status"
          aria-live="polite"
        >
          {status === "success" && (
            <span className="text-emerald-600 pb-4">
              Thanks for your interest! We&apos;ll let you know when your invite
              is ready.
            </span>
          )}
          {hasError && (
            <span id={errorId} className="text-rose-600 pb-4">
              {errorMsg}
            </span>
          )}
        </div>
        <div className="w-full text-center text-xs text-text-light mt-1">
          We only contact you about your Quail invite. Opt out anytime!
        </div>
      </form>
    );
  }
);

EmailSignup.displayName = "EmailSignup";
export default EmailSignup;
