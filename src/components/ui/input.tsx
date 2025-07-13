import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/libs/types";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn("input input-bordered w-full", className)}
      {...props}
    />
  )
);
Input.displayName = "Input";