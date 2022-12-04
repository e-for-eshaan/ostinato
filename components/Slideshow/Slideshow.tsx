import React, { useState, useRef, useEffect } from "react";
import { clearAllIntervals } from "../../utils/functions";

export const Slideshow = () => {
  const [index, setIndex] = useState(0);
  useState;
  const ref = useRef<any>(null);
  const hVal = ref?.current?.scrollWidth;
  useEffect(() => {
    clearAllIntervals();
    setInterval(() => {
      console.log(ref?.current?.scrollHeight);
      setIndex((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 2000);
  }, []);

  return (
    <div
      ref={ref}
      className="w-full aspect-video text-white bg-gray-300 overflow-hidden"
    >
      <div
        className="flex flex-col relative transform duration-300 w-full h-full"
        style={{ bottom: index * ((hVal * 9) / 16) }}
      >
        {[
          "https://picsum.photos/536/354?random=1",
          "https://picsum.photos/536/354?random=2",
          "https://picsum.photos/536/354?random=3",
        ].map((item, index) => {
          return (
            <img src={item} className={"w-full h-full"} key={index} alt="" />
          );
        })}
      </div>
    </div>
  );
};
