import * as React from "react";
import { cn } from "@/libs/types";

export function Select({ children, onValueChange }: { children: React.ReactNode; onValueChange?: (val: string) => void }) {
  return <div>{children}</div>; // Replace with real select logic or use Radix if needed
}

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("select w-full", className)}>{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span className="opacity-50">{placeholder}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <ul className="menu bg-base-100 rounded-box mt-2 shadow">{children}</ul>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <li><button>{children}</button></li>;
}