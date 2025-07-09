import { LoopType } from '../features/VideoPlayer/VideoPlayer';
import { useTimeStore } from '../stores';

export const useTimeStamps = () => {
  const {
    allTimeStamps,
    currentTimeStamp,
    timeMapById,
    timeMapByVideo,
    setAllTimeStamps,
    setCurrentTimeStamp,
  } = useTimeStore();

  const setSelectedLoop = (e?: string | undefined) => {
    setCurrentTimeStamp(e);
  };

  return {
    allTimeStamps,
    currentTimeStamp,
    timeMapById,
    timeMapByVideo,
    setAllTimeStamps,
    setSelectedLoop,
    selectedLoopId: currentTimeStamp.id,
  };
};
