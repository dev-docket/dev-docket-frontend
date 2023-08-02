import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: null | string;
  status: "idle" | "loading" | "failed";
  error: null | string;
}

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { addToken } = authSlice.actions;
export default authSlice.reducer;
