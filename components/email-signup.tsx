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
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [trap, setTrap] = React.useState(""); // honeypot to catch bots

  const hasError = status === "error" && !!errorMsg;
  const errorId = hasError ? "email-signup-error" : undefined;
  const statusId = "email-signup-status";

  const fields = [
    {
      id: "name-signup-input",
      type: "text" as const,
      autoComplete: "name",
      inputMode: undefined,
      placeholder: "Your name",
      value: name,
      set: setName,
      label: "Full name",
    },
    {
      id: "email-signup-input",
      type: "email" as const,
      autoComplete: "email",
      inputMode: "email" as const,
      placeholder: "Email address",
      value: email,
      set: setEmail,
      label: "Email address",
    },
    {
      id: "phone-signup-input",
      type: "tel" as const,
      autoComplete: "tel",
      inputMode: "tel" as const,
      placeholder: "Phone number (optional)",
      value: phone,
      set: setPhone,
      label: "Phone number",
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
        <div className="w-full max-w-xl flex flex-col gap-2 md:gap-3 justify-center mb-4">
          {fields.map(
            ({ id, autoComplete, inputMode, placeholder, value, set }) => (
              <input
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
                placeholder={placeholder}
                aria-invalid={hasError ? true : undefined}
                aria-describedby={errorId || statusId}
                spellCheck={false}
                className="w-full px-4 py-2 rounded-lg border-2 border-border
                   focus:border-primary/20
                   bg-background text-text placeholder:text-muted placeholder:font-semibold
                   focus:outline-none focus:ring-2 focus:ring-primary"
              ></input>
            )
          )}
        </div>

        <div className="mt-3 w-full flex justify-center">
          <button
            type="submit"
            disabled={status === "loading"}
            title="Join the Waitlist!"
            aria-controls={statusId}
            className={`px-8 py-2 text-lg font-bold rounded-lg transition-all duration-150
                       bg-primary hover:bg-primary-hover text-background shadow-md hover:shadow-lg
                       disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
                       inline-flex items-center justify-center gap-2 active:scale-95`}
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
        <div className="w-full text-center mt-2">
          <span className="text-sm text-text-light">No spam. We’ll only contact you when your Quail invite is ready.</span>
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
        className="mt-2 text-sm font-semibold ml-2 h-8"
        role="status"
        aria-live="polite"
      >
        {status === "success" && (
          <span className="text-emerald-600">
            Thank you for your interest. We will let you know when your invite is ready.
          </span>
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
