// SUPABASE

// this is the function that sends the magic link for people to log in

"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { isValidEmail } from "@/utils/is-valid-email";
import {
  OTP_CALLBACK_REDIRECT,
  SUCCESSFUL_LOGIN_REDIRECT,
} from "@/types/constants/constants";

export function useMagicLogin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const otpRedirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}${OTP_CALLBACK_REDIRECT}`
      : undefined;

  const magicLinkRedirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}${SUCCESSFUL_LOGIN_REDIRECT}`
      : undefined;

  const sendMagicLink = async () => {
    setLoading(true);
    setMessage("");

    if (email.trim() === "") {
      setMessage("Please enter an email address.");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: magicLinkRedirectTo },
    });

    if (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Try again.");
    } else {
      setMessage("Check your email for a login link!");
    }

    setLoading(false);
  };

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
    email,
    setEmail,
    loading,
    message,
    sendMagicLink,
    signInWithGoogle,
    signInWithApple,
  };
}
