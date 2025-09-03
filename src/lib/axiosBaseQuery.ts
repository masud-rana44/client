import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "./constants";

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
  }> =>
  async (args, { getState }) => {
    const state: any = getState();
    const token = state.auth?.accessToken as string | undefined;
    try {
      const result = await axios({
        url: `${API_URL}${args.url}`,
        method: args.method,
        data: args.data,
        params: args.params,
        headers: {
          ...(args.headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ message?: string }>;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };
