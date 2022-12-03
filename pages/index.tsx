import React from "react";
import { CustomImage, Layout, Piano } from "../components";
import { AboutSection, LandingSection } from "../features";
export default function Home() {
  return (
    <Layout>
      <LandingSection />
      <AboutSection />
    </Layout>
  );
}
