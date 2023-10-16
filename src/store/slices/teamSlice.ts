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
  loading: {
    teams: "idle" | "pending" | "succeeded" | "failed";
    teamMembers: "idle" | "pending" | "succeeded" | "failed";
  };
  activeTeam?: Team;
  teamMembers?: TeamMember[];
}

const initialState: TeamSlice = {
  teams: [],
  loading: {
    teams: "idle",
    teamMembers: "idle",
  },
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
      state.loading.teams = "pending";
    });
    builder.addCase(fetchTeamsByProjectId.fulfilled, (state, action) => {
      state.teams = action.payload;
      state.loading.teams = "succeeded";
    });
    builder.addCase(fetchTeamsByProjectId.rejected, (state) => {
      state.loading.teams = "failed";
    });
    builder.addCase(fetchTeamsByProjectSlug.pending, (state) => {
      state.loading.teams = "pending";
    });
    builder.addCase(fetchTeamsByProjectSlug.fulfilled, (state, action) => {
      state.teams = action.payload;
      state.loading.teams = "succeeded";
    });
    builder.addCase(fetchTeamsByProjectSlug.rejected, (state) => {
      state.loading.teams = "failed";
    });
    builder.addCase(fetchTeamMembersByTeamId.pending, (state) => {
      state.loading.teamMembers = "pending";
    });
    builder.addCase(fetchTeamMembersByTeamId.fulfilled, (state, action) => {
      state.teamMembers = action.payload;
      state.loading.teamMembers = "succeeded";
    });
    builder.addCase(fetchTeamMembersByTeamId.rejected, (state) => {
      state.loading.teamMembers = "failed";
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.teams.push(action.payload);
    });
    builder.addCase(updateActiveTeam.fulfilled, (state, action) => {
      state.activeTeam = action.payload;
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
