import { ButtonProps } from "@/libs/types";

export default function Button({ className, buttonName, onClick, type = "button" }: ButtonProps) {
  return (
    <button 
      className={`${className}`} 
      onClick={onClick}
      type={type}
    >
      {buttonName}
    </button>
  );
}
