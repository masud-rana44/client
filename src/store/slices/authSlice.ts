import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";

type AuthState = { user: User | null; accessToken: string | null };
const initialState: AuthState = { user: null, accessToken: null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});
export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
