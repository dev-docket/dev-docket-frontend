import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchTeamsByProjectId, fetchTeamsByProjectSlug } from "./actions/team";

interface Team {
  id?: number;
  name: string;
  projectId: number;
}

interface TeamSlice {
  teams: Team[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: TeamSlice = {
  teams: [],
  loading: "idle",
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeam: (state, payload: PayloadAction<Team>) => {
      state.teams.push(payload.payload);
    },
    removeTeam: (state, payload: PayloadAction<number>) => {
      state.teams = state.teams.filter((team) => team.id !== payload.payload);
    },
    updateTeam: (state, payload: PayloadAction<Team>) => {
      const index = state.teams.findIndex(
        (team) => team.id === payload.payload.id,
      );
      state.teams[index] = payload.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTeamsByProjectId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchTeamsByProjectId.fulfilled, (state, action) => {
      state.teams = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchTeamsByProjectId.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchTeamsByProjectSlug.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchTeamsByProjectSlug.fulfilled, (state, action) => {
      state.teams = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchTeamsByProjectSlug.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const { addTeam, removeTeam, updateTeam } = teamSlice.actions;
export default teamSlice.reducer;
