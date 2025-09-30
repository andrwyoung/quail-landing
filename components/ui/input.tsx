// this it the dark mode input

import * as React from "react";

export function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={`placeholder:text-text-light/70   dark:bg-input/30 border-border
        flex w-full rounded-xl border px-4 py-2 text-text shadow-xs transition-[color,box-shadow] outline-none
        disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 
        focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px] font-semibold
        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
        ${className}`}
      {...props}
    />
  );
}
