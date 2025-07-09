import React, { useEffect, useRef, useState } from 'react';
import { Controls, PageSection } from '../../components';
import ReactPlayer from 'react-player';
import { clearAllIntervals, myvideosSetter, syncToFirebase } from '../../utils/functions';
import { useTimeStore } from '../../stores';
import { useAuthStore } from '../../stores';
import { getVideoTimeStamps, setVideoTimeStamps } from '../../utils/storage';

interface VideoPlayerProps {
  v_id: string;
  pathName: string;
}
export type LoopType = {
  id: string;
  vid: string;
  timeStamp: number;
  proficiency: number;
  description: string;
  loop: number;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ v_id, pathName }) => {
  const { allTimeStamps: timeMap, setAllTimeStamps } = useTimeStore();
  const { isLoggedIn } = useAuthStore();

  const setTimeMap = (e: LoopType[]) => {
    setAllTimeStamps(e);
    // Sync to Firebase if user is logged in
    if (isLoggedIn) {
      syncToFirebase(v_id, e);
    }
  };
  const [selectedLoop, setSelectedLoop] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const playerRef = React.useRef<ReactPlayer>(null);

  useEffect(() => {
    if (typeof window !== undefined && v_id) {
      myvideosSetter(v_id);
      const timeStamps = getVideoTimeStamps(v_id);
      if (timeStamps.length > 0) {
        setTimeMap(timeStamps);
      } else {
        setVideoTimeStamps(v_id, []);
        setTimeMap([]);
      }
    }
  }, [v_id]);

  const seeker = (time: number, loop: number) => {
    clearAllIntervals();
    playerRef.current?.seekTo(time);
    setPlaying(true);
    const playBackRate = playerRef.current?.getInternalPlayer()?.getPlaybackRate() || 1;
    const loopDuration = (loop * 1000) / playBackRate;

    if (loop > 0) {
      setInterval(() => {
        playerRef.current?.seekTo(time);
      }, loopDuration);
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
            onPlay={() => setPlaying(true)}
            ref={playerRef}
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
          onPause={() => setPlaying(false)}
        />
      </section>
    </section>
  );
};
