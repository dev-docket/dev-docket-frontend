import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createTeam,
  fetchTeamMembersByTeamId,
  fetchTeamsByProjectId,
  fetchTeamsByProjectSlug,
  updateActiveTeam,
} from "./actions/team";
import { Team, TeamMember } from "../../types/Team";

interface TeamSlice {
  teams: Team[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  activeTeam?: Team;
  teamMembers?: TeamMember[];
}

const initialState: TeamSlice = {
  teams: [],
  loading: "idle",
  activeTeam: undefined,
  teamMembers: undefined,
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
    setActiveTeam: (state, payload: PayloadAction<Team>) => {
      state.activeTeam = payload.payload;
    },
    clearActiveTeam: (state) => {
      state.activeTeam = undefined;
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
    builder.addCase(fetchTeamMembersByTeamId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchTeamMembersByTeamId.fulfilled, (state, action) => {
      state.teamMembers = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchTeamMembersByTeamId.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(createTeam.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.teams.push(action.payload);
      state.loading = "succeeded";
    });
    builder.addCase(createTeam.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(updateActiveTeam.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(updateActiveTeam.fulfilled, (state, action) => {
      state.activeTeam = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(updateActiveTeam.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const {
  addTeam,
  removeTeam,
  updateTeam,
  setActiveTeam,
  clearActiveTeam,
} = teamSlice.actions;
export default teamSlice.reducer;
