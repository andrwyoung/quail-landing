import { Tables, TablesInsert } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export type ProfileType = Tables<"profiles">;
export type ProfileInsert = TablesInsert<"profiles">;

type MetadataStore = {
  redirectedFromApp: boolean;
  setRedirectedFromApp: (e: boolean) => void;

  user: User | null | undefined;
  setUser: (user: User | null) => void;
  profile: ProfileType | null;
  setProfile: (profile: ProfileType | null) => void;

  reset: () => void;
};

export const useMetadataStore = create<MetadataStore>((set) => ({
  redirectedFromApp: false,
  setRedirectedFromApp: (e: boolean) => set({ redirectedFromApp: e }),

  user: undefined,
  setUser: (user) => set({ user }),
  profile: null,
  setProfile: (profile) => set({ profile }),

  reset: () =>
    set({
      redirectedFromApp: false,
      user: undefined,
      profile: null,
    }),
}));
