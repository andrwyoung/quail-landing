"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { useRouter } from "next/navigation";
import { useMagicLogin } from "@/hooks/auth/use-magic-link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen flex items-center justify-center bg-background font-medium text-text p-6 relative font-body">
      {/* Logo in top-left */}
      <div className="absolute top-4 left-6"></div>

      {/* Login Card */}
      <div className="max-w-lg w-full md:bg-surface p-8 md:rounded-lg md:shadow-md">
        <h1 className="text-3xl font-medium font-header mb-2">
          Sign in to Quail
        </h1>
        <p className="text-sm mb-12">
          Enter your email address and we’ll send you a magic link to sign in
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="mb-6 bg-surface"
            autoFocus
          />
          <Button type="submit" disabled={loading} className="mb-2">
            {loading ? "Sending Magic Link..." : "Send Magic Link"}
          </Button>
          {message && (
            <p className="text-sm  text-error self-center text-center">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
