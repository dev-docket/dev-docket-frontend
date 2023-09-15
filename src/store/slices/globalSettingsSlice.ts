import { createSlice } from "@reduxjs/toolkit";

interface GlobalSettingsState {
  isMenuSidebarOpen: boolean;
}

const initialState: GlobalSettingsState = {
  isMenuSidebarOpen: true,
};

const globalSettingsSlice = createSlice({
  name: "globalSettings",
  initialState,
  reducers: {
    openMenuSidebar(state) {
      state.isMenuSidebarOpen = true;
    },
    closeMenuSidebar(state) {
      state.isMenuSidebarOpen = false;
    },
  },
});

export const { openMenuSidebar, closeMenuSidebar } =
  globalSettingsSlice.actions;
export default globalSettingsSlice.reducer;
