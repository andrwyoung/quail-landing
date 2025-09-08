"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabase-client";
import { ProfileType, useMetadataStore } from "@/store/metadata-store";
import { SupportEmailAddress } from "@/components/ui/copy-email";

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
          router.push("/dashboard");
        }, 1000);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-8 text-primary">
        <div className="flex flex-col items-center">
          {status !== "error" && (
            <Image
              src={"/yay2.png"}
              alt="Success illustration"
              width={125}
              height={125}
              className="-translate-x-5 mb-4"
            />
          )}
          <h1 className="text-4xl font-bold  mb-2">
            {status !== "error"
              ? "Checkout Success!"
              : "Uh Oh. Something went wrong"}
          </h1>
          <div
            className="text-sm mb-4 text-center"
            role="status"
            aria-live="polite"
          >
            {status === "pending" && (
              <>
                Processing your license upgrade...
                <br />
                <Link
                  href="/dashboard"
                  className="text-xs hover:underline hover:text-accent transition-colors
                  duration-200 mt-6 inline-block focus-visible:text-accent"
                  aria-label="Go to your dashboard manually if you are not redirected automatically"
                  title="Go to dashboard"
                >
                  If not redirected soon, click here to go to your dashboard.
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
