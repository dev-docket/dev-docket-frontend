import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/User";

const apiUrl: string = import.meta.env.VITE_API_URL;

export type Credentials = {
  email: string;
  password: string;
};

export interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
