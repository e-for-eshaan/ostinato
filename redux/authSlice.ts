import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";

interface AuthState {
  isLoggedIn: boolean;
  user: UserCredential['user'];
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {} as UserCredential['user'],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: AuthState['user'] }>) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
