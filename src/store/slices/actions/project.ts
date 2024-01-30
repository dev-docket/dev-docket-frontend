import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { NavigateFunction } from "react-router-dom";
import { Project } from "../../../types/Project";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchProjectMembersByProjectSlug = createAsyncThunk(
  "project/fetchProjectMembersByProjectSlug",
  async (
    { projectSlug }: { projectSlug: string },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;

    if (!userId) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get(
        `${apiUrl}/projects/${projectSlug}/members`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const fetchProjectBySlugAndSetAsActive = createAsyncThunk(
  "project/fetchProjectBySlugAndSetAsActive",
  async (
    { projectSlug }: { projectSlug: string },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;

    if (!userId) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get<Project>(
        `${apiUrl}/projects/${projectSlug}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (
    {
      projectName,
      navigate,
    }: { projectName: string; navigate: NavigateFunction },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.post<Project>(
        `${apiUrl}/projects`,
        {
          project: {
            name: projectName,
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

      if (response.status !== 201) {
        throw new Error("Something went wrong!");
      }

      navigate(`/projects/${response.data.slug}/dashboard`);

      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ project }: { project: Project }, { getState, rejectWithValue }) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.put<Project>(
        `${apiUrl}/projects/${project.id}`,
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      toast.success("Project updated successfully!");
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (
    { projectSlug }: { projectSlug: string },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;
    const token = auth.token;

    if (!userId || !token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.delete(`${apiUrl}/projects/${projectSlug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 204) {
        throw new Error("Something went wrong!");
      }

      toast.success("Project deleted successfully!");
      return projectSlug;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);

export const deleteProjectMember = createAsyncThunk(
  "project/deleteProjectMember",
  async (
    {
      projectSlug,
      userIdToDelete,
    }: { projectSlug: string; userIdToDelete: number },
    { getState, rejectWithValue },
  ) => {
    const { auth, user } = getState() as RootState;
    const token = auth.token;
    const userId = user.userId;

    if (!token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.delete(
        `${apiUrl}/projects/${projectSlug}/members/${userIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 204) {
        throw new Error("Something went wrong!");
      }

      return userId;
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error);
        return rejectWithValue(err.response?.data?.error);
      }
      if (err instanceof Error) {
        toast.error(err.message);
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);
