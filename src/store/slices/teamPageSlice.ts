import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

interface TeamPageState {
  isTaskDetailsSidebarOpen: boolean;
  activeTaskInSidebar?: Task;
  isDescriptionInputActive?: boolean;
  descriptionInputValue?: string;
}

const initialState: TeamPageState = {
  isTaskDetailsSidebarOpen: false,
  activeTaskInSidebar: undefined,
  isDescriptionInputActive: false,
  descriptionInputValue: undefined,
};

const teamPageSlice = createSlice({
  name: "teamPage",
  initialState,
  reducers: {
    setActiveTaskInSidebar: (state, payload: PayloadAction<Task>) => {
      state.activeTaskInSidebar = payload.payload;
    },
    openTaskDetailsSidebar: (state, payload: PayloadAction<Task>) => {
      state.activeTaskInSidebar = payload.payload;
      state.isTaskDetailsSidebarOpen = true;
    },
    closeTaskDetailsSidebar: (state) => {
      state.isTaskDetailsSidebarOpen = false;
      state.isDescriptionInputActive = false;
    },
    setDescriptionInputActive: (state, payload: PayloadAction<boolean>) => {
      state.isDescriptionInputActive = payload.payload;
    },
    setDescriptionInputValue: (state, payload: PayloadAction<string>) => {
      state.descriptionInputValue = payload.payload;
    },
  },
});

export const {
  setActiveTaskInSidebar,
  openTaskDetailsSidebar,
  closeTaskDetailsSidebar,
  setDescriptionInputActive,
  setDescriptionInputValue,
} = teamPageSlice.actions;
export default teamPageSlice.reducer;
