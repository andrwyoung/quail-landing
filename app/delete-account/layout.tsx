import { Suspense } from "react";

export default function DeleteAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div>Loading…</div>}>{children}</Suspense>;
}
