import { AnyAction, ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { Task, TaskStatus } from "../../../types/Task";
import { toast } from "react-toastify";
import { Dispatch } from "react";
import { openTaskDetailsSidebar } from "../teamPageSlice";

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

/**
 * Fetches a single task from the server and opens the task details sidebar
 */
export const fetchTaskAndOpenDetailsSidebar = createAsyncThunk(
  "tasks/fetchTaskAndOpenDetailsSidebar",
  async (
    {
      taskId,
      dispatch,
    }: {
      taskId: number;
      dispatch?: ThunkDispatch<unknown, undefined, AnyAction> &
        Dispatch<AnyAction>;
    },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get(`${apiUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      if (dispatch) {
        dispatch(openTaskDetailsSidebar(response.data));
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
      teamId,
      name,
      status,
    }: { teamId: number; name: string; status: TaskStatus },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;
    const toastId = toast.loading("Creating task...");

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.post(
        `${apiUrl}/tasks`,
        {
          name: name.trim(),
          status,
          teamId,
          userId,
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

      toast.update(toastId, {
        render: "You have successfully created a task",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      return await response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.update(toastId, {
          render: "Something went wrong!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });

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
    {
      taskId,
      task,
      teamId,
    }: { taskId: number; task: Partial<Task>; teamId: number },
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
        `${apiUrl}/tasks/${taskId}`,
        {
          id: taskId,
          ...task,
          userId,
          teamId,
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
    const { user, auth, teamPage } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;
    const taskId = teamPage?.activeTaskInSidebar?.id;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    if (!taskId) {
      return rejectWithValue("Please select a task first");
    }

    try {
      const response = await axios.delete(`${apiUrl}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 204) {
        throw new Error("Something went wrong!");
      }

      toast.success("Task deleted successfully");
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
