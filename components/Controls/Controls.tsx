import React, { useRef, useState } from "react";
import { timeMapType } from "../../features/VideoPlayer/VideoPlayer";
import { TimeCard, ProficiencyControl, Button } from "../../components";

interface ControlsProps {
  setter: (e: any) => void;
  timeMap?: timeMapType[];
  v_id: string;
}

export const Controls: React.FC<ControlsProps> = ({
  setter,
  timeMap,
  v_id,
}) => {
  const [selected, setSelected] = useState<number>(-1);
  const timeStampRef = useRef<any>();
  const descriptionRef = useRef<any>(null);
  const loopRef = useRef<any>(null);

  function addTimeStamp() {
    if (typeof window !== "undefined" && timeMap) {
      let temp = [...timeMap];
      let x = {
        timeStamp: 0,
        description: "Untitled",
        loop: 5,
        proficiency: 0,
      };
      temp?.unshift(x);
      localStorage.setItem(v_id, JSON.stringify(temp));
      setter(temp);
      setSelected(0);
    }
  }

  function setProficiency(value: number, index: number) {
    if (timeMap) {
      let temp = [...timeMap];
      temp[index].proficiency = value;
      setter(temp);
      localStorage.setItem(v_id, JSON.stringify(timeMap));
    }
  }

  function upadateTimestamp() {
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
      localStorage.setItem(v_id, JSON.stringify(timeMap));
      setSelected(-1);
    }
  }
  const EditValues = () => {
    return (
      <div className={`${selected === -1 ? "hidden" : ""}`}>
        <div
          className={`p-5 min-w-[200px] flex flex-col overflow-hidden gap-1 `}
          // key={selected}
        >
          <h1>
            {timeMap &&
            selected > -1 &&
            timeMap[selected].description === "Untitled" &&
            timeMap[selected].timeStamp == 0
              ? "Enter Values"
              : "Edit Values"}
          </h1>
          {/* timestamp input */}
          <p className="text-[12px]">Time-stamp</p>
          <input
            ref={timeStampRef}
            type="number"
            title="timeStamp"
            placeholder={
              timeMap ? timeMap[selected]?.timeStamp.toString() : "a"
            }
            name=""
            id=""
          />
          {/* description input */}
          <hr />
          <p className="text-[12px] mt-2">Description</p>
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
          <hr />
          <p className="text-[12px] mt-2">Loop duration (0 = no loop)</p>
          {
            <input
              ref={loopRef}
              type="number"
              title="loop"
              placeholder={
                timeMap && selected > -1
                  ? timeMap[selected]?.loop.toString() + "s"
                  : ""
              }
              name=""
              id=""
            />
          }
          {/* proficiency input */}
          <hr />
          {/* <p className="text-[12px] mt-2">Proficiency</p>
          {selected != -1 && timeMap ? (
            <ProficiencyControl
              currentProficieny={timeMap[selected]?.proficiency}
              setter={setProficiency}
              index={selected}
            />
          ) : (
            <div className="h-4 opacity-0" />
          )} */}

          {/* button */}
          <div className="flex gap-3 mt-3 justify-between">
            {/* Save */}
            <Button
              className="bg-slate-600 p-2 rounded-lg text-white"
              label="Save"
              clickFunc={upadateTimestamp}
            />

            <Button
              className="bg-slate-400 p-2 rounded-lg text-white"
              label="Cancel"
              clickFunc={() => {
                if (
                  timeMap &&
                  selected === 0 &&
                  timeMap[selected].description === "Untitled" &&
                  timeMap[selected].timeStamp === 0
                ) {
                  let temp = [...timeMap];
                  temp.splice(0, 1);
                  localStorage.setItem(v_id, JSON.stringify(temp));
                  setter(temp);
                }
                setSelected(-1);
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    //wrapper
    <div className="flex">
      {/* TimeStamp edit */}
      <EditValues />
      <div className="w-screen transform duration-200 flex overflow-auto items-center">
        {timeMap?.map((item, index) => {
          return (
            <TimeCard
              index={index}
              item={item}
              selected={selected}
              setProficiency={setProficiency}
              setSelected={setSelected}
              setter={setter}
              timeMap={timeMap}
              v_id={v_id}
              key={index}
            />
          );
        })}
      </div>
      <div
        className={`${
          selected === -1 ? "cursor-pointer" : "cursor-not-allowed"
        } p-5  flex items-center`}
        onClick={selected === -1 ? addTimeStamp : () => {}}
      >
        ADD TIMESTAMP
      </div>
    </div>
  );
};
