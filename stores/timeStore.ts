import { create } from 'zustand';
import { LoopType } from '../features/VideoPlayer/VideoPlayer';

interface TimeState {
  currentTimeStamp: LoopType;
  allTimeStamps: LoopType[];
  timeMapById: Record<string, LoopType>;
  timeMapByVideo: Record<string, LoopType[]>;
  setCurrentTimeStamp: (id: string | undefined) => void;
  setAllTimeStamps: (timeStamps: LoopType[]) => void;
}

export const useTimeStore = create<TimeState>((set, get) => ({
  currentTimeStamp: {} as LoopType,
  allTimeStamps: [] as LoopType[],
  timeMapById: {} as Record<string, LoopType>,
  timeMapByVideo: {} as Record<string, LoopType[]>,
  setCurrentTimeStamp: id => {
    const state = get();
    const timeStamp = state.timeMapById[id as string] || ({} as LoopType);
    set({ currentTimeStamp: timeStamp });
  },
  setAllTimeStamps: timeStamps => {
    const timeMapById = timeStamps.reduce(
      (acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      },
      {} as Record<string, LoopType>
    );
    set({ allTimeStamps: timeStamps, timeMapById });
  },
}));
