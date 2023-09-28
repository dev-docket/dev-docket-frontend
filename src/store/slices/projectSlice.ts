import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project, ProjectInvitation, ProjectMember } from "../../types/Project";
import {
  createProject,
  deleteProject,
  fetchProjectMembersByProjectSlug,
} from "./actions/project";
import {
  deleteProjectInvitation,
  fetchProjectInvitation,
  fetchProjectInvitations,
  generateProjectInvitationLink,
} from "./actions/projectInvitations";

export interface ProjectState {
  projects: Project[];
  activeProject?: Project;
  projectMembers: ProjectMember[];
  projectInvitation?: ProjectInvitation;
  projectInvitations: ProjectInvitation[];
}

const initialState: ProjectState = {
  projects: [],
  activeProject: undefined,
  projectMembers: [],
  projectInvitation: undefined,
  projectInvitations: [],
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

    clearActiveProject: (state) => {
      state.activeProject = undefined;
    },

    setProjectInvitation: (
      state,
      action: PayloadAction<ProjectInvitation | undefined>,
    ) => {
      state.projectInvitation = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchProjectMembersByProjectSlug.fulfilled,
      (state, action) => {
        state.projectMembers = action.payload;
      },
    );
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      },
    );
    builder.addCase(
      fetchProjectInvitations.fulfilled,
      (state, action: PayloadAction<ProjectInvitation[]>) => {
        state.projectInvitations = action.payload;
      },
    );
    builder.addCase(
      fetchProjectInvitation.fulfilled,
      (state, action: PayloadAction<ProjectInvitation>) => {
        state.projectInvitation = action.payload;
      },
    );
    builder.addCase(
      generateProjectInvitationLink.fulfilled,
      (state, action: PayloadAction<ProjectInvitation>) => {
        state.projectInvitation = action.payload;
      },
    );
    builder.addCase(
      deleteProjectInvitation.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.projectInvitations = state.projectInvitations.filter(
          (projectInvitation) => projectInvitation.token !== action.payload,
        );
      },
    );
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter(
          (project) => project.slug !== action.payload,
        );
      },
    );
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
  clearActiveProject,
  setProjectInvitation,
} = projectSlice.actions;
export default projectSlice.reducer;
