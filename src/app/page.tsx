import { useListProductsQuery } from "@/store/services/productsApi";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const { data } = useListProductsQuery({
    page: 1,
    limit: 12,
    status: "active",
  });
  const items = data && "success" in data ? data.data.items : [];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((p) => (
        <ProductCard key={p._id} p={p} />
      ))}
    </div>
  );
}
