"use client";

import { SupportEmailAddress } from "@/components/ui/copy-email";
import { supabase } from "@/lib/supabase/supabase-client";
import { useMetadataStore } from "@/store/metadata-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const profile = useMetadataStore((s) => s.profile);
  const user = useMetadataStore((s) => s.user);
  const redirectedFromApp = useMetadataStore((s) => s.redirectedFromApp);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    useMetadataStore.getState().reset(); // reset local too
    setLoading(false);
  };

  useEffect(() => {
    // once profile is hydrated, flip off loading
    if (user !== undefined) {
      setLoading(false);
      if (!user) {
        router.replace("/"); // no profile → go home
      }
    }
  }, [user, router]);

  if ((true && loading) || profile === null) {
    return (
      <div className="flex items-center justify-center min-h-screen font-body font-semibold">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 min-h-screen min-w-screen bg-background items-center justify-center font-body">
      <h1 className="text-4xl font-medium font-header">Account Info</h1>

      <div className="flex flex-col items-start bg-surface/70 border border-border rounded-2xl p-6 shadow-lg w-full max-w-md">
        <p className="mb-2">
          <span className="text-text-light font-medium">Email:</span>{" "}
          <span className="text-text font-semibold">{profile?.email}</span>
        </p>
        <p className="mb-8">
          <span className="text-text-light font-medium">User ID:</span>{" "}
          <span className="text-text font-semibold">{profile?.user_id}</span>
        </p>
        <p>
          <span className="text-text-light font-medium mr-2">
            Subscription Tier:
          </span>{" "}
          <span className="px-3 py-1 rounded-md bg-primary/10 text-primary font-semibold">
            {profile?.subscription_tier || "Free"}
          </span>
        </p>

        <p className="text-xs self-center text-text-light/80 mt-8">
          Need help? Reach out: <SupportEmailAddress />
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        {/* Logout button */}
        <button
          onClick={handleLogout}
          disabled={loading}
          aria-label="Log out of your account"
          aria-disabled={loading}
          className="px-6 py-2 bg-accent text-text cursor-pointer rounded-md font-medium 
               hover:bg-accent-active focus:outline-none focus:ring-2 focus:ring-accent 
               disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>

        {/* Back to home button */}
        <button
          onClick={() => router.push("/")}
          aria-label="Go back to the home page"
          className="px-6 py-2 bg-primary text-white cursor-pointer rounded-md font-medium 
               hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-border"
        >
          Home
        </button>

        {redirectedFromApp && (
          <button
            onClick={() =>
              (window.location.href = "quailreader://checkout/success")
            }
            aria-label="Return to the QuailReader app"
            className="px-6 py-2 bg-green-600 text-white cursor-pointer rounded-md font-medium 
                 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Go back to app
          </button>
        )}
      </div>
    </div>
  );
}
