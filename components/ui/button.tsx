import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "flex flex-row gap-1.5 items-center justify-center cursor-pointer rounded-full  transition-all" +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50" +
    "disabled:pointer-events-none px-6 py-2 duration-300 font-bold shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-primary border-primary text-white hover:text-primary-dark hover:bg-primary-hover",
        secondary:
          "bg-primary-foreground border-white text-primary hover:bg-accent hover:text-off-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant }),
          "disabled:opacity-50 disabled:pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
