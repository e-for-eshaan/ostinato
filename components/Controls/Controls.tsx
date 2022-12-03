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
        description: "Title",
        loop: 5,
        proficiency: 0,
      };
      temp?.push(x);
      localStorage.setItem(v_id, JSON.stringify(temp));
      setter(temp);
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
        {selected > -1 && timeMap && (
          <ProficiencyControl
            currentProficieny={timeMap[selected]?.proficiency}
            setter={setProficiency}
            index={selected}
          />
        )}

        {/* button */}
        <div className="flex gap-3">
          {/* Save */}
          <Button
            className="bg-slate-600 p-2 rounded-lg text-white"
            label="Save"
            clickFunc={upadateTimestamp}
          />

          <Button
            className="bg-slate-400 p-2 rounded-lg text-white"
            label="Discard"
            clickFunc={() => setSelected(-1)}
          />
        </div>
      </div>
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
      <div
        className="p-5 cursor-pointer flex items-center"
        onClick={addTimeStamp}
      >
        ADD TIMESTAMP
      </div>
    </div>
  );
};
