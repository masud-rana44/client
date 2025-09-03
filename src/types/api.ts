export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
};
export type ApiResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; message: string };
