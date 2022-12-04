import React, { useState, useRef, useEffect } from "react";
import { clearAllIntervals } from "../../utils/functions";
import img1 from "../../public/assets/img1.png";
import img2 from "../../public/assets/img2.png";
import img3 from "../../public/assets/img3.png";
import img4 from "../../public/assets/img4.png";
export const Slideshow = () => {
  const [index, setIndex] = useState(0);
  useState;
  const ref = useRef<any>(null);
  const hVal = ref?.current?.scrollWidth;
  useEffect(() => {
    clearAllIntervals();
    setInterval(() => {
      console.log(ref?.current?.scrollHeight);
      setIndex((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 2000);
  }, []);
  const steps = [
    "Step 1: Select a youtube video",
    "Step 2: Replace URL",
    "Step 3: Play with our player",
    "Step 4: Access anytime in My Music",
  ];
  return (
    <div
      ref={ref}
      className="w-full relative aspect-video text-white bg-black overflow-hidden"
    >
      <div
        className="flex flex-col relative transform duration-300 w-full h-full"
        style={{ bottom: index * ((hVal * 9) / 16) }}
      >
        {[
          "/assets/img1.png",
          "/assets/img2.png",
          "/assets/img3.png",
          "/assets/img4.png",
        ].map((item, index) => {
          return (
            <img src={item} className={"w-full h-full"} key={index} alt="" />
          );
        })}
      </div>
      <div className="bg-black w-full absolute left-0 bottom-1 transform duration-200">
        {steps[index]}
      </div>
    </div>
  );
};
