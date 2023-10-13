import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { RootState } from "../../store";
import { ProjectInvitation } from "../../../types/Project";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchProjectInvitations = createAsyncThunk(
  "project/fetchProjectInvitations",
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
        `${apiUrl}/projects/${projectSlug}/invitations`,
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

export const fetchProjectInvitation = createAsyncThunk(
  "project/fetchProjectInvitation",
  async (
    { token, projectSlug }: { token: string; projectSlug: string },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;

    if (!userId) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.get(
        `${apiUrl}/projects/${projectSlug}/invitations/${token}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      console.log(response.data);

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

export const generateProjectInvitationLink = createAsyncThunk(
  "project/generateProjectInvitationLink",
  async (
    { projectSlug, email }: { projectSlug: string; email: string },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;

    if (!userId) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.post<ProjectInvitation>(
        `${apiUrl}/projects/${projectSlug}/invitations`,
        {
          email,
          creatorId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status !== 201) {
        throw new Error("Something went wrong!");
      }

      return response.data;
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

export const acceptProjectInvitation = createAsyncThunk(
  "project/acceptProjectInvitation",
  async (
    { token, projectSlug }: { token: string; projectSlug: string },
    { getState, rejectWithValue },
  ) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;

    if (!userId) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.post(
        `${apiUrl}/projects/${projectSlug}/invitations/${token}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status !== 204) {
        throw new Error("Something went wrong!");
      }

      return response.data;
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

export const deleteProjectInvitation = createAsyncThunk(
  "project/declineProjectInvitation",
  async ({ token }: { token: string }, { getState, rejectWithValue }) => {
    const { user, auth } = getState() as RootState;
    const userId = user.userId;

    if (!userId) {
      return rejectWithValue("Please login first");
    }

    try {
      const response = await axios.delete(
        `${apiUrl}/projects/members/invites/${token}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status !== 204) {
        throw new Error("Something went wrong!");
      }

      return token;
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
