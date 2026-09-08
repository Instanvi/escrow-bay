import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-white/10 bg-[#06090B] px-4 py-3 text-base text-white ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:border-[#00F59B] focus-visible:ring-1 focus-visible:ring-[#00F59B] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
