// this component is the login modal that pops up when you click "log in" through the sidebar
// not to be confused with /login/page.tsx which is the full page login

"use client";

import { useMagicLogin } from "@/hooks/auth/use-magic-link";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function LoginModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const {
    email,
    setEmail,
    loading,
    message,
    sendMagicLink,
    signInWithGoogle,
    signInWithApple,
  } = useMagicLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sendMagicLink();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-lg bg-background p-6 shadow-lg font-body max-w-md font-medium w-full">
        <DialogTitle>
          <span className="text-3xl font-medium font-header mb-2">
            {" "}
            Sign in to Quail
          </span>

          <div className="flex flex-row gap-1 text-sm items-center font-body pt-2">
            We&apos;ll email you a magic link.
            {/* <InfoTooltip text="We use password-free signups! Just enter your email and we'll send you a magic link. Clicking that link will sign you in instantly — no password needed." /> */}
          </div>
        </DialogTitle>

        <div className="flex flex-col gap-2 pt-4">
          <Button
            type="button"
            disabled={loading}
            onClick={signInWithApple}
            className="w-full"
          >
             Continue with Apple
          </Button>
          <Button
            type="button"
            disabled={loading}
            onClick={signInWithGoogle}
            variant="secondary"
            className="w-full"
          >
            Continue with Google
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleLogin} className="flex flex-col pt-6">
          <div>
            {/* <h3 className="select-none px-2 text-primary pb-1">
              Email Address:
            </h3> */}
            <Input
              value={email}
              type="email"
              inputMode="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="mb-6"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={loading} className="">
              {loading ? "Sending Magic Link..." : "Send Magic Link"}
            </Button>
            {message && (
              <p className="text-sm text-error self-center">{message}</p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
