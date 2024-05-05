import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import timeReducer from "./timeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    time: timeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
