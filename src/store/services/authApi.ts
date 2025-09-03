import { baseApi } from "./baseApi";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types";

type AuthPayload = { email: string; password: string };

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  photo?: string;
};

type AuthResponse = ApiResponse<{ user: User; accessToken: string }>;

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, RegisterPayload>({
      query: (data) => ({ url: "/auth/register", method: "POST", data }),
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<AuthResponse, AuthPayload>({
      query: (data) => ({ url: "/auth/login", method: "POST", data }),
      invalidatesTags: ["Auth"],
    }),
    me: build.query<ApiResponse<User>, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useMeQuery } = authApi;
