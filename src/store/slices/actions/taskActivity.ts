import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { DateTime } from "luxon";
import { TaskActivity } from "@/types/Task";

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
      const response = await axios.get<TaskActivity[]>(
        `${apiUrl}/tasks/${taskId}/activities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      const data = response.data;

      // in data there is createdAt field which is a string. Format to DateTime luxon object
      data.forEach((activity) => {
        activity.createdAtFormatted = DateTime.fromISO(activity.createdAt);
      });

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong!");
    }
  },
);
