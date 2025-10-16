import { useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { useMetadataStore } from "@/store/metadata-store";

export function useAppLinkSession() {
  const params = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    if (!accessToken || !refreshToken) {
      console.warn("no tokens in URL → likely not coming from mobile.");
      return;
    }

    (async () => {
      try {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) throw error;

        const {
          data: { user },
        } = await supabase.auth.getUser(accessToken);

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user?.id)
          .single();

        useMetadataStore.getState().setUser(user);
        useMetadataStore.getState().setProfile(profile);
        useMetadataStore.getState().setRedirectedFromApp(true);
      } catch (e) {
        console.error(`[auth] auto-login failed on ${pathname}`, e);
      } finally {
        window.history.replaceState({}, "", pathname);
      }
    })();
  }, [params, pathname]);
}
