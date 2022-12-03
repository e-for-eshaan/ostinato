import React, { useEffect, useRef, useState } from "react";
import { Controls } from "../../components";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import { timeStamp } from "console";
// const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  v_id: string;
  pathName: string;
}
export type timeMapType = {
  timeStamp: number;
  proficiency: number;
  description: string;
  loop: number;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ v_id, pathName }) => {
  const [timeMap, setTimeMap] = useState<timeMapType[] | undefined>();
  const [selected, setSelected] = useState(-1);
  const ref = React.useRef<ReactPlayer>(null);

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

  const seeker = (time: number, loop: number) => {
    if (loop > 0) {
      const loopInterval = setInterval(() => {
        ref.current?.seekTo(time);
      }, loop * 1000);
    } else {
      ref.current?.seekTo(time);
    }
  };

  return (
    <section className="video-player" id="video-player">
      {v_id && (
        <ReactPlayer
          onPause={() => {
            alert("paused");
          }}
          ref={ref}
          url={pathName}
          playing
          controls
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
          width="320px"
          height="180px"
        />
      )}
      <button onClick={() => ref.current?.seekTo(10)}>Seek to 00:10</button>

      <Controls
        seekFunc={seeker}
        v_id={v_id}
        setter={setTimeMap}
        timeMap={timeMap}
      />
    </section>
  );
};
