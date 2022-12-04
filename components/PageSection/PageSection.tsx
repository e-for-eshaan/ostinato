import React from "react";

interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const PageSection: React.FC<PageSectionProps> = ({
  children,
  id,
  className,
}) => {
  return (
    <section id={id} className={className + " max-w-[1000px] px-6 mx-auto"}>
      {children}
    </section>
  );
};
