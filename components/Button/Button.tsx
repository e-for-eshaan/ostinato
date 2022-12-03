import React from "react";

interface ButtonProps {
  label: string;
  clickFunc: (...args: any) => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  clickFunc,
  className,
}) => {
  return (
    <button onClick={clickFunc} className={`${className}`}>
      {label}
    </button>
  );
};
