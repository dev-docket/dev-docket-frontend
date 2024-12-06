import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Get initial token from localStorage if it exists
const getInitialToken = () => {
  try {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return null;

    // Validate token format
    const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
    const currentTime = Date.now() / 1000;

    // If token is expired, remove it and return null
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return null;
    }

    return storedToken;
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

const initialState: AuthState = {
  token: getInitialToken(),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.status = "idle";
      state.error = null;
      // Synchronize with localStorage
      localStorage.setItem("token", action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      state.status = "idle";
      state.error = null;
      // Clean up localStorage
      localStorage.removeItem("token");
    },
    setLoading: (state) => {
      state.status = "loading";
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
});

export const { addToken, removeToken, setLoading, setError, resetError } =
  authSlice.actions;

// Selectors
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export const selectAuthStatus = (state: { auth: AuthState }) =>
  state.auth.status;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
