import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Task, TaskStatus, TaskPriority } from '../types/Task';
import { User } from '../types/User';

const apiUrl = import.meta.env.VITE_API_URL;

interface TaskState {
  tasks: Task[];
  activeTask: Task | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAllTasksInTeam: (teamId: number, token: string) => Promise<void>;
  fetchAllUserTasks: (projectName: string, userId: string, token: string) => Promise<void>;
  fetchTaskAndOpenDetailsSidebar: (taskId: number, token: string) => Promise<void>;
  createTask: (params: CreateTaskParams) => Promise<void>;
  updateTask: (params: UpdateTaskParams) => Promise<void>;
  deleteTask: (taskId: number, token: string) => Promise<void>;
  setActiveTask: (task: Task | null) => void;
}

interface CreateTaskParams {
  teamId: number;
  name: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedUser: User;
  token: string;
}

interface UpdateTaskParams {
  taskId: number;
  task: Partial<Task>;
  teamId: number;
  token: string;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  activeTask: null,
  isLoading: false,
  error: null,

  fetchAllTasksInTeam: async (teamId: number, token: string) => {
    if (!token) {
      toast.error('Please login first');
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${apiUrl}/teams/${teamId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      console.log(response.data);

      set({ tasks: response.data, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong!';
      toast.error(error);
      set({ error, isLoading: false });
    }
  },

  fetchAllUserTasks: async (projectName: string, userId: string, token: string) => {
    if (!userId || !token) {
      toast.error('Please login first');
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${apiUrl}/users/${userId}/projects/${projectName}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      set({ tasks: response.data, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong!';
      toast.error(error);
      set({ error, isLoading: false });
    }
  },

  fetchTaskAndOpenDetailsSidebar: async (taskId: number, token: string) => {
    if (!token) {
      toast.error('Please login first');
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${apiUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      set({ activeTask: response.data, isLoading: false });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong!';
      toast.error(error);
      set({ error, isLoading: false });
    }
  },

  createTask: async ({ teamId, name, description, status, priority, assignedUser, token }: CreateTaskParams) => {
    if (!token) {
      toast.error('Please login first');
      return;
    }

    const toastId = toast.loading('Creating task...');
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${apiUrl}/tasks`,
        {
          name: name.trim(),
          description: description?.trim(),
          status,
          priority,
          assignedUser,
          teamId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error('Something went wrong!');
      }

      const newTask = response.data;
      set(state => ({ 
        tasks: [...state.tasks, newTask],
        isLoading: false 
      }));

      toast.update(toastId, {
        render: 'Task created successfully',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
      });
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong!';
      toast.update(toastId, {
        render: error,
        type: 'error',
        isLoading: false,
        autoClose: 2000,
      });
      set({ error, isLoading: false });
    }
  },

  updateTask: async ({ taskId, task, teamId, token }: UpdateTaskParams) => {
    if (!token) {
      toast.error('Please login first');
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.patch(
        `${apiUrl}/tasks/${taskId}`,
        {
          id: taskId,
          ...task,
          teamId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }

      const updatedTask = response.data;
      set(state => ({
        tasks: state.tasks.map(t => t.id === taskId ? updatedTask : t),
        activeTask: state.activeTask?.id === taskId ? updatedTask : state.activeTask,
        isLoading: false
      }));

      toast.success('Task updated successfully');
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong!';
      toast.error(error);
      set({ error, isLoading: false });
    }
  },

  deleteTask: async (taskId: number, token: string) => {
    if (!token) {
      toast.error('Please login first');
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.delete(`${apiUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 204) {
        throw new Error('Something went wrong!');
      }

      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
        activeTask: state.activeTask?.id === taskId ? null : state.activeTask,
        isLoading: false
      }));

      toast.success('Task deleted successfully');
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Something went wrong!';
      toast.error(error);
      set({ error, isLoading: false });
    }
  },

  setActiveTask: (task: Task | null) => {
    set({ activeTask: task });
  },
}));