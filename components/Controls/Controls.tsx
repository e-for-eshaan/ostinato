import React, { useRef, useState } from 'react';
import { LoopType } from '../../features/VideoPlayer/VideoPlayer';
import { TimeCard, Button, Heading, Text } from '../../components';
import { cloneDeep } from 'lodash';
import { uuid } from '../../utils/functions';

interface ControlsProps {
  setter: (e: any) => void;
  timeMap?: LoopType[];
  v_id: string;
  seekFunc: (time: number, loop: number) => void;
  loopSelected: number;
  setSelectedLoop: (e: number) => void;
  stopper: (e: any) => void;
  onPause: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  setter,
  timeMap,
  v_id,
  seekFunc,
  loopSelected,
  setSelectedLoop,
  stopper,
  onPause,
}) => {
  const [selected, setSelected] = useState<number>(-1);
  const timeStampRef = useRef<any>();
  const descriptionRef = useRef<any>(null);
  const loopRef = useRef<any>(null);

  function addTimeStamp() {
    if (typeof window !== 'undefined' && timeMap) {
      let temp = cloneDeep(timeMap);
      let x = {
        id: uuid(),
        vid: v_id,
        timeStamp: 0,
        description: 'Untitled',
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
      const temp = timeMap.map((item, idx) => {
        if (index === idx) return { ...item, proficiency: value };
        else return item;
      });
      setter(temp);
      localStorage.setItem(v_id, JSON.stringify(temp));
    }
  }

  function upadateTimestamp() {
    if (timeMap) {
      let temp = cloneDeep(timeMap);
      temp[selected].timeStamp = timeStampRef.current.value
        ? timeStampRef.current.value
        : temp[selected].timeStamp;

      temp[selected].description = descriptionRef.current.value
        ? descriptionRef.current.value
        : temp[selected].description;

      temp[selected].loop = loopRef.current.value ? loopRef.current.value : temp[selected].loop;

      setter(temp);
      localStorage.setItem(v_id, JSON.stringify(timeMap));
      setSelected(-1);
    }
  }
  const EditValues = () => {
    return (
      <div className={`p-4 ${selected === -1 ? 'opacity-50' : 'opacity-100'}`}>
        <div className="space-y-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-1">
              {timeMap &&
              selected > -1 &&
              timeMap[selected].description === 'Untitled' &&
              timeMap[selected].timeStamp == 0
                ? 'Enter Values'
                : 'Edit Values'}
            </h2>
            <p className="text-white/60 text-xs">Configure your practice timestamp</p>
          </div>

          {/* Time Stamp Input */}
          <div>
            <label className="block text-white font-semibold text-xs mb-1">
              Time Stamp (seconds)
            </label>
            <input
              disabled={selected === -1}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-tone-1 focus:ring-1 focus:ring-tone-1/20 transition-all duration-200 text-sm"
              ref={timeStampRef}
              type="number"
              step="0.1"
              placeholder={timeMap ? timeMap[selected]?.timeStamp.toString() : '0'}
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-white font-semibold text-xs mb-1">Description</label>
            <input
              disabled={selected === -1}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-tone-1 focus:ring-1 focus:ring-tone-1/20 transition-all duration-200 text-sm"
              ref={descriptionRef}
              type="text"
              placeholder={
                timeMap ? timeMap[selected]?.description.toString() : 'Enter description'
              }
            />
          </div>

          {/* Loop Duration Input */}
          <div>
            <label className="block text-white font-semibold text-xs mb-1">
              Loop Duration (seconds)
            </label>
            <input
              disabled={selected === -1}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-tone-1 focus:ring-1 focus:ring-tone-1/20 transition-all duration-200 text-sm"
              ref={loopRef}
              type="number"
              step="0.1"
              placeholder={timeMap && selected > -1 ? timeMap[selected]?.loop.toString() : '5'}
            />
            <p className="text-white/40 text-xs mt-1">Set to 0 for no loop</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              onClick={upadateTimestamp}
              disabled={selected === -1}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-all duration-200 ${
                selected === -1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-tone-1 text-black hover:bg-tone-2'
              }`}
            >
              Save
            </button>

            <button
              onClick={() => {
                if (
                  timeMap &&
                  selected === 0 &&
                  timeMap[selected].description === 'Untitled' &&
                  timeMap[selected].timeStamp === 0
                ) {
                  let temp = cloneDeep(timeMap);
                  temp.splice(0, 1);
                  localStorage.setItem(v_id, JSON.stringify(temp));
                  setter(temp);
                }
                setSelected(-1);
              }}
              disabled={selected === -1}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-all duration-200 ${
                selected === -1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Top Tray */}
      <div className="h-16 bg-white/5 border-b border-white/10 flex items-center justify-between px-4">
        <h1 className="text-white font-semibold text-base">Time Cards</h1>
        <button
          onClick={selected === -1 ? addTimeStamp : () => {}}
          disabled={selected !== -1}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            selected === -1
              ? 'bg-tone-2 text-black hover:bg-tone-1 cursor-pointer'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          + Add New
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Create/Edit Section - Only visible when editing */}
        {selected !== -1 && (
          <div className="border-b border-white/10">
            <EditValues />
          </div>
        )}

        {/* Time Cards Section */}
        <div className="flex-1 p-4">
          <div className="overflow-y-auto max-h-[calc(100vh-64px)] lg:max-h-[calc(100vh-80px)]">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
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
                    onPause={onPause}
                  />
                );
              })}
            </div>

            {(!timeMap || timeMap.length === 0) && (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">🎵</span>
                </div>
                <h3 className="text-white font-semibold mb-1 text-sm">No Timestamps Yet</h3>
                <p className="text-white/60 text-xs">
                  Click "Add New" to create your first practice marker
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
