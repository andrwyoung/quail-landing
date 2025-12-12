import { SiGoogleplay } from "react-icons/si";
import { cn } from "@/utils/cn";
import { ANDROID_QUAIL_LINK } from "@/types/constants/constants";
import posthog from "posthog-js";

export function GooglePlayButton({
  className,
  trackingLocation,
  text = "Google Play Store",
}: {
  className?: string;
  trackingLocation: string;
  text?: string;
}) {
  return (
    <a
      href={ANDROID_QUAIL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        posthog.capture("google_playstore_click", {
          location: trackingLocation,
        })
      }
      className={cn(
        "inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-black hover:bg-white/80 dark:hover:bg-black/80 text-black dark:text-white rounded-xl border border-border font-bold transition-all duration-150 shadow-lg hover:-translate-y-0.5 active:scale-95 whitespace-nowrap",
        className
      )}
    >
      <SiGoogleplay className="size-5" />
      <span>{text}</span>
    </a>
  );
}
