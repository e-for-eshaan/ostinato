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
    <PageSection className="bg-black mt-32 mb-10">
      <div className="flex gap-3 justify-between items-center">
        <FormatHeading label="HOW TO USE" />
        <div className="">
          <Slideshow />
        </div>
      </div>
    </PageSection>
  );
};
