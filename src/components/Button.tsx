import { ButtonProps } from "@/libs/types";

export default function Button({ className, buttonName }: ButtonProps) {
  return <button className={`${className}`}>{buttonName}</button>;
}
