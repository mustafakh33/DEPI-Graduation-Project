import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const inputVariants = cva(
  "flex w-full min-w-0 rounded-lg text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        shell:
          "border-0 bg-slate-900 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 ring-0 focus:ring-2 focus:ring-[#135bec]/50",
        default:
          "border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(inputVariants({ variant }), className)} {...props} />
  ),
);
Input.displayName = "Input";
