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
  stopper: (e?: any) => void;
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
  stopper,
}) => {
  return (
    <div
      className={`ml-4 text-black mx-2 min-w-[100px] my-5 flex relative rounded-md overflow-hidden `}
    >
      <div
        className={`${
          selected == index ? "bg-tone-1 text-black" : "bg-white"
        } flex-col flex py-5 gap-1 items-center w-full justify-center`}
      >
        {selected === -1 && (
          <p
            className="cursor-pointer hover:opacity-30 transform duration-100 absolute top-1 right-2 text-[11px]"
            onClick={() => {
              setSelected(index);
            }}
          >
            Edit
          </p>
        )}
        {selected === -1 && (
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
          className={
            "hover:opacity-50 p-2 rounded-md w-[80px] mt-1 " +
            (selected === index ? "bg-white" : "bg-tone-2 text-white")
          }
        >
          {item.timeStamp}
        </button>

        <p className="text-[12px]">{item.description}</p>

        {loopSelected !== -1 && loopSelected === index ? (
          <div
            onClick={() => {
              setSelectedLoop(-1);
              stopper();
            }}
            className="cursor-pointer duration-150 relative h-6 w-6 ease-in rounded-[50%] border-[5px] border-t-blue-500 hover:rounded-md hover:animate-none hover:w-5 hover:mb-1 hover:h-5 hover:border-none hover:bg-red-600 border-l-blue-500 animate-spin hover:border-red-400"
          ></div>
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
