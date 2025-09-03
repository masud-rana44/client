"use client";
import Link from "next/link";
import type { Product } from "@/types";

export default function ProductCard({ p }: { p: Product }) {
  const price = p.discount ? p.price * (1 - p.discount / 100) : p.price;
  return (
    <div className="border rounded-2xl p-4 flex flex-col gap-3">
      {p.images?.[0] && (
        <img
          src={p.images[0]}
          alt={p.name}
          className="w-full h-40 object-cover rounded-xl"
        />
      )}
      <Link href={`/products/${p._id}`} className="font-semibold line-clamp-1">
        {p.name}
      </Link>
      <div className="flex items-center gap-2">
        <span className="font-bold">৳ {price.toFixed(0)}</span>
        {p.discount ? (
          <span className="line-through text-xs text-slate-500">
            ৳ {p.price.toFixed(0)}
          </span>
        ) : null}
      </div>
      <span
        className={`text-xs ${p.stock > 0 ? "text-green-600" : "text-red-600"}`}
      >
        {p.stock > 0 ? "In Stock" : "Stock Out"}
      </span>
    </div>
  );
}
