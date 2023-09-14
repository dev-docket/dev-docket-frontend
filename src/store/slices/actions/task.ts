import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { Task, TaskStatus } from "../../../types/Task";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllTasksInTeam = createAsyncThunk(
  "tasks/fetchAllTasksInTeam",
  async (teamId: number, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    const token = auth.token;

    if (!token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get(`${apiUrl}/teams/${teamId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      return await response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const fetchAllUserTasks = createAsyncThunk(
  "tasks/fetchAllUserTasks",
  async (projectName: string, { getState, rejectWithValue }) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get(
        `${apiUrl}/users/${userId}/projects/${projectName}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      return await response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (
    {
      projectName,
      name,
      status,
    }: { projectName: string; name: string; status: TaskStatus },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.post(
        `${apiUrl}/users/${userId}/projects/${projectName}/tasks`,
        {
          name: name.trim(),
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 201) {
        throw new Error("Something went wrong!");
      }

      return await response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const patchTask = createAsyncThunk(
  "tasks/patchTask",
  async (
    { taskId, task }: { taskId: number; task: Partial<Task> },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.patch(
        `${apiUrl}/users/${userId}/tasks/${taskId}`,
        {
          ...task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      return await response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (_, { getState, rejectWithValue }) => {
    const { user, auth, projectPage } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;
    const taskId = projectPage?.activeTask?.id;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    if (!taskId) {
      return rejectWithValue("Please select a task first");
    }

    try {
      const response = await axios.delete(
        `${apiUrl}/users/${userId}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 204) {
        throw new Error("Something went wrong!");
      }

      return taskId;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);
