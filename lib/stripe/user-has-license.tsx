import { useMetadataStore } from "@/store/metadata-store";
import { SubscriptionTier } from "@/types/user-types";

export function getHasLicense(tier: SubscriptionTier | undefined): boolean {
  if (!tier) return false;
  if (tier === "none" || tier === "trial") return false;

  return true;
}

export function currentLocalUserHasLicense(): boolean {
  const profile = useMetadataStore.getState().profile;
  return getHasLicense(profile?.subscription_tier as SubscriptionTier);
}
