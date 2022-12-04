import React from "react";
import { FormatHeading, PageSection, Piano, Text } from "../../components";

export const LandingSection = () => {
  return (
    <PageSection className="bg-black py-10 mt-10">
      <FormatHeading />
      <div className="flex flex-wrap items-center mt-16">
        <Piano />
        <Text className="text-white flex-1 text-right h-fit text-[50px]">
          A video player <br /> for{" "}
          <span className="text-tone-1">Musicians</span>, <br /> by{" "}
          <span className="text-tone-2">Musicians</span>!
        </Text>
      </div>
    </PageSection>
  );
};
