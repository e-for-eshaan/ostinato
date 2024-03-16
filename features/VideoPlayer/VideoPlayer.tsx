import React, { useEffect, useRef, useState } from "react";
import { Controls, PageSection } from "../../components";
import ReactPlayer from "react-player";
import { clearAllIntervals, myvideosSetter } from "../../utils/functions";

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
  const [playing, setPlaying] = useState(false);
  const [playBackRate, setPlayBackRate] = useState(1);
  const ref = React.useRef<ReactPlayer>(null);

  useEffect(() => {
    if (typeof window !== undefined && v_id) {
      // localStorage.setItem("timeMap", JSON.stringify(initMap));
      myvideosSetter(v_id);
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
      setPlaying(true);
    }
  };

  return (
    <section className="video-player">
      <div className="w-full sm:max-w-[1000px] aspect-video mx-auto my-10 px-0 md:px-6">
        {v_id && (
          <ReactPlayer
            onPause={() => {
              setPlaying(false);
              clearAllIntervals();
              setSelectedLoop(-1);
            }}
            ref={ref}
            url={pathName}
            playing={playing}
            controls
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
            width="100%"
            height="100%"
            playbackRate={playBackRate}
          />
        )}
      </div>
      <section className="sm:px-6 max-w-[1000px] mx-auto">
        <Controls
          stopper={clearAllIntervals}
          seekFunc={seeker}
          v_id={v_id}
          setter={setTimeMap}
          timeMap={timeMap}
          setSelectedLoop={setSelectedLoop}
          loopSelected={selectedLoop}
          onPause = {() => setPlaying(false)}
        />
      </section>
    </section>
  );
};
