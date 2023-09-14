import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Fetch all teams in a project by project id
 */
export const fetchTeamsByProjectId = createAsyncThunk(
  "teams/fetchTeamsByProjectId",
  async (projectId: number, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    const token = auth.token;

    if (!token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get(
        `${apiUrl}/projects/${projectId}/teams`,
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
 * Fetch all teams in a project by project slug
 */
export const fetchTeamsByProjectSlug = createAsyncThunk(
  "teams/fetchTeamsByProjectSlug",
  async (projectSlug: string, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    const token = auth.token;

    if (!token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get(
        `${apiUrl}/projects/${projectSlug}/teams`,
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
