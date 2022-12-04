import React from "react";

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageSection: React.FC<PageSectionProps> = ({
  children,
  className,
}) => {
  return (
    <section className={className + " max-w-[1000px] px-6 mx-auto"}>
      {children}
    </section>
  );
};
