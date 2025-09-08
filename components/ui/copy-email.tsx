"use client";
import { SUPPORT_EMAIL } from "@/types/constants/constants";
import { toast } from "sonner";

export default function CopySupportEmail() {
  return (
    <button
      type="button"
      aria-label="Copy support email address"
      className="w-fit cursor-pointer text-primary hover:text-accent hover:underline"
      title="Copy Support Email"
      onClick={() => {
        navigator.clipboard.writeText(SUPPORT_EMAIL);
        toast.success("Email copied!");
      }}
    >
      {"Click to copy email"}
    </button>
  );
}

export function SupportEmailAddress() {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      className="underline hover:text-accent duration-200 transition-all"
    >
      {SUPPORT_EMAIL}
    </a>
  );
}
