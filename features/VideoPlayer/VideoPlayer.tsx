import React, { useEffect, useRef, useState } from "react";
import { Controls } from "../../components";
import ReactPlayer from "react-player";

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
  const [selectedLoop, setSelectedLoop] = useState(-1);
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
    clearAllIntervals();
    ref.current?.seekTo(time);
    if (loop > 0) {
      setInterval(() => {
        ref.current?.seekTo(time);
      }, loop * 1000);
    }
  };

  function clearAllIntervals() {
    if (typeof window !== "undefined") {
      // Get a reference to the last interval + 1
      const interval_id = window.setInterval(function () {},
      Number.MAX_SAFE_INTEGER);

      // Clear any timeout/interval up to that id
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
    }
  }

  return (
    <section className="video-player" id="video-player">
      <div className="w-full sm:max-w-[800px] aspect-video">
        {v_id && (
          <ReactPlayer
            ref={ref}
            url={pathName}
            playing
            controls
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
            width="100%"
            height="100%"
          />
        )}
      </div>

      <Controls
        seekFunc={seeker}
        v_id={v_id}
        setter={setTimeMap}
        timeMap={timeMap}
        setSelectedLoop={setSelectedLoop}
        loopSelected={selectedLoop}
      />
    </section>
  );
};
