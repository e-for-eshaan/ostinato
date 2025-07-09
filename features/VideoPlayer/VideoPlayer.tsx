import React, { useEffect, useRef, useState } from 'react';
import { Controls, PageSection } from '../../components';
import ReactPlayer from 'react-player';
import { clearAllIntervals, myvideosSetter, syncToFirebase } from '../../utils/functions';
import { useTimeStore } from '../../stores';
import { useAuthStore } from '../../stores';
import { getVideoTimeStamps, setVideoTimeStamps } from '../../utils/storage';
import { NAVBAR_HEIGHT_DESKTOP, NAVBAR_HEIGHT_MOBILE } from '../../lib/constants';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="flex h-full">
        {/* Video Section - Left Side */}
        <div className="flex-1 transition-all duration-300">
          <div className="h-full flex flex-col">
            {/* Video Player */}
            <div className="flex-1 flex items-center justify-center p-0 lg:p-6 h-full">
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="aspect-video w-full max-w-full max-h-full"
                  style={{ maxHeight: '100vh' }}
                >
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
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: '16px',
                        background: 'black',
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Cards Section - Desktop Sidebar */}
        <div
          className={`hidden lg:block relative transition-all duration-300 ${
            isSidebarOpen ? 'w-96 xl:w-[28rem]' : 'w-12'
          }`}
        >
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -left-3 top-6 z-50 w-6 h-12 bg-tone-1 rounded-l-lg flex items-center justify-center text-black font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSidebarOpen ? '‹' : '›'}
          </button>

          {/* Time Cards Content */}
          <div
            className={`h-full bg-black/95 backdrop-blur-sm border-l border-white/10 transition-all duration-300 ${
              isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
            }`}
          >
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
          </div>
        </div>

        {/* Mobile Overlay */}
        <div className="lg:hidden">
          {/* Mobile Edge Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed right-0 top-1/2 z-50 w-6 h-16 bg-tone-1 rounded-l-lg flex items-center justify-center text-black font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform -translate-y-1/2"
            style={{ top: '50%' }}
          >
            {isSidebarOpen ? '‹' : '›'}
          </button>

          {/* Mobile Overlay Content */}
          <div
            className={`fixed inset-0 z-40 transition-all duration-300 ${
              isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Overlay Panel */}
            <div className="absolute right-0 top-0 h-full w-80 bg-black/95 border-l border-white/10 transform transition-transform duration-300">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
