import { ReactNode, useState } from "react";

export function Dialog({ children }: { children: ReactNode }) {
  return <div>{children}</div>; // Simplified, can integrate with headlessui or Radix
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>; // To be connected with real trigger logic
}

export function DialogContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`modal modal-open ${className}`}><div className="modal-box">{children}</div></div>;
}