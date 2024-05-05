import { useSelector } from 'react-redux'
import { LoopType } from '../features/VideoPlayer/VideoPlayer'
import { useDispatch } from '../redux'
import { RootState } from '../redux/store'
import {
    TimeState, setAllTimeStamps as setAllTimeStampsDispatch,
    setCurrentTimeStamp as setCurrentTimeStampDispatch
} from '../redux/timeSlice';

export const useTimeStamps = () => {
    const dispatch = useDispatch()
    const allTimeStamps = useSelector<RootState, TimeState['allTimeStamps']>((state) => state.time.allTimeStamps)
    const currentTimeStamp = useSelector<RootState, TimeState['currentTimeStamp']>((state) => state.time.currentTimeStamp)
    const timeMapById = useSelector<RootState, TimeState['timeMapById']>((state) => state.time.timeMapById)
    const timeMapByVideo = useSelector<RootState, TimeState['timeMapByVideo']>((state) => state.time.timeMapByVideo)

    const setAllTimeStamps = (e: LoopType[]) => {
        dispatch(setAllTimeStampsDispatch(e))
    }

    const setSelectedLoop = (e?: string | undefined) => {
        dispatch(setCurrentTimeStampDispatch(e))
    }


    return {
        allTimeStamps,
        currentTimeStamp,
        timeMapById,
        timeMapByVideo,
        setAllTimeStamps,
        setSelectedLoop,
        selectedLoopId: currentTimeStamp.id
    }
}
