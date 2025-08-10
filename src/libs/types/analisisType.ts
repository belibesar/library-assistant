import { JSX } from "react";

export interface PopularItem {
  _id: string;
  judul: string;
  count: number;
}

export interface StatData {
  title: string;
  value: string;
  change: string;
  icon: JSX.Element;
  color: string;
  isPositive: boolean;
}