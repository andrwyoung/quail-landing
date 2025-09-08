"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOtpLogin } from "@/hooks/auth/use-otp";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const router = useRouter();
  const {
    email,
    setEmail,
    loading: otpLoading,
    message: otpMessage,
    otpCode,
    setOtpCode,
    verifyOtp,
    sendOtp,
  } = useOtpLogin({ onSuccess: () => router.replace("/pricing") });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "email") {
      await sendOtp();
      setStep("otp");
    } else if (step === "otp") {
      await verifyOtp();
    }
  };

  useEffect(() => {
    // check if they're logged in already
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        router.replace("/dashboard");
      }
    };

    checkSession();

    // listener to see if logged in on another tab when already opened
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        router.replace("/dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-medium text-text p-6 relative font-body">
      {/* Logo in top-left */}
      <div className="absolute top-4 left-6"></div>

      {/* Login Card */}
      <div className="max-w-lg w-full md:bg-surface p-8 md:rounded-lg md:shadow-md">
        <h1 className="text-3xl font-medium font-header mb-2">
          Sign in to Quail
        </h1>
        <div className="flex flex-row gap-1 text-sm items-center font-body pt-2">
          We&apos;ll email you a login password.
          {/* <InfoTooltip text="We use password-free signups! Just enter your email and we'll send you a magic link. Clicking that link will sign you in instantly — no password needed." /> */}
        </div>
        <form onSubmit={handleLogin} className="flex flex-col pt-6">
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
            <Button type="submit" disabled={otpLoading}>
              {otpLoading
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
      </div>
    </div>
  );
}
