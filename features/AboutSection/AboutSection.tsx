import React from "react";
import {
  FormatHeading,
  Heading,
  PageSection,
  Slideshow,
  Text,
} from "../../components";

export const AboutSection = () => {
  return (
    <PageSection id={"how-to-use"} className="bg-black mt-20 mb-10 py-10">
      <div className="flex gap-3 justify-between items-center">
        <FormatHeading label="HOW TO USE" />
        <div className="">
          <Slideshow />
        </div>
      </div>
    </PageSection>
  );
};
