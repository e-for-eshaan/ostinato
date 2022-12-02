import React, { useEffect, useState } from "react";
import { Controls } from "../../components";
import YouTube, { YouTubeProps } from "react-youtube";

interface VideoPlayerProps {
  vid: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ vid }) => {
  type timeMapType = {
    timeStamp: number;
    proficiency: number;
    description: string;
    loop: number;
  }[];
  const initMap: timeMapType = [
    {
      timeStamp: 120,
      description: "Chorus",
      loop: 10,
      proficiency: 0,
    },
    {
      timeStamp: 240,
      description: "Solo",
      loop: 0,
      proficiency: 4,
    },
    {
      timeStamp: 560,
      description: "Riff",
      loop: 0,
      proficiency: 1,
    },
    {
      timeStamp: 320,
      description: "lick",
      loop: 0,
      proficiency: 1,
    },
  ];
  const [timeMap, setTimeMap] = useState<timeMapType | undefined>();
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  };
  useEffect(() => {
    if (typeof window !== undefined) {
      // localStorage.setItem("timeMap", JSON.stringify(initMap));
      let item = localStorage.getItem("timeMap");
      if (item) setTimeMap(JSON.parse(item));
    }
  }, []);

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
    <div className="video-player" id="video-player">
      <YouTube videoId={vid as string} opts={opts} onReady={onPlayerReady} />
      <Controls setter={setTimeMap} timeMap={timeMap} />
    </div>
  );
};
