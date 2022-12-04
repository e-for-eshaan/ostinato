import React from "react";

interface TextProps {
  variant?: "paragraph" | "bulleted-list" | "semibold";
  className?: string;
  children: JSX.Element | JSX.Element[] | React.ReactNode | null;
}
export const Text: React.FC<TextProps> = ({
  variant = "paragraph",
  children,
  className,
}) => {
  const styleMap = {
    paragraph: "font-SansSerifPro font-light",
    "bulleted-list": "font-SansSerifPro font-light",
    semibold: "font-SansSerifPro font-semibold",
  };

  function checkTextSize(className: string) {
    const regex = /text-\[\d\dpx]/;
    return regex.test(className);
  }

  let textClass;
  let leadingClass;
  if (!checkTextSize(className as string)) {
    textClass = "text-[16px]";
    leadingClass = "leading-[27.2px]";
  }

  let textStyle = styleMap[variant] + " " + textClass + " " + leadingClass;
  if (className)
    textStyle = `${textStyle} ${leadingClass} ${textClass} ${className}`;
  return <p className={textStyle}>{children}</p>;
};
