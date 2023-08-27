import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

interface HomeState {
  isDetailsTaskSidebarOpen: boolean;
  activeTask?: Task;
}

const initialState: HomeState = {
  isDetailsTaskSidebarOpen: false,
  activeTask: undefined,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    openDetailsTaskSidebar: (state, payload: PayloadAction<Task>) => {
      state.activeTask = payload.payload;
      state.isDetailsTaskSidebarOpen = true;
    },
    closeDetailsTaskSidebar: (state) => {
      state.isDetailsTaskSidebarOpen = false;
    },
  },
});

export const { openDetailsTaskSidebar, closeDetailsTaskSidebar } =
  homeSlice.actions;
export default homeSlice.reducer;
