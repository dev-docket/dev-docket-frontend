// stores/teamPageStore.ts
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./authStore";

interface Task {
  id: number;
  name: string;
  // inne właściwości zadania
}

interface TeamPageState {
  isTaskDetailsSidebarOpen: boolean;
  activeTaskInSidebar: Task | null;
  
  openTaskDetailsSidebar: (task: Task) => void;
  closeTaskDetailsSidebar: () => void;
  fetchTaskAndOpenSidebar: (taskId: number) => Promise<void>;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useTeamPageStore = create<TeamPageState>((set) => ({
  isTaskDetailsSidebarOpen: false,
  activeTaskInSidebar: null,

  openTaskDetailsSidebar: (task) => 
    set({ 
      isTaskDetailsSidebarOpen: true, 
      activeTaskInSidebar: task 
    }),

  closeTaskDetailsSidebar: () => 
    set({ 
      isTaskDetailsSidebarOpen: false, 
      activeTaskInSidebar: null 
    }),

  fetchTaskAndOpenSidebar: async (taskId) => {
    const token = useAuthStore.getState().token;
    
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ 
        activeTaskInSidebar: response.data,
        isTaskDetailsSidebarOpen: true 
      });
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data.message
        : "Failed to fetch task";
      toast.error(errorMessage);
    }
  },
}));