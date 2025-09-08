// this component is the login modal that pops up when you click "log in" through the sidebar
// not to be confused with /login/page.tsx which is the full page login

"use client";

import { useMagicLogin } from "@/hooks/auth/use-magic-link";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const { email, setEmail, loading, message, sendMagicLink } = useMagicLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sendMagicLink();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-md bg-background p-6 shadow-lg max-w-md w-full">
        <DialogTitle className="text-2xl text-primary">
          Sign in to Mudboard
          <div className="flex flex-row gap-1 text-xs items-center text-primary pt-1.5">
            We&apos;ll email you a magic link.
            {/* <InfoTooltip text="We use password-free signups! Just enter your email and we'll send you a magic link. Clicking that link will sign you in instantly — no password needed." /> */}
          </div>
        </DialogTitle>
        <form onSubmit={handleLogin} className="flex flex-col gap-4 pt-4 pb-2">
          <div>
            {/* <h3 className="select-none px-2 text-primary pb-1">
              Email Address:
            </h3> */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="p-2"
            />{" "}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="font-header py-2"
            >
              {loading ? "Sending Magic Link..." : "Send Magic Link"}
            </button>
            {message && (
              <p className="text-sm text-primary self-center">{message}</p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
