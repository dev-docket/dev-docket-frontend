import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";

interface HomeState {
  isDetailsTaskSidebarOpen: boolean;
  activeTask?: Task;
  isDescriptionInputActive?: boolean;
  descriptionInputValue?: string;
}

const initialState: HomeState = {
  isDetailsTaskSidebarOpen: false,
  activeTask: undefined,
  isDescriptionInputActive: false,
};

const homeSlice = createSlice({
  name: "home",
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
} = homeSlice.actions;
export default homeSlice.reducer;
