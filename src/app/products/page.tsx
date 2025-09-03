"use client";
import { useListProductsQuery } from "@/store/services/productsApi";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export default function Products() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isFetching } = useListProductsQuery({
    page,
    limit: 12,
    search,
  });
  const payload =
    data && "success" in data && data.success
      ? data.data
      : { items: [], total: 0, page: 1, limit: 12 };

  const totalPages = Math.ceil(payload.total / payload.limit || 1);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="border rounded-xl px-3 py-2"
        />
      </div>
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {payload.items.map((p) => (
            <ProductCard key={p._id} p={p} />
          ))}
        </div>
      )}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="border rounded-xl px-3 py-2"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          className="border rounded-xl px-3 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
