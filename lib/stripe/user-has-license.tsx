import { useMetadataStore } from "@/store/metadata-store";
import { SubscriptionTier } from "@/types/user-types";

export function getHasLicense(tier: SubscriptionTier | undefined): boolean {
  return tier !== "none";
}

export function currentLocalUserHasLicense(): boolean {
  const profile = useMetadataStore.getState().profile;
  return getHasLicense(profile?.subscription_tier as SubscriptionTier);
}
