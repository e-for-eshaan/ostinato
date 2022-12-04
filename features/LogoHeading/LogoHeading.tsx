import React from "react";

interface LogoHeadingProps {
  type?: null | "h1" | "h2" | "h3" | "h4" | "h5";
  className?: string | null;
  children: React.ReactNode | null;
  color?: "black" | "secondary";
}

export const LogoHeading: React.FC<LogoHeadingProps> = ({
  type = "h1",
  color = "secondary",
  className,
  children,
}) => {
  const textSpecified = className
    ?.split(" ")
    .some((item) => /text-\[#[A-Za-z0-9]+\]/g.test(item));

  const textClass = "text-" + type;

  if (type == "h1") {
    return (
      <h1
        className={`${className} sm:text-[100px] md:text-[150px] text-[70px] font-Righteous leading-none`}
      >
        {children}
      </h1>
    );
  } else if (type == "h2") {
    return (
      <h2
        className={`${className} md:text-[150px] text-[100px] font-Righteous leading-none`}
      >
        {children}
      </h2>
    );
  } else if (type == "h3") {
    return (
      <h3
        className={`${className} md:text-[150px] text-[100px] font-Righteous leading-none`}
      >
        {children}
      </h3>
    );
  } else if (type == "h4") {
    return (
      <h4
        className={`${className} md:text-[150px] text-[100px] font-Righteous leading-none`}
      >
        {children}
      </h4>
    );
  } else if (type == "h5") {
    return (
      <h5
        className={`${className} md:text-[150px] text-[100px] font-Righteous leading-none`}
      >
        {children}
      </h5>
    );
  } else {
    return (
      <h6
        className={` transform duration-100 select-none inline text-secondary hover:text-tone-1 md:text-[150px] text-[100px] break-words font-Righteous leading-none`}
      >
        {children}
      </h6>
    );
  }
};
