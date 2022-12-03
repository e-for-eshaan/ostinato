import React, { useEffect, useRef, useState } from "react";
import { Controls } from "../../components";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  v_id: string;
}
export type timeMapType = {
  timeStamp: number;
  proficiency: number;
  description: string;
  loop: number;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ v_id }) => {
  const [timeMap, setTimeMap] = useState<timeMapType[] | undefined>();

  useEffect(() => {
    if (typeof window !== undefined && v_id) {
      // localStorage.setItem("timeMap", JSON.stringify(initMap));
      let item = localStorage.getItem(v_id);
      if (item) {
        let itemObj = JSON.parse(item);
        setTimeMap(itemObj);
      } else {
        localStorage.setItem(v_id, JSON.stringify([]));
        setTimeMap([]);
      }
    }
  }, [v_id]);

  const playerRef = useRef(null);
  return (
    <section className="video-player" id="video-player">
      <div className="w-[calc(100vw-20px)] h-[500px]">
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          url={"https://www.youtube.com/watch?v=" + v_id}
          width="100%"
          height="100%"
        />
      </div>
      <Controls v_id={v_id} setter={setTimeMap} timeMap={timeMap} />
    </section>
  );
};
