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
}) => {
  return (
    <div
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
        Edit
      </p>
      <p
        className="cursor-pointer text-red-600 hover:opacity-30 transform duration-100 absolute top-1 left-2 text-[11px]"
        onClick={() => {
          if (timeMap) {
            let temp = [...timeMap];
            temp.splice(index, 1);
            localStorage.setItem(v_id, JSON.stringify(temp));
            setter(temp);
          }
        }}
      >
        Delete
      </p>
      <button className="bg-slate-400 p-2 rounded-xl">{item.timeStamp}</button>

      <p>{item.description}</p>

      <p
        className={item.loop != 0 ? "" : "opacity-0"}
        onClick={() => {
          // console.log();
        }}
      >
        ∞ {item.loop}s
      </p>
      <ProficiencyControl
        currentProficieny={item.proficiency}
        setter={setProficiency}
        index={index}
      />
    </div>
  );
};
