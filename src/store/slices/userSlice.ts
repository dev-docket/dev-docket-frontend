import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

export interface UserState {
  user: User | null;
  userId: number | null;
}

const initialState: UserState = {
  user: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userId = action.payload.id;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
