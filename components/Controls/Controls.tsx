import React, { useRef, useState } from "react";
import { timeMapType } from "../../features/VideoPlayer/VideoPlayer";
import { TimeCard, Button, Heading } from "../../components";

interface ControlsProps {
  setter: (e: any) => void;
  timeMap?: timeMapType[];
  v_id: string;
  seekFunc: (time: number, loop: number) => void;
  loopSelected: number;
  setSelectedLoop: (e: number) => void;
  stopper: (e: any) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  setter,
  timeMap,
  v_id,
  seekFunc,
  loopSelected,
  setSelectedLoop,
  stopper,
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
          <Heading variant="h4">
            {timeMap &&
            selected > -1 &&
            timeMap[selected].description === "Untitled" &&
            timeMap[selected].timeStamp == 0
              ? "Enter Values"
              : "Edit Values"}
          </Heading>
          {/* timestamp input */}
          <p className="text-[12px]">Time-stamp</p>
          <input
            className="py-1 px-2 w-full"
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
          {/* <hr /> */}
          <p className="text-[12px] mt-2">Description</p>
          <input
            className="py-1 px-2 w-full"
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
          {/* <hr /> */}
          <p className="text-[12px] mt-2">Loop duration (0 = no loop)</p>
          {
            <input
              className="py-1 px-2 w-full"
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
          {/* <hr /> */}
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
    <div className="flex bg-slate-600 max-w-full overflow-hidden items-stretch">
      {/* TimeStamp edit */}
      <EditValues />
      <div className="bg-red-400 transform duration-200 flex overflow-auto items-center">
        {timeMap?.map((item, index) => {
          return (
            <TimeCard
              stopper={stopper}
              seekFunc={seekFunc}
              index={index}
              item={item}
              selected={selected}
              setProficiency={setProficiency}
              setSelected={setSelected}
              setter={setter}
              timeMap={timeMap}
              v_id={v_id}
              key={index}
              loopSelected={loopSelected}
              setSelectedLoop={setSelectedLoop}
            />
          );
        })}
      </div>
      <div
        className={`${
          selected === -1 ? "cursor-pointer" : "cursor-not-allowed"
        } flex items-center my-auto px-3 hover:bg-slate-400 tranform duration-100 h-32`}
        onClick={selected === -1 ? addTimeStamp : () => {}}
      >
        ADD <br /> TIMESTAMP
      </div>
    </div>
  );
};
