import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F59B] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#00F59B] text-[#04100C] font-bold hover:bg-[#22f8a8] shadow-[0_0_20px_rgba(0,245,155,0.25)] hover:shadow-[0_0_30px_rgba(0,245,155,0.45)] active:scale-[0.99]",
        secondary:
          "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 active:scale-[0.99]",
        outline:
          "border border-white/15 bg-[#06090B] text-slate-200 hover:bg-white/5 hover:text-white hover:border-white/30 active:scale-[0.99]",
        ghost:
          "text-slate-300 hover:bg-white/5 hover:text-white active:scale-[0.99]",
        link:
          "text-[#00F59B] underline-offset-4 hover:underline p-0 h-auto font-medium",
        destructive:
          "bg-red-950/70 border border-red-500/30 text-red-300 hover:bg-red-900/50 hover:text-white active:scale-[0.99]",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-9 px-3.5 text-sm rounded-lg",
        lg: "h-14 px-8 text-lg rounded-xl",
        icon: "h-10 w-10 p-2 rounded-xl shrink-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
