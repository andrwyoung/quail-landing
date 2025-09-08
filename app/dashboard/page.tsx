"use client";

import { supabase } from "@/lib/supabase/supabase-client";
import { useMetadataStore } from "@/store/metadata-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const profile = useMetadataStore((s) => s.profile);
  const user = useMetadataStore((s) => s.user);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
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

  if (loading || profile === null) {
    return (
      <div className="flex items-center justify-center min-h-screen font-body">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 min-h-screen min-w-screen items-center justify-center font-body">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="flex flex-col gap-2 items-start bg-gray-100 rounded-lg p-6 shadow-md">
        <p>
          <span className="font-semibold">Email:</span> {profile?.email}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {profile?.user_id}
        </p>
        <p>
          <span className="font-semibold">Subscription Tier:</span>{" "}
          {profile?.subscription_tier || "Free"}
        </p>
      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-6 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
