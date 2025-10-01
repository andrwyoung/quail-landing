import React from "react";

export default function Pop({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-sans-header text-accent-foreground"
      style={{
        textShadow: "0 0 4px rgba(63, 167, 150, 0.4)",
        color: "rgba(25, 98, 86, 0.95)",
      }}
    >
      {children}
    </span>
  );
}
