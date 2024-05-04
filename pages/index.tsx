import React from "react";
import { CustomImage, Layout, Piano } from "../components";
import { AboutSection, LandingSection } from "../features";
import GoogleAuth from "../components/Auth/GoogleAuth";

export default function Home() {
  return (
    <Layout>
      {/* <GoogleAuth /> */}
      <LandingSection />
      <AboutSection />
    </Layout>
  );
}
