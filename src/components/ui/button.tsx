
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/libs/types";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("btn btn-primary", className)}
      {...props}
    />
  )
);
Button.displayName = "Button";