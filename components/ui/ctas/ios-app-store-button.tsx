import { FaApple } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import { IOS_QUAIL_LINK } from "@/types/constants/constants";
import posthog from "posthog-js";

export function IosAppStoreButton({
  className,
  trackingLocation,
  text = "iOS App Store",
}: {
  className?: string;
  trackingLocation: string;
  text?: string;
}) {
  return (
    <a
      href={IOS_QUAIL_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        posthog.capture("ios_appstore_click", { location: trackingLocation })
      }
      className={cn(
        "inline-flex items-center gap-2 px-6 py-2 bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/80 text-white dark:text-black rounded-xl font-bold transition-all duration-150 shadow-lg hover:-translate-y-0.5 active:scale-95 whitespace-nowrap",
        className
      )}
    >
      <FaApple className="size-5" />
      <span>{text}</span>
    </a>
  );
}
