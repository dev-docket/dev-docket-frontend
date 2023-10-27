import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

export interface UserState {
  user: User | null;
  userId: number | null;
  isProfileComplete?: boolean;
}

const initialState: UserState = {
  user: null,
  userId: null,
  isProfileComplete: undefined,
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
      state.isProfileComplete = undefined;
    },
    setProfileComplete: (state, action) => {
      state.isProfileComplete = action.payload;
    },
  },
});

export const { setUser, removeUser, setProfileComplete } = userSlice.actions;
export default userSlice.reducer;
