import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project } from "../../types/Project";

export interface ProjectState {
  projects: Project[];
  activeProject?: Project;
}

const initialState: ProjectState = {
  projects: [],
  activeProject: undefined,
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

    removeProjectbyName: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.name !== action.payload,
      );
    },

    setActiveProject: (state, action: PayloadAction<Project>) => {
      state.activeProject = action.payload;
    },

    setActiveProjectBySlug: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(
        (project) => project.slug === action.payload,
      );
      if (project) {
        state.activeProject = project;
      }
    },

    setActiveProjectByName: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(
        (project) => project.name === action.payload,
      );
      if (project) {
        state.activeProject = project;
      }
    },

    removeActiveProject: (state) => {
      state.activeProject = undefined;
    },
  },
});

export const {
  addProjects,
  addProject,
  removeProjects,
  removeProjectbyName,
  setActiveProject,
  setActiveProjectBySlug,
  setActiveProjectByName,
  removeActiveProject,
} = projectSlice.actions;
export default projectSlice.reducer;
