import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components";
import getYouTubeID from "get-youtube-id";
import { VideoPlayer } from "../features";

const URLPage = () => {
  const router = useRouter();
  const pathname = "https://www.youtube.com" + router.asPath;
  const videoID = getYouTubeID(pathname);

  return (
    <Layout>
      {videoID}
      <VideoPlayer vid={videoID as string} />
    </Layout>
  );
};

export default URLPage;
