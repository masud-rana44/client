import { baseApi } from "./baseApi";
import type { Product } from "@/types";
import type { ApiResponse } from "@/types/api";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listProducts: b.query<
      ApiResponse<{
        items: Product[];
        page: number;
        limit: number;
        total: number;
      }>,
      {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        category?: string;
      }
    >({
      query: (params) => ({ url: "/products", method: "GET", params }),
      providesTags: ["Product"],
    }),
    getProduct: b.query<ApiResponse<Product>, string>({
      query: (id) => ({ url: `/products/${id}`, method: "GET" }),
      providesTags: ["Product"],
    }),
    createProduct: b.mutation<ApiResponse<Product>, FormData>({
      query: (form) => ({
        url: "/products",
        method: "POST",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: b.mutation<
      ApiResponse<Product>,
      { id: string; form: FormData }
    >({
      query: ({ id, form }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: b.mutation<ApiResponse<{ id: string }>, string>({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});
export const {
  useListProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
