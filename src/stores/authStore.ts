import { persist } from "zustand/middleware";
import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  email: string;
  isProfileCompleted: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isProfileCompleted: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  setError: (error: string | null) => void;
  setToken: (token: string) => void;
  setProfileCompleted: (isCompleted: boolean) => void;
  checkTokenExpiration: () => (() => void) | undefined;
}

const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,
      isProfileCompleted: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const { data } = await axios.post(`${apiUrl}/auth/login`, {
            email,
            password,
          });

          set({
            token: data.access_token,
            user: data.user,
            isProfileCompleted: data.user.isProfileCompleted,
            isLoading: false,
            error: null,
            isAuthenticated: true,
          });

          return data.access_token;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            toast.error(err.response?.data.message);
            set({ error: "Invalid login or password", isLoading: false });
          } else {
            set({ error: "Something went wrong!", isLoading: false });
          }
        }
      },

      setToken: (token: string) => {
        set({
          token,
          isAuthenticated: true,
        });
      },

      setProfileCompleted: (isCompleted: boolean) => {
        set({
          isProfileCompleted: isCompleted,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isProfileCompleted: false,
          isAuthenticated: false,
        });
      },

      setError: (error: string | null) => set({ error }),

      checkTokenExpiration: () => {
        const { token, logout } = get();
        if (!token) return;

        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          const expirationTime = decodedToken.exp as number;
          const timeUntilExpiration = expirationTime - currentTime;

          if (timeUntilExpiration <= 0) {
            console.log("Token expired, logging out...");
            logout();
            return;
          }

          const logoutDelay = (timeUntilExpiration - 5) * 1000;

          console.log(
            `Token expires in ${Math.floor(timeUntilExpiration / 60)} minutes and ${Math.floor(timeUntilExpiration % 60)} seconds`,
          );

          const timeoutId = setTimeout(() => {
            console.log("Token about to expire, logging out...");
            logout();
          }, logoutDelay);

          return () => clearTimeout(timeoutId);
        } catch (error) {
          console.error("Token validation error:", error);
          logout();
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isProfileCompleted: state.isProfileCompleted,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);