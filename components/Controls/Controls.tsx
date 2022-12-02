import React, { useEffect, useRef, useState } from "react";

interface ControlsProps {
  setter: (e: any) => void;
  timeMap?: {
    timeStamp: number;
    proficiency: number;
    description: string;
    loop: number;
  }[];
  vid: string;
}

export const Controls: React.FC<ControlsProps> = ({ setter, timeMap, vid }) => {
  const [selected, setSelected] = useState<number>(-1);
  const timeStampRef = useRef<any>();
  const descriptionRef = useRef<any>(null);
  const loopRef = useRef<any>(null);

  // console.log(timeMap);
  return (
    //wrapper
    <div className="flex overflow-x-auto gap-8 items-center">
      {/* TimeStamp edit */}
      <div
        className={`p-5 flex flex-col gap-2 ${selected > -1 ? "" : "hidden"}`}
        key={selected}
      >
        <h1>Edit Values?</h1>
        {/* timestamp input */}
        <input
          ref={timeStampRef}
          type="number"
          title="timeStamp"
          placeholder={timeMap ? timeMap[selected]?.timeStamp.toString() : "a"}
          name=""
          id=""
        />
        {/* description input */}
        <input
          ref={descriptionRef}
          type="text"
          title="description"
          placeholder={
            timeMap ? timeMap[selected]?.description.toString() : "a"
          }
          name=""
          id=""
        />
        {/* loop input */}
        <input
          ref={loopRef}
          type="number"
          title="loop"
          placeholder={timeMap ? timeMap[selected]?.loop.toString() + "s" : "a"}
          name=""
          id=""
        />
        {/* proficiency input */}
        <div className="flex flex-row gap-2 group">
          {[1, 2, 3, 4, 5].map((value) => {
            return (
              <div
                key={value}
                className={
                  "h-4 w-4 rounded-[50%] bg-yellow-300 cursor-pointer group-hover:opacity-20 " +
                  (selected > -1 &&
                  timeMap &&
                  value <= timeMap[selected]?.proficiency
                    ? "opacity-100"
                    : "opacity-20")
                }
                onClick={() => {
                  if (selected > -1 && timeMap) {
                    let i = timeMap?.findIndex(
                      (x) => x.timeStamp == timeMap[selected]?.timeStamp
                    );
                    let temp = [...timeMap];
                    temp[i].proficiency = value;
                    // console.log(temp);
                    setter(temp);
                    localStorage.setItem(vid, JSON.stringify(timeMap));
                  }
                }}
              />
            );
          })}
        </div>

        {/* button */}
        <div className="flex gap-3">
          {/* Save */}
          <button
            className="bg-slate-600 p-2 rounded-lg text-white"
            onClick={() => {
              if (timeMap) {
                let temp = [...timeMap];
                temp[selected].timeStamp = timeStampRef.current.value
                  ? timeStampRef.current.value
                  : temp[selected].timeStamp;

                temp[selected].description = descriptionRef.current.value
                  ? descriptionRef.current.value
                  : temp[selected].description;

                temp[selected].loop = loopRef.current.value
                  ? loopRef.current.value
                  : temp[selected].loop;

                setter(temp);
                localStorage.setItem(vid, JSON.stringify(timeMap));
                setSelected(-1);
              }
            }}
          >
            Save
          </button>

          <button
            className="bg-slate-400 p-2 rounded-lg text-white"
            onClick={() => {
              setSelected(-1);
            }}
          >
            Discard
          </button>
        </div>
      </div>
      {timeMap?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              selected == index ? "bg-slate-200" : "bg-white"
            } w-32 p-5 border my-5 flex relative flex-col gap-5 items-center`}
          >
            <p
              className="cursor-pointer hover:opacity-30 transform duration-100 absolute top-1 right-2 text-[11px]"
              onClick={() => {
                setSelected(index);
              }}
            >
              edit
            </p>
            <button className="bg-slate-400 p-2 rounded-xl">
              {item.timeStamp}
            </button>

            <p>{item.description}</p>

            <p
              className={item.loop != 0 ? "" : "opacity-0"}
              onClick={() => {
                // console.log();
              }}
            >
              ∞ {item.loop}s
            </p>

            <div className="flex flex-row gap-2 group">
              {[1, 2, 3, 4, 5].map((value) => {
                return (
                  <div
                    key={value}
                    className={
                      "h-4 w-4 rounded-[50%] bg-yellow-300 cursor-pointer group-hover:opacity-20 " +
                      (value <= item.proficiency ? "opacity-100" : "opacity-20")
                    }
                    onClick={() => {
                      let temp = [...timeMap];
                      temp[index].proficiency = value;
                      // console.log(temp);
                      setter(temp);
                      localStorage.setItem(vid, JSON.stringify(timeMap));
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div
        className="p-5 cursor-pointer flex items-center"
        onClick={() => {
          if (timeMap) {
            let temp = [...timeMap];
            let x = {
              timeStamp: 120,
              description: "Chorus",
              loop: 10,
              proficiency: 0,
            };
            temp?.push(x);
            localStorage.setItem(vid, JSON.stringify(temp));
            setter(temp);
          }
        }}
      >
        ADD TIMESTAMP
      </div>
    </div>
  );
};
