import * as React from "react";

type Status = "idle" | "loading" | "success" | "error";

type EmailSignupProps = {
  action?: string; // POST endpoint to recieve { email }
  className?: string;
  onSuccess?: () => void; // Optional callback on successful submit
};

export default function EmailSignup({
  action = "/api/subscribe",
  className = "",
  onSuccess,
}: EmailSignupProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [trap, setTrap] = React.useState(""); // honeypot to catch bots

  const hasError = status === "error" && !!errorMsg;
  const errorId = hasError ? "email-signup-error" : undefined;
  const statusId = "email-signup-status";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    // Bot check
    if (trap) return;

    // Basic client-side validation
    const ok = /\S+@\S+\.\S+/.test(email);
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
        body: JSON.stringify({ email }),
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
      setEmail("");
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
      className={`w-full ${className}`}
      aria-busy={status === "loading" ? true : undefined}
      aria-describedby={statusId}
      noValidate
    >
      {/* accessability: screen readers */}
      <label htmlFor="email-signup-input" className="sr-only">
        Email address
      </label>

      <div className="flex flex-col md:flex-row  gap-2 w-full max-w-lg">
        <input
          id="email-signup-input"
          value={email}
          //   type="email"
          //   inputMode="email"
          autoComplete="email"
          onChange={(e) => {
            setErrorMsg(null);
            setStatus("idle");
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
          aria-invalid={hasError ? true : undefined}
          aria-describedby={errorId || statusId}
          spellCheck={false}
          className="max-w-xl px-4 py-2 rounded-md border-2 border-border 
                    focus:border-primary/20
                     bg-background text-text placeholder:text-muted placeholder:font-semibold
                     focus:outline-none focus:ring-2 focus:ring-primary"
        ></input>
        <button
          type="submit"
          disabled={status === "loading"}
          title="Join the Waitlist!"
          aria-controls={statusId}
          className="px-6 py-2 text-lg font-bold rounded-md transition-all duration-150
                     bg-primary hover:bg-primary-hover text-background
                     disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
                     inline-flex items-center justify-center gap-2 md:w-48"
        >
          {status === "loading" && (
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
          )}
          {status === "loading" ? "Submitting..." : "Join the Waitlist!"}
        </button>
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
        className="mt-2 text-sm font-semibold ml-2 h-8"
        role="status"
        aria-live="polite"
      >
        {status === "success" && (
          <span className="text-emerald-600">Success! Check your inbox.</span>
        )}
        {hasError && (
          <span id={errorId} className="text-rose-600">
            {errorMsg}
          </span>
        )}
      </div>
    </form>
  );
}
