"use client";
import ScreenTemplate from "@/components/screen-template";
import { Input } from "@/components/ui/input";
import { FaEnvelope } from "react-icons/fa6";
import { useState } from "react";
import CopySupportEmail from "@/components/ui/copy-email";
import DiscordButton from "@/components/ui/discord-button";
import {
  EDWARD_EMAIL,
  NOTION_SUPPORT_POST_URL,
} from "@/types/constants/constants";
import ThemeImage from "@/components/ui/theme-image";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const valueName = name.trim();
    const valueEmail = email.trim();
    const valueSubject = subject.trim();
    const valueMessage = message.trim();

    // Basic client-side validation
    if (!valueName) {
      setStatus("error");
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!valueEmail) {
      setStatus("error");
      setErrorMsg("Please enter your email address.");
      return;
    }

    const emailValid = /\S+@\S+\.\S+/.test(valueEmail);
    if (!emailValid) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // if (!valueSubject) {
    //   setStatus("error");
    //   setErrorMsg("Please enter a subject.");
    //   return;
    // }

    if (!valueMessage) {
      setStatus("error");
      setErrorMsg("Please enter a message.");
      return;
    }

    try {
      setStatus("loading");

      const res = await fetch(NOTION_SUPPORT_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: valueName,
          email: valueEmail,
          subject: valueSubject || undefined,
          message: valueMessage,
          category: "contact",
        }),
      });

      if (!res.ok) {
        // Try to surface server message if present
        let msg = "Message failed to send.";
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
      setSubject("");
      setMessage("");
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

  const hasError = status === "error" && !!errorMsg;
  const errorId = hasError ? "contact-error" : undefined;
  const statusId = "contact-status";

  return (
    <ScreenTemplate>
      <section className="flex flex-col items-center justify-center mb-32 mt-18 max-w-4xl mx-auto px-6 text-center">
        <div
          className="relative max-w-sm group cursor-pointer mb-4 opacity-80"
          title="Contact us?!!?!"
        >
          <ThemeImage
            src={"/splash/contact.png"}
            priority
            alt="Waitlist Image"
            width={1479}
            height={949}
            className="opacity-100 select-none"
          />
        </div>
        <h1 className="font-header font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-text-light max-w-2xl mx-auto">
          Hey! We&apos;d love to hear from you.
        </p>
      </section>

      <section className="max-w-2xl mx-auto px-6 mb-8">
        <div
          className="bg-surface border 
        border-border rounded-xl p-8 shadow-sm flex flex-col items-center"
        >
          <h1 className="font-header text-2xl font-medium mb-2">
            Join Our Discord!
          </h1>
          <p className=" text-text-light mb-6">
            Reach out directly on Discord or hang out with us for the journey.
          </p>
          <DiscordButton />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-2xl mx-auto px-6 py-14 mb-12">
        <div className="bg-surface border border-border rounded-xl p-8 shadow-md">
          <div className="text-center mb-8">
            <FaEnvelope className="text-primary text-4xl mx-auto mb-4" />
            <h2 className="font-header text-2xl font-medium text-text mb-2">
              Send us a message
            </h2>
            <p className="text-text-light">
              Fill out the form below,{" "}
              <CopySupportEmail text="copy our email address" />, or reach out
              to <CopySupportEmail text="Edward" email={EDWARD_EMAIL} /> or{" "}
              <a
                href="https://instagram.com/jonadrew_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent hover:underline "
              >
                Andrew
              </a>{" "}
              directly, and we&apos;ll get back to you very soon!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-busy={status === "loading" ? true : undefined}
            aria-describedby={statusId}
            noValidate
          >
            {/* Name Field */}
            <div>
              <label htmlFor="name-input" className="sr-only">
                Full name
              </label>
              <Input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => {
                  setErrorMsg(null);
                  setStatus("idle");
                  setName(e.target.value);
                }}
                placeholder="Name"
                autoComplete="name"
                aria-invalid={hasError ? true : undefined}
                aria-describedby={errorId || statusId}
                className="w-full"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <Input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setErrorMsg(null);
                  setStatus("idle");
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                autoComplete="email"
                inputMode="email"
                aria-invalid={hasError ? true : undefined}
                aria-describedby={errorId || statusId}
                className="w-full"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject-input" className="sr-only">
                Subject
              </label>
              <Input
                id="subject-input"
                type="text"
                value={subject}
                onChange={(e) => {
                  setErrorMsg(null);
                  setStatus("idle");
                  setSubject(e.target.value);
                }}
                placeholder="Subject (Optional)"
                aria-invalid={hasError ? true : undefined}
                aria-describedby={errorId || statusId}
                className="w-full"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message-input" className="sr-only">
                Message
              </label>
              <textarea
                id="message-input"
                value={message}
                onChange={(e) => {
                  setErrorMsg(null);
                  setStatus("idle");
                  setMessage(e.target.value);
                }}
                placeholder="Message"
                rows={6}
                aria-invalid={hasError ? true : undefined}
                aria-describedby={errorId || statusId}
                className="placeholder:text-text-light/70 dark:bg-input/30 border-border
                    flex w-full rounded-xl border px-4 py-2 text-text shadow-xs transition-[color,box-shadow] outline-none
                    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 
                    focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px] font-semibold
                    aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
                    resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-8 py-3 text-md rounded-xl transition-all duration-150 font-bold
                           bg-primary hover:bg-primary-hover text-background hover:shadow-lg
                           disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
                           shadow-lg shadow-primary/25 hover:-translate-y-0.5 
                           inline-flex items-center justify-center gap-2 active:scale-95"
              >
                {status === "loading" ? (
                  <>
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
                    Sending...
                  </>
                ) : (
                  <>
                    <FaEnvelope />
                    Send Message
                  </>
                )}
              </button>
            </div>

            {/* Status / errors */}
            <div
              id={statusId}
              className="text-sm font-semibold text-center"
              role="status"
              aria-live="polite"
            >
              {status === "success" && (
                <span className="text-emerald-600">
                  Thanks for your message! We&apos;ll get back to you soon.
                </span>
              )}
              {hasError && (
                <span id={errorId} className="text-rose-600">
                  {errorMsg}
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </ScreenTemplate>
  );
}
