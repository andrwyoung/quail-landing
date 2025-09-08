import { Tables, TablesInsert } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

export type ProfileType = Tables<"profiles">;
export type ProfileInsert = TablesInsert<"profiles">;

type MetadataStore = {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  profile: ProfileType | null;
  setProfile: (profile: ProfileType | null) => void;
};

export const useMetadataStore = create<MetadataStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
