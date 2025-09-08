"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabase-client";
import { ProfileType, useMetadataStore } from "@/store/metadata-store";
import { SupportEmailAddress } from "@/components/ui/copy-email";
import { STRIPE_CHECKOUT_SUCCESS_PATH } from "@/types/constants/stripe-constants";

export default function CheckoutSuccessPage() {
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Not authenticated", authError);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("subscription_tier")
        .eq("user_id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile", profileError);
        return;
      }

      const profile = profileData as ProfileType;

      if (profile?.subscription_tier !== "none") {
        useMetadataStore.getState().setProfile(profile);

        clearInterval(interval);
        setStatus("success");
        setTimeout(() => {
          router.push(STRIPE_CHECKOUT_SUCCESS_PATH);
        }, 1000);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-8 font-body text-text">
        <div className="flex flex-col items-center">
          {status !== "error" && (
            <div className="flex flex-row items-center mb-2 gap-4">
              <Image
                src={"/logo-lighter.png"}
                alt="Success illustration"
                width={400}
                height={400}
                className="size-16"
              />
              <Image
                src={"/logo-lighter.png"}
                alt="Success illustration kissing"
                width={400}
                height={400}
                className="size-16 scale-x-[-1]"
              />
            </div>
          )}
          <h1 className="text-5xl font-header font-medium mb-2">
            {status !== "error"
              ? "Checkout Success!"
              : "Uh Oh. Something went wrong"}
          </h1>
          <div
            className=" mb-4  text-center text-sm"
            role="status"
            aria-live="polite"
          >
            {status === "pending" && (
              <>
                Processing your license upgrade...
                <br />
                <Link
                  href={STRIPE_CHECKOUT_SUCCESS_PATH}
                  className="text-sm hover:underline hover:text-primary transition-colors
                  duration-200 mt-6 inline-block focus-visible:text-primary"
                  aria-label="Go to your dashboard manually if you are not redirected automatically"
                  title="Go to dashboard"
                >
                  If not redirected soon, click here to go to the dashboard.
                </Link>
              </>
            )}
            {status === "success" && "Redirecting to dashboard..."}
            {status === "error" && (
              <>
                Please contact support: <SupportEmailAddress />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
