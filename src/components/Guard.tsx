"use client";
import { useAppSelector } from "@/store/hooks";
import { redirect } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((s) => s.auth.accessToken);
  if (!token) redirect("/login");
  return <>{children}</>;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, accessToken } = useAppSelector((s) => s.auth);
  if (!accessToken) redirect("/login");
  if (user?.role !== "admin") redirect("/");
  return <>{children}</>;
}
