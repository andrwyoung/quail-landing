"use client";

import LoginModal from "@/components/login-modal";
import { useState } from "react";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 min-h-screen min-w-screen items-center justify-center">
      <div>Buy!</div>
      <LoginModal open={open} setOpen={setOpen} />
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-1 bg-primary cursor-pointer
       text-white rounded-full font-body font-semibold text-xl"
      >
        Buy button
      </button>
    </div>
  );
}
