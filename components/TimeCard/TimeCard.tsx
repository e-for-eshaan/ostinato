import { useState } from "react";
import { timeMapType } from "../../features/VideoPlayer/VideoPlayer";
import { ProficiencyControl } from "../ProficiencyControl/ProficiencyControl";

interface TimeCardProps {
  selected: number;
  index: number;
  setSelected: (e: any) => void;
  timeMap: timeMapType[];
  setter: (e: any) => void;
  item: timeMapType;
  v_id: string;
  setProficiency: (index: number, value: number) => void;
  seekFunc: (time: number, loop: number) => void;
  loopSelected: number;
  setSelectedLoop: (e: number) => void;
}

export const TimeCard: React.FC<TimeCardProps> = ({
  selected,
  index,
  setSelected,
  timeMap,
  setter,
  item,
  v_id,
  setProficiency,
  seekFunc,
  loopSelected,
  setSelectedLoop,
}) => {
  return (
    <div className="mx-2 border min-w-[100px] my-5 flex relative rounded-md overflow-hidden ">
      <div
        className={`${
          selected == index ? "bg-slate-200" : "bg-white"
        } flex-col flex py-5 gap-1 items-center w-full justify-center`}
      >
        {selected != index && (
          <p
            className="cursor-pointer hover:opacity-30 transform duration-100 absolute top-1 right-2 text-[11px]"
            onClick={() => {
              setSelected(index);
            }}
          >
            Edit
          </p>
        )}
        {selected !== index && (
          <p
            className="cursor-pointer text-red-600 hover:opacity-30 transform duration-100 absolute top-1 left-2 text-[11px]"
            onClick={() => {
              if (timeMap) {
                let temp = [...timeMap];
                temp.splice(index, 1);
                if (temp.length === 0) setSelected(-1);
                localStorage.setItem(v_id, JSON.stringify(temp));
                setter(temp);
              }
            }}
          >
            Delete
          </p>
        )}
        <button
          onClick={() => {
            setSelectedLoop(index);
            seekFunc(item.timeStamp as number, item.loop as number);
          }}
          className="bg-slate-400 p-2 rounded-md w-[80px] mt-1"
        >
          {item.timeStamp}
        </button>

        <p className="text-[12px]">{item.description}</p>

        {loopSelected > -1 && selected === index ? (
          <div className="h-10 w-10 rounded-[50%] border-2 border-blue-500" />
        ) : (
          <p
            className={item.loop != 0 ? "" : "opacity-0"}
            onClick={() => {
              // console.log();
            }}
          >
            ∞ {item.loop}s
          </p>
        )}
        <ProficiencyControl
          currentProficieny={item.proficiency}
          setter={setProficiency}
          index={index}
        />
      </div>
    </div>
  );
};
