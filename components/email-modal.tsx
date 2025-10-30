"use client";

import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { NOTION_POST_URL } from "@/types/constants/constants";
import { toast } from "sonner";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const valueEmail = email.trim();

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

      const res = await fetch(NOTION_POST_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: valueEmail,
          message: "Android waitlist signup from mobile landing page",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit email.");
      }

      setStatus("success");
      setEmail("");
      toast.success("Thanks! We'll be in touch soon.");
      setOpen(false);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const hasError = status === "error" && !!errorMsg;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-lg bg-background shadow-lg font-body max-w-md font-medium w-full py-16 px-6 sm:p-6">
        <DialogTitle>
          <span className="text-3xl font-medium font-header">
            Join the Android Beta
          </span>
        </DialogTitle>

        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <div>
            <label htmlFor="email-modal-input" className="mb-2 text-sm">
              Enter your email and we&apos;ll reach out with a personal link!
            </label>

            <Input
              id="email-modal-input"
              //   type="email"
              value={email}
              onChange={(e) => {
                setErrorMsg(null);
                setStatus("idle");
                setEmail(e.target.value);
              }}
              placeholder="Enter your Email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={hasError ? true : undefined}
              className="mb-6 mt-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              variant="secondary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit"}
            </Button>
            {hasError && (
              <p className="text-sm text-rose-600 self-center">{errorMsg}</p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
