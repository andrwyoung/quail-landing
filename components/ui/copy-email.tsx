"use client";
import { SUPPORT_EMAIL } from "@/types/constants/constants";
import { toast } from "sonner";

export default function CopySupportEmail({
  text = "Click to copy email",
  email = SUPPORT_EMAIL,
}: {
  text?: string;
  email?: string;
}) {
  return (
    <button
      type="button"
      aria-label="Copy support email address"
      className="w-fit cursor-pointer text-primary hover:text-accent hover:underline"
      title="Copy Support Email"
      onClick={() => {
        navigator.clipboard.writeText(email);
        toast.success("Email copied!");
      }}
    >
      {text}
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
