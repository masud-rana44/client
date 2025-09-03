"use client";
import { baseApi } from "@/store/services/baseApi";
import type { User } from "@/types";
import { useEffect, useState } from "react";

export default function UsersAdmin() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{
    items: User[];
    total: number;
    page: number;
    limit: number;
  }>({ items: [], total: 0, page: 1, limit: 10 });
  const [trigger] = baseApi.endpoints.users?.useLazyQuery() ?? [];

  useEffect(() => {
    (async () => {
      const res: { data?: { success: boolean; data: typeof data } } =
        await trigger?.({
          url: `/users`,
          method: "GET",
          params: { page, limit: 10 },
        });
      if (res?.data && "success" in res.data) setData(res.data.data);
    })();
  }, [page]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Users</h2>
      <div className="border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 text-center">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button
          className="border rounded-xl px-3 py-1"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="border rounded-xl px-3 py-1"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
