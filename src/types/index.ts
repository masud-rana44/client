export type Role = "admin" | "user";

export type Category = {
  _id: string;
  name: string;
  slug: string;
  status: "active" | "inactive";
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discount?: number;
  images: string[];
  stock: number;
  status: "active" | "inactive";
  categories: Category[] | string[];
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  photo?: string;
};

export type OrderItem = {
  product: string | Product;
  quantity: number;
  price: number;
};
export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";
export type Order = {
  _id: string;
  user: string | User;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  placedAt: string;
};
