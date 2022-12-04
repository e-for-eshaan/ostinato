import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../components";
import getYouTubeID from "get-youtube-id";
import { VideoPlayer } from "../features";
import ReactPlayer from "react-player";

const URLPage = () => {
  const router = useRouter();
  const pathname = "https://www.youtube.com" + router.asPath;
  const videoID = getYouTubeID(pathname);
  const ref = React.useRef<ReactPlayer>(null);
  return (
    <Layout>
      {videoID && <VideoPlayer pathName={pathname} v_id={videoID as string} />}
      <button onClick={() => ref.current?.seekTo(10)}>Seek to 00:10</button>
    </Layout>
  );
};

export default URLPage;
