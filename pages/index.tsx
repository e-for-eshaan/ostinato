import Head from "next/head";
import Image from "next/image";
import { VideoPlayer } from "../features";
import styles from "../styles/Home.module.css";
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import getYouTubeID from "get-youtube-id";

export default function Home() {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  var id = getYouTubeID("https://www.youtube.com/watch?v=ckiaNqOrG5U", {
    fuzzy: false,
  });

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: 120,
    },
    id: "abc",
  };

  return (
    <div className={styles.container}>
      <YouTube videoId={id as string} opts={opts} onReady={onPlayerReady} />
      <button>Click 1</button>
      <button>Click 2</button>
      <button>Click 3</button>
      <button>Click 4</button>
    </div>
  );
}
