import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

interface TeamPageState {
  isTaskDetailsSidebarOpen: boolean;
  activeTaskInSidebar?: Task;
}

const initialState: TeamPageState = {
  isTaskDetailsSidebarOpen: false,
};

const teamPageSlice = createSlice({
  name: "teamPage",
  initialState,
  reducers: {
    openTaskDetailsSidebar: (state, payload: PayloadAction<Task>) => {
      state.activeTaskInSidebar = payload.payload;
      state.isTaskDetailsSidebarOpen = true;
    },
  },
});

export const { openTaskDetailsSidebar } = teamPageSlice.actions;
export default teamPageSlice.reducer;
