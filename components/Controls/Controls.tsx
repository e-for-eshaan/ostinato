import React, { useRef, useState } from "react";
import { timeMapType } from "../../features/VideoPlayer/VideoPlayer";
import { TimeCard, Button, Heading, Text } from "../../components";

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
      <div
        className={`${
          selected === -1 ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
      >
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
          <Text variant="semibold" className="text-tone-1 text-[12px]">
            Time-stamp
          </Text>
          <input
            disabled={selected === -1}
            className="text-black rounded-sm outline-none py-1 px-2 w-44"
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
          <Text variant="semibold" className="text-tone-1 text-[12px] mt-2">
            Description
          </Text>
          <input
            disabled={selected === -1}
            className="text-black rounded-sm outline-none py-1 px-2 w-44"
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
          <Text variant="semibold" className="text-tone-1 text-[12px] mt-2">
            Loop duration (0 = no loop)
          </Text>
          {
            <input
              disabled={selected === -1}
              className="text-black rounded-sm outline-none py-1 px-2 w-44"
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
              className="bg-tone-1 p-2 rounded-lg text-black"
              label="Save"
              clickFunc={upadateTimestamp}
              disabled={selected === -1}
            />

            <Button
              className="bg-tone-2 p-2 rounded-lg text-white"
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
              disabled={selected === -1}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    //wrapper
    <div className="pt-5 bg-black text-secondary w-full mb-10">
      <div className="flex items-center gap-5">
        <Heading variant="h1" className="ml-4 text-white">
          Time Cards
        </Heading>
        <div
          className={`${
            selected === -1 ? "cursor-pointer" : "cursor-not-allowed"
          } inline-flex border-tone-1 mr-4 text-tone-2 my-auto px-3 hover:bg-tone-1 border-2 rounded-lg items-center hover:text-white tranform duration-100`}
          onClick={selected === -1 ? addTimeStamp : () => {}}
        >
          <Text className="text-center" variant="semibold">
            ADD <br /> TIMESTAMP
          </Text>
        </div>
      </div>
      <div className="flex justify-between align-top items-stretch">
        {/* TimeStamp edit */}
        <EditValues />
        <div className="items-start bg-black min-h-[370px] w-full transform duration-200 flex flex-wrap">
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
      </div>
    </div>
  );
};
