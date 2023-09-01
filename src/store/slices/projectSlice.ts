import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/Project";

export interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProjects: (state, action: PayloadAction<Project[]>) => {
      action.payload.forEach((project: Project) => {
        const index = state.projects.findIndex((p) => p.id === project.id);
        if (index !== -1) {
          state.projects[index] = project;
        } else {
          state.projects.push(project);
        }
      });
    },
    addProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id,
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      } else {
        state.projects.push(action.payload);
      }
    },
    removeProjects: (state) => {
      state.projects = [];
    },
  },
});

export const { addProjects, addProject, removeProjects } = projectSlice.actions;
export default projectSlice.reducer;
