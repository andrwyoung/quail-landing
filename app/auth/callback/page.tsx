// only for oauth. magic link doesn't need this

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase-client";
import { SUCCESSFUL_LOGIN_REDIRECT } from "@/types/constants/constants";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );
      if (error) {
        console.error(error);
        return;
      }
      router.replace(SUCCESSFUL_LOGIN_REDIRECT);
    };
    run();
  }, [router]);

  return <p className="p-6">Signing you in…</p>;
}
