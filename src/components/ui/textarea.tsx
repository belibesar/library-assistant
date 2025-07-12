import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/libs/types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn("textarea textarea-bordered w-full", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";