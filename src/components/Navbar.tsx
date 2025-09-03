"use client";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import CartModal from "./CartModal";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAppSelector((s) => s.auth);
  const items = useAppSelector((s) => s.cart.items);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <header className="border-b">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-lg">
          Shop
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
          )}
          <button onClick={() => setOpen(true)} className="relative">
            🛒
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white w-5 h-5 grid place-items-center rounded-full">
                {items.length}
              </span>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">Hi, {user.name.split(" ")[0]}</span>
              <button
                className="text-sm underline"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </nav>
      <CartModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
