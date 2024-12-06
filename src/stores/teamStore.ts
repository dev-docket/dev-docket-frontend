// stores/teamStore.ts
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";
import { Team } from "../types/Team";

interface TeamState {
  teams: Team[];
  activeTeam: Team | null;
  loading: {
    teams: "idle" | "pending" | "succeeded" | "failed";
  };
  error: string | null;

  // Akcje
  fetchTeamsByProject: (projectSlug: string) => Promise<void>;
  createTeam: (data: { name: string; projectSlug: string }) => Promise<Team | undefined>;
  setActiveTeam: (team: Team | null) => void;
  clearTeams: () => void;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  activeTeam: null,
  loading: {
    teams: "idle",
  },
  error: null,

  fetchTeamsByProject: async (projectSlug: string) => {
    const token = useAuthStore.getState().token;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    set({ loading: { teams: "pending" } });
    try {
      const response = await axios.get(
        `${apiUrl}/projects/${projectSlug}/teams`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ 
        teams: response.data,
        loading: { teams: "succeeded" },
        error: null 
      });
    } catch (err) {
      const errorMessage = 
        axios.isAxiosError(err) 
          ? err.response?.data.message 
          : "Failed to fetch teams";
      toast.error(errorMessage);
      set({ 
        error: errorMessage,
        loading: { teams: "failed" } 
      });
    }
  },

  createTeam: async ({ name, projectSlug }) => {
    const token = useAuthStore.getState().token;
    const userId = useAuthStore.getState().user?.id;

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/teams`,
        { name, projectSlug, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newTeam = response.data;
      set(state => ({
        teams: [...state.teams, newTeam],
        error: null
      }));

      toast.success("Team created successfully");
      return newTeam;
    } catch (err) {
      const errorMessage = 
        axios.isAxiosError(err) 
          ? err.response?.data.message 
          : "Failed to create team";
      toast.error(errorMessage);
      set({ error: errorMessage });
    }
  },

  setActiveTeam: (team) => set({ activeTeam: team }),
  
  clearTeams: () => set({ 
    teams: [], 
    activeTeam: null,
    loading: { teams: "idle" },
    error: null 
  }),
}));