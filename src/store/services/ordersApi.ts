import { baseApi } from "./baseApi";
import type { Order } from "@/types";
import type { ApiResponse } from "@/types/api";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    createOrder: b.mutation<
      ApiResponse<Order>,
      {
        items: { product: string; quantity: number; price: number }[];
        shipping: number;
      }
    >({
      query: (data) => ({ url: "/orders", method: "POST", data }),
      invalidatesTags: ["Order", "Product"],
    }),
    myOrders: b.query<ApiResponse<Order[]>, void>({
      query: () => ({ url: "/orders/me", method: "GET" }),
      providesTags: ["Order"],
    }),
    listOrders: b.query<
      ApiResponse<{
        items: Order[];
        page: number;
        limit: number;
        total: number;
      }>,
      {
        page?: number;
        limit?: number;
        from?: string;
        to?: string;
        status?: string;
      }
    >({
      query: (params) => ({ url: "/orders", method: "GET", params }),
      providesTags: ["Order"],
    }),
    updateOrderStatus: b.mutation<
      ApiResponse<Order>,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useMyOrdersQuery,
  useListOrdersQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;
