// this component is the login modal that pops up when you click "log in" through the sidebar
// not to be confused with /login/page.tsx which is the full page login

"use client";

import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useOtpLogin } from "@/hooks/auth/use-otp";
import { useState } from "react";
import { useOAuthLogin } from "@/hooks/auth/use-oauth";
import { FaApple } from "react-icons/fa6";

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [step, setStep] = useState<"email" | "otp">("email");

  const {
    email,
    setEmail,
    loading: otpLoading,
    message: otpMessage,
    otpCode,
    setOtpCode,
    verifyOtp,
    sendOtp,
  } = useOtpLogin({ onSuccess: () => setOpen(false) });

  const {
    loading: oAuthLoading,
    message: oAuthMessage,
    signInWithApple,
  } = useOAuthLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email") {
      await sendOtp();
      setStep("otp");
    } else if (step === "otp") {
      await verifyOtp();
    }
  };

  const loading = oAuthLoading || otpLoading;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-lg bg-background  shadow-lg font-body max-w-md font-medium w-full py-16 px-6 sm:p-6">
        <DialogTitle>
          <span className="text-3xl font-medium font-header mb-2">
            Sign in to Quail
          </span>
        </DialogTitle>

        {/* Oauth signup */}
        <div className="flex flex-col gap-2 pt-6">
          <Button
            type="button"
            disabled={loading}
            onClick={signInWithApple}
            className="w-full bg-text/80 border-text hover:border-primary"
          >
            <FaApple className="size-6" /> Continue with Apple
          </Button>
          {/* <Button
            type="button"
            disabled={loading}
            onClick={signInWithGoogle}
            variant="secondary"
            className="w-full text-text border-text hover:border-primary"
          >
            <FaGoogle /> Continue with Google
          </Button> */}
          {oAuthMessage && (
            <p className="text-sm text-text-light self-center">
              {oAuthMessage}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">
            or sign in with email
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col ">
          {/* <div className="flex flex-row gap-1 text-sm items-center font-body pb-4">
            Sign up with email
          </div> */}
          {step === "otp" && (
            <button
              type="button"
              onClick={() => setStep("email")}
              className="text-sm self-center text-text cursor-pointer hover:underline  mb-2"
            >
              ← Back
            </button>
          )}
          <div>
            {step === "email" ? (
              <Input
                value={email}
                autoComplete="email"
                type="email"
                autoFocus={false}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="mb-6"
              />
            ) : (
              <Input
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter 6-digit Code"
                className="mb-6"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading
                ? "Loading..."
                : step === "email"
                ? "Send Email Code"
                : "Verify Code"}
            </Button>
            {otpMessage && (
              <p className="text-sm text-text-light self-center">
                {otpMessage}
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
