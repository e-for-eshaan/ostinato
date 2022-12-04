import React from "react";

interface HeadingProps {
  variant: "h1" | "h2" | "h4";
  className?: string;
  children: JSX.Element | JSX.Element[] | string | null | React.ReactNode;
}
export const Heading: React.FC<HeadingProps> = ({
  className,
  variant,
  children,
}) => {
  const styleMap = {
    h1: "font-semibold font-SansSerifPro md:text-[46px] md:leading-[48.3px] text-[36px] leading-[45.25px]",

    h2: "font-semibold font-SansSerifPro text-[33px] leading-[41.48px] md:text-[42px] md:leading-[44.1px]",

    h4: "font-semibold font-SansSerifPro text-[18px] leading-[22.63px] md:text-[20px] md:leading-[25.14px",
  };

  let textStyle = styleMap[variant];

  if (className) {
    textStyle = `${textStyle} ${className}`;
  }

  return <h1 className={textStyle}>{children}</h1>;
};
