import React from "react";

interface PageSectionProps {
  children: React.ReactNode;
}

export const PageSection: React.FC<PageSectionProps> = ({ children }) => {
  return <section className="max-w-[1000px] px-6 mx-auto">{children}</section>;
};
