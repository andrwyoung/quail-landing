// this is the hook that detects when you're logged in
// and then initiates the user in our database if it's the first
// time logging in

import { supabase } from "@/lib/supabase/supabase-client";
import {
  ProfileInsert,
  ProfileType,
  useMetadataStore,
} from "@/store/metadata-store";
import { nowDate } from "@/utils/now-ms";
import { User } from "@supabase/supabase-js";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";

export function useUser() {
  const setUser = useMetadataStore((s) => s.setUser);
  const setProfile = useMetadataStore((s) => s.setProfile);

  const onLogin = useCallback(
    async (user: User) => {
      // Check if profile exists
      const { data: existing, error: existingError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (existingError) {
        console.error("Error checking for existing user:", existingError);
        return;
      }

      // if it doesn't exist in our tables, then
      // this is the first time a user is logging in
      // so we create a new profile for them
      if (!existing) {
        if (!user.email) {
          console.error("Error creating new profile. No email provided");
          return;
        }

        const newUserInsert: ProfileInsert = {
          user_id: user.id,
          email: user.email,
          created_at: nowDate(),
        };

        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .upsert(newUserInsert, { onConflict: "user_id" })
          .select()
          .single();
        if (insertError) {
          console.error("Error creating user profile:", insertError);
          posthog.capture("profile_creation_failed", {
            error: insertError.message,
            user_id: user.id,
          });
          return;
        }

        // if things go smoothly, then we run the welcome message
        if (newProfile) {
          setProfile(newProfile);

          // Track new user signup
          posthog.identify(user.id, {
            email: user.email || "",
          });

          posthog.capture("new_user_signed_up", {
            user_id: user.id,
            email: user.email,
            provider: user.app_metadata?.provider || "unknown",
          });

          // setUserPreferences(null); // just to be safe
        }
      } else {
        const existingProfile = existing as ProfileType;

        // this runs if an existing user is logging back in
        setProfile(existingProfile);

        // Identify returning user
        posthog.identify(user.id, {
          email: user.email || "",
        });

        posthog.capture("user_logged_in", {
          user_id: user.id,
          email: user.email,
          provider: user.app_metadata?.provider || "unknown",
          subscription_tier: existingProfile.subscription_tier || "none",
        });
      }
    },
    [setProfile]
  );

  useEffect(() => {
    const checkCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ?? null); // let store know that we are simply just not logged in
      if (user) onLogin(user); // if logged in then run the check
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const user = session?.user ?? null;
        setUser(user);

        if (user) {
          if (event === "SIGNED_IN") onLogin(user);
          // if (event === "INITIAL_SESSION") toast.success("Logged in!");
        } else {
          useMetadataStore.getState().reset();

          // should only happen on log out
          if (event === "SIGNED_OUT") {
            posthog.capture("user_logged_out");
            toast.success("Logged out successfully.");
          }
        }
      }
    );

    checkCurrentUser();

    return () => listener.subscription.unsubscribe();
  }, [setUser, setProfile, onLogin]);
}
