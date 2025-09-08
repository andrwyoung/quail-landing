// SUPABASE

// this is the function that sends the magic link for people to log in

"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { OTP_CALLBACK_REDIRECT } from "@/types/constants/constants";

export function useOAuthLogin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const otpRedirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}${OTP_CALLBACK_REDIRECT}`
      : undefined;

  // SECTION: google and apple

  const signInWithGoogle = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: otpRedirectTo,
        scopes: "openid email profile",
        // (optional) keep refresh tokens fresh when used as a “login”:
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      console.error(error);
      setMessage("Google sign-in failed. Try again.");
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: otpRedirectTo,
        scopes: "name email", // Apple only supports these
      },
    });
    if (error) {
      console.error(error);
      setMessage("Apple sign-in failed. Try again.");
      setLoading(false);
    }
  };

  return {
    loading,
    message,
    signInWithGoogle,
    signInWithApple,
  };
}
