import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAllActivitiesInTask = createAsyncThunk(
  "taskActivity/fetchAllActivitiesInTask",
  async (taskId: number, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    const token = auth.token;

    if (!token) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await fetch(`${apiUrl}/tasks/${taskId}/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);
