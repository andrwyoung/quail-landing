"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useMagicLogin } from "@/hooks/auth/use-magic-link";

export default function LoginPage() {
  const { email, setEmail, loading, message, sendMagicLink } = useMagicLogin();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMagicLink();
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
    <div className="min-h-screen flex items-center justify-center bg-primary text-primary p-6 relative">
      {/* Logo in top-left */}
      <div className="absolute top-4 left-6"></div>

      {/* Login Card */}
      <div className="max-w-lg w-full bg-background p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-2">Sign in to Mudboard</h1>
        <p className="text-sm mb-6">
          Enter your email address and we’ll send you a magic link to sign in
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="p-2"
            autoFocus
          />
          <button type="submit" disabled={loading} className="py-2 font-header">
            {loading ? "Sending Magic Link..." : "Send Magic Link"}
          </button>
          {message && (
            <p className="text-sm text-primary self-center text-center">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
