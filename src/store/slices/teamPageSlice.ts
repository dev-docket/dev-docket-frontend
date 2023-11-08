import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "../../types/Task";
import { fetchAllActivitiesInTask } from "./actions/taskActivity";
import { DateTime } from "luxon";

export interface TaskActivity {
  id: string;
  description: string;
  createdAt: string;
  createdAtFormatted: DateTime;
  user: {
    id: string;
    username: string;
  };
  task: {
    id: string;
  };
}

interface TeamPageState {
  isTaskDetailsSidebarOpen: boolean;
  activeTaskInSidebar?: Task;
  isDescriptionInputActive?: boolean;
  descriptionInputValue?: string;
  taskActivity?: TaskActivity[];
}

const initialState: TeamPageState = {
  isTaskDetailsSidebarOpen: false,
  activeTaskInSidebar: undefined,
  isDescriptionInputActive: false,
  descriptionInputValue: undefined,
  taskActivity: undefined,
};

const teamPageSlice = createSlice({
  name: "teamPage",
  initialState,
  reducers: {
    setActiveTaskInSidebar: (state, payload: PayloadAction<Task>) => {
      state.activeTaskInSidebar = payload.payload;
    },
    updateTask: (state, payload: PayloadAction<Task>) => {
      if (state.activeTaskInSidebar) {
        state.activeTaskInSidebar = {
          ...state.activeTaskInSidebar,
          ...payload.payload,
        };
      }
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
    addTaskActivity: (state, payload: PayloadAction<TaskActivity>) => {
      state.taskActivity?.unshift(payload.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchAllActivitiesInTask.fulfilled,
      (state, action: PayloadAction<TaskActivity[]>) => {
        state.taskActivity = action.payload;
      },
    );
  },
});

export const {
  setActiveTaskInSidebar,
  updateTask,
  openTaskDetailsSidebar,
  closeTaskDetailsSidebar,
  setDescriptionInputActive,
  setDescriptionInputValue,
  addTaskActivity,
} = teamPageSlice.actions;
export default teamPageSlice.reducer;
