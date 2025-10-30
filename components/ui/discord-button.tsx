import { DISCORD_INVITE_LINK } from "@/types/constants/constants";
import { FaDiscord } from "react-icons/fa6";
import { cn } from "@/utils/cn";

export default function DiscordButton({
  text = "Join The Discord",
  variant = "default",
}: {
  text?: string;
  variant?: "default" | "white";
}) {
  const isWhite = variant === "white";

  return (
    <a
      href={DISCORD_INVITE_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all duration-150 shadow-lg hover:-translate-y-0.5 active:scale-95 whitespace-nowrap",
        isWhite
          ? "dark:bg-background bg-surface border-2 border-[#5865F2] text-[#5865F2] hover:bg-background dark:hover:bg-[#5865F2]/40"
          : "bg-[#5865F2]/80 hover:bg-[#4752C4] text-white"
      )}
    >
      <FaDiscord className={cn("text-lg", isWhite && "text-[#5865F2]")} />
      <span>{text}</span>
    </a>
  );
}
