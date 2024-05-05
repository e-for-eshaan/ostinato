import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoopType } from "../features/VideoPlayer/VideoPlayer";

export interface TimeState {
    currentTimeStamp: LoopType,
    allTimeStamps: LoopType[],
    timeMapById: Record<string, LoopType>,
    timeMapByVideo: Record<string, LoopType[]>
}

const initialState: TimeState = {
    currentTimeStamp: {} as LoopType,
    allTimeStamps: [] as LoopType[],
    timeMapById: {} as Record<string, LoopType>,
    timeMapByVideo: {} as Record<string, LoopType[]>
};

const timeSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentTimeStamp: (state, action: PayloadAction<string | undefined>) => {
            state.currentTimeStamp = state.timeMapById[action.payload as string] || {} as LoopType;
        },
        setAllTimeStamps: (state, action: PayloadAction<LoopType[]>) => {
            state.allTimeStamps = action.payload;
            state.timeMapById = action.payload.reduce((acc, curr) => {
                acc[curr.id] = curr;
                return acc;
            }, {} as Record<string, LoopType>);
        }
    },
});

export const { setCurrentTimeStamp, setAllTimeStamps } = timeSlice.actions;
export default timeSlice.reducer;
