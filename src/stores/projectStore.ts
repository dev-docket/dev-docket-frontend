import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";
import { Project } from "@/types/Project";
import { User } from "@/types/User";

export interface UserProjectMember {
  projectId: number;
  role: string;
  isOwner: boolean;
  user: User;
}

interface ProjectState {
  projects: Project[];
  activeProject: Project | undefined;
  isLoading: boolean;
  error: string | null;
  members: UserProjectMember[];

  // Akcje
  fetchProjects: () => Promise<void>;
  fetchProjectBySlug: (projectSlug: string) => Promise<void>;
  fetchProjectMembers: (projectSlug: string) => Promise<void>;
  createProject: (projectName: string) => Promise<Project | undefined>;
  updateProject: (project: Project) => Promise<Project | undefined>;
  deleteProject: (projectSlug: string) => Promise<void>;
  setActiveProject: (project: Project | undefined) => void;
  clearProjects: () => void;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  activeProject: undefined,
  isLoading: false,
  error: null,
  members: [],

  fetchProjects: async () => {
    const token = useAuthStore.getState().token;
    const userId = useAuthStore.getState().user?.id;

    if (!token || !userId) {
      toast.error("Please login first");
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.get(`${apiUrl}/users/${userId}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ projects: response.data, isLoading: false, error: null });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message
        : "Failed to fetch projects";
      toast.error(errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchProjectBySlug: async (projectSlug: string) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.get(`${apiUrl}/projects/${projectSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ activeProject: response.data, isLoading: false, error: null });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message
        : "Failed to fetch project";
      toast.error(errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  fetchProjectMembers: async (projectSlug: string) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.get(
        `${apiUrl}/projects/${projectSlug}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      set({
        members: response.data,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message
        : "Failed to fetch project members";
      toast.error(errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  createProject: async (projectName: string) => {
    const token = useAuthStore.getState().token;
    const userId = useAuthStore.getState().user?.id;

    if (!token || !userId) {
      toast.error("Please login first");
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.post(
        `${apiUrl}/projects`,
        {
          project: {
            name: projectName.trim(),
          },
          user: {
            id: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const newProject = response.data;
      set((state) => ({
        projects: [...state.projects, newProject],
        isLoading: false,
        error: null,
      }));

      toast.success("Project created successfully");
      return newProject;
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message
        : "Failed to create project";
      toast.error(errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  updateProject: async (project: Project) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    console.log(project)

    set({ isLoading: true });
    try {
      await axios.put(
        `${apiUrl}/projects/${project.id}`,
        {
          ...project
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === project.id ? project : p
        ),
        activeProject: project,
        isLoading: false,
        error: null,
      }));

      toast.success("Project updated successfully");
      return project;
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message
        : "Failed to update project";
      toast.error(errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  deleteProject: async (projectSlug: string) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    set({ isLoading: true });
    try {
      await axios.delete(`${apiUrl}/projects/${projectSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        projects: state.projects.filter((p) => p.slug !== projectSlug),
        activeProject:
          state.activeProject?.slug === projectSlug
            ? undefined
            : state.activeProject,
        isLoading: false,
        error: null,
      }));

      toast.success("Project deleted successfully");
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message
        : "Failed to delete project";
      toast.error(errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  setActiveProject: (project) => set({ activeProject: project }),

  clearProjects: () => set({ projects: [], activeProject: undefined }),
}));
