"use client";

import ScreenTemplate from "@/components/screen-template";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useAppLinkSession } from "@/hooks/auth/use-app-link-session";
import { useMetadataStore } from "@/store/metadata-store";
import { NOTION_SUPPORT_POST_URL } from "@/types/constants/constants";

type Status = "idle" | "loading" | "success" | "error";

export default function DeleteAccountPage() {
  const profile = useMetadataStore((s) => s.profile);

  const [email, setEmail] = useState(profile?.email ?? "");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // log in if done correctly
  useAppLinkSession();

  useEffect(() => {
    if (profile?.email) setEmail(profile?.email ?? "");
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const valueEmail = email.trim();
    const valueDescription = description.trim();

    if (!valueEmail) {
      setErrorMsg("Please enter your email.");
      setStatus("error");
      return;
    }

    const emailValid = /\S+@\S+\.\S+/.test(valueEmail);
    if (!emailValid) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");

      // Submit a support ticket to Notion Support DB
      const res = await fetch(NOTION_SUPPORT_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: valueEmail,
          userId: profile?.user_id ?? null,
          subject: "Delete My Account",
          category: "account deletion",
          message: `delete account\n\n${valueDescription}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit deletion request.");

      setStatus("success");
      setEmail("");
      setDescription("");
      toast.success("Your deletion request has been submitted.");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const hasError = status === "error" && !!errorMsg;
  const statusId = "delete-status";
  const errorId = hasError ? "delete-error" : undefined;

  return (
    <ScreenTemplate>
      <section className="flex flex-col items-center justify-center mb-6 mt-18 max-w-4xl mx-auto px-6 text-center">
        <div
          className="relative max-w-sm group cursor-pointer mb-4 opacity-80 px-6"
          title="Delete your account"
        >
          <Image
            src={"/splash/contact.png"}
            priority
            alt="Delete Account Image"
            width={1479}
            height={949}
            className="opacity-100 select-none"
          />
        </div>
        <h1 className="font-header font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
          Delete My Account
        </h1>
      </section>

      <section className="max-w-2xl mx-auto mb-12 text-center px-6">
        <div className="bg-surface border border-border rounded-xl px-6 py-6 shadow-md">
          <p className="text-md text-text-light mb-4">
            {profile
              ? "You are logged in."
              : "Log in to expedite your account deletion."}{" "}
            Submit your email to request permanent deletion of your account and
            data.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-busy={status === "loading" ? true : undefined}
            aria-describedby={statusId}
            noValidate
          >
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

            {/* Optional Description Field */}
            <div>
              <label htmlFor="description-input" className="sr-only">
                Description
              </label>
              <textarea
                id="description-input"
                value={description}
                onChange={(e) => {
                  setErrorMsg(null);
                  setStatus("idle");
                  setDescription(e.target.value);
                }}
                placeholder="Optional note (e.g., reason for deletion)"
                rows={4}
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
                {status === "loading" ? "Submitting..." : "Request Deletion"}
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
                  Your deletion request has been submitted! You’ll receive a
                  confirmation email once we process it.
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
