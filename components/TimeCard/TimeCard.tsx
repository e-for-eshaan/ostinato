import React from 'react';
import { LoopType } from '../../features/VideoPlayer/VideoPlayer';
import { ProficiencyControl } from '../ProficiencyControl/ProficiencyControl';

interface TimeCardProps {
  selected: number;
  index: number;
  setSelected: (e: any) => void;
  timeMap: LoopType[];
  setter: (e: any) => void;
  item: LoopType;
  v_id: string;
  setProficiency: (index: number, value: number) => void;
  seekFunc: (time: number, loop: number) => void;
  loopSelected: number;
  setSelectedLoop: (e: number) => void;
  stopper: (e?: any) => void;
  onPause: () => void;
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
  onPause,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div
        className={`relative group transition-all duration-300 ${
          selected === index
            ? 'bg-tone-1 shadow-lg shadow-tone-1/25'
            : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm'
        } rounded-xl p-3 border border-white/10 hover:border-white/20`}
      >
        {/* Edit/Delete Buttons */}
        {selected === -1 && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setSelected(index)}
              className="w-6 h-6 bg-tone-1 text-black rounded-full flex items-center justify-center text-xs font-bold hover:bg-tone-2 transition-colors duration-200 mr-1"
            >
              ✏️
            </button>
            <button
              onClick={() => {
                if (timeMap) {
                  let temp = [...timeMap];
                  temp.splice(index, 1);
                  if (temp.length === 0) setSelected(-1);
                  localStorage.setItem(v_id, JSON.stringify(temp));
                  setter(temp);
                }
              }}
              className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors duration-200"
            >
              ×
            </button>
          </div>
        )}

        {/* Time Button */}
        <button
          onClick={() => {
            if (item.loop != 0) {
              setSelectedLoop(index);
            }
            seekFunc(item.timeStamp as number, item.loop as number);
          }}
          className={`w-full mb-2 p-2 rounded-lg font-bold text-base transition-all duration-200 ${
            selected === index
              ? 'bg-black text-tone-1 shadow-lg'
              : 'bg-tone-1 text-black hover:bg-tone-2 hover:shadow-lg'
          }`}
        >
          {formatTime(item.timeStamp)}
        </button>

        {/* Loop Status */}
        <div className="mb-2">
          {loopSelected !== -1 && loopSelected === index ? (
            <button
              onClick={() => {
                setSelectedLoop(-1);
                stopper();
                onPause();
              }}
              className="w-full p-1.5 bg-red-500 text-white rounded-lg font-semibold text-xs hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Stop Loop
            </button>
          ) : (
            <div
              className={`text-center p-1.5 rounded-lg ${
                item.loop > 0
                  ? 'bg-tone-2/20 text-tone-2 border border-tone-2/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}
            >
              <span className="text-xs font-medium">
                {item.loop > 0 ? `∞ ${item.loop}s Loop` : 'No Loop'}
              </span>
            </div>
          )}
        </div>

        {/* Proficiency */}
        <div className="mb-2">
          <h4 className="text-white/60 text-xs mb-2">Proficiency Level</h4>
          <ProficiencyControl
            currentProficieny={item.proficiency}
            setter={setProficiency}
            index={index}
          />
        </div>
      </div>
    </div>
  );
};
