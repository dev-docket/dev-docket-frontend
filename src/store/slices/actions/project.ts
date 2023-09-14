import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { NavigateFunction } from "react-router-dom";
import { Project } from "../../../types/Project";

const apiUrl = import.meta.env.VITE_API_URL;

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
        `${apiUrl}/users/${userId}/projects`,
        {
          name: projectName,
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

      navigate(`/projects/${response.data.slug}/project-dashboard`);

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
