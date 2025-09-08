"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase-client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );
      if (error) {
        console.error(error);
        // optionally show a toast/error UI here
        return;
      }
      router.replace("/dashboard");
    };
    run();
  }, [router]);

  return <p className="p-6">Signing you in…</p>;
}
