import { type ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({ type, onClick, children }: ButtonProps) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
}
