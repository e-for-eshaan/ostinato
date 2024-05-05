import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoopType } from "../features/VideoPlayer/VideoPlayer";

interface TimeState {
    currentTimeStamp: LoopType,
    allTimeStamps: LoopType[]
}

const initialState: TimeState = {
    currentTimeStamp: {} as LoopType,
    allTimeStamps: [] as LoopType[]
};

const timeSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentTimeStamp: (state, action: PayloadAction<LoopType>) => {
            state.currentTimeStamp = action.payload;
        },
        setAllTimeStamps: (state, action: PayloadAction<LoopType[]>) => {
            state.allTimeStamps = action.payload;
        }
    },
});

export const { setCurrentTimeStamp, setAllTimeStamps } = timeSlice.actions;
export default timeSlice.reducer;
