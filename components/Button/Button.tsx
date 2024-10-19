import React from 'react';

interface ButtonProps {
  label: string;
  clickFunc: (...args: any) => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, clickFunc, className, disabled }) => {
  return (
    <button disabled={disabled} onClick={clickFunc} className={`${className}`}>
      {label}
    </button>
  );
};
