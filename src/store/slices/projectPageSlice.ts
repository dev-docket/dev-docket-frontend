import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

interface ProjectPageState {
  isDetailsTaskSidebarOpen: boolean;
  activeTask?: Task;
  isDescriptionInputActive?: boolean;
  descriptionInputValue?: string;
}

const initialState: ProjectPageState = {
  isDetailsTaskSidebarOpen: false,
  activeTask: undefined,
  isDescriptionInputActive: false,
};

const projectPageSlice = createSlice({
  name: "projectPage",
  initialState,
  reducers: {
    openDetailsTaskSidebar: (state, payload: PayloadAction<Task>) => {
      state.activeTask = payload.payload;
      state.descriptionInputValue = payload.payload.description;
      state.isDetailsTaskSidebarOpen = true;
    },
    closeDetailsTaskSidebar: (state) => {
      state.isDetailsTaskSidebarOpen = false;
      state.activeTask = undefined;
      state.isDescriptionInputActive = false;
      state.descriptionInputValue = undefined;
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
  openDetailsTaskSidebar,
  closeDetailsTaskSidebar,
  setDescriptionInputActive,
  setDescriptionInputValue,
} = projectPageSlice.actions;
export default projectPageSlice.reducer;
