// SUPABASE

// this is the function that sends the magic link for people to log in

"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { isValidEmail } from "@/utils/is-valid-email";
import { toast } from "sonner";

export function useOtpLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpCode, setOtpCode] = useState(""); // store user-entered code

  // send otp to user email
  const sendOtp = async () => {
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
      options: {
        shouldCreateUser: true, // important: create the user too!
      },
    });

    if (error) {
      console.error("OTP send error:", error);
      setMessage("Could not send code. Try again.");
    } else {
      setMessage("Check your email for a 6-digit code.");
    }

    setLoading(false);
  };

  //  verify the OTP code entered by the user.
  const verifyOtp = async () => {
    setLoading(true);
    setMessage("");

    if (otpCode.trim() === "") {
      setMessage("Please enter the code from your email.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpCode,
      type: "email", // type must match method
    });

    if (error) {
      console.error("OTP verify error:", error);
      setMessage("Invalid or expired code. Try again.");
    } else {
      setMessage("Login successful!");
      toast.success("Login Successful!");
      onSuccess();
    }

    setLoading(false);
  };

  return {
    email,
    setEmail,
    loading,
    message,
    otpCode,
    setOtpCode,
    verifyOtp,
    sendOtp,
  };
}
