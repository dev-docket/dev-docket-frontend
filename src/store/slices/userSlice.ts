import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

export interface UserState {
  user: User | null;
  userId: number | null;
  isProfileCompleted?: boolean;
}

const initialState: UserState = {
  user: null,
  userId: null,
  isProfileCompleted: undefined,
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
      state.userId = null;
      state.isProfileCompleted = undefined;
    },
    setProfileComplete: (state, action) => {
      state.isProfileCompleted = action.payload;
    },
  },
});

export const { setUser, removeUser, setProfileComplete } = userSlice.actions;
export default userSlice.reducer;
