import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="card bg-base-100 shadow-md">{children}</div>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}