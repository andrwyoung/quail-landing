// only for oauth. magic link doesn't need this

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase-client";
import { SUCCESSFUL_LOGIN_REDIRECT } from "@/types/constants/constants";
import Link from "next/link";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      console.log("[oauth] hitting callback with", window.location.href);
      const { error, data } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );
      if (error) {
        console.error("[oauth] exchange failed", error);
        return;
      }

      console.log("[oauth] exchange ok", data?.session?.user?.id);
      setTimeout(() => {
        window.location.replace(SUCCESSFUL_LOGIN_REDIRECT);
      }, 1000);
    };
    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 font-body text-text">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-header text-center font-medium mb-6">
          Signing you in...
        </h1>
        <div className="text-center text-sm">
          <Link
            href={"/"}
            className="text-sm hover:underline hover:text-primary transition-colors
            duration-200  inline-block focus-visible:text-primary"
            aria-label="Go to your dashboard manually if you are not redirected automatically"
            title="Go to dashboard"
          >
            If not redirected soon, click here to go to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
