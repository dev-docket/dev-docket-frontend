import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task, TaskActivity } from "../../types/Task";
import { fetchAllActivitiesInTask } from "./actions/taskActivity";
import { patchTask } from "./actions/task";
import { User } from "../../types/User";



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
    updateAssigneedUserInActiveTask: (state, payload: PayloadAction<User>) => {
      if (state.activeTaskInSidebar) {
        state.activeTaskInSidebar = {
          ...state.activeTaskInSidebar,
          assignedUser: payload.payload,
        };
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchAllActivitiesInTask.fulfilled,
      (state, action: PayloadAction<TaskActivity[]>) => {
        state.taskActivity = action.payload;
      },
    );
    builder.addCase(
      patchTask.fulfilled,
      (state, action: PayloadAction<Task>) => {
        state.activeTaskInSidebar = action.payload;
        state.taskActivity = action.payload.activities;
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
  updateAssigneedUserInActiveTask,
} = teamPageSlice.actions;
export default teamPageSlice.reducer;
