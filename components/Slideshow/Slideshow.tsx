import React, { useState, useRef, useEffect } from 'react';
import { clearAllIntervals } from '../../utils/functions';

export const Slideshow = () => {
  const [index, setIndex] = useState(0);
  useState;
  const ref = useRef<any>(null);
  const hVal = ref?.current?.scrollWidth;
  useEffect(() => {
    clearAllIntervals();
    setInterval(() => {
      setIndex(prev => (prev >= 3 ? 0 : prev + 1));
    }, 2000);
  }, []);
  const steps = [
    'Step 1: Select a youtube video',
    'Step 2: Replace URL',
    'Step 3: Play with our player',
    'Step 4: Access anytime in My Music',
  ];
  const images = ['/assets/url.png', '/assets/url2.png', '/assets/img3.png', '/assets/img4.png'];
  return (
    <div ref={ref} className="w-full relative aspect-video text-white bg-black overflow-hidden">
      <div
        className="flex flex-col relative transform duration-300 w-full h-full"
        style={{ bottom: index * ((hVal * 9) / 16) }}
      >
        {images.map((item, index) => {
          return <img src={item} className={'w-full h-full'} key={index} alt="" />;
        })}
      </div>
      <div className="bg-black w-full absolute left-0 bottom-1 transform duration-200">
        {steps[index]}
      </div>
    </div>
  );
};
