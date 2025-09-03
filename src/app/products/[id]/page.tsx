"use client";
import { useParams } from "next/navigation";
import { useGetProductQuery } from "@/store/services/productsApi";
import QuantityInput from "@/components/QuantityInput";
import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import Link from "next/link";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProductQuery(id);
  const product =
    data && "success" in data && data.success ? data.data : undefined;
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const inCart = useAppSelector((s) =>
    s.cart.items.some((i) => i.product._id === id)
  );

  const price = useMemo(() => {
    if (!product) return 0;
    return product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price;
  }, [product]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        {product.images?.[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-80 object-cover rounded-2xl"
          />
        )}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {product.images?.slice(1).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={product.name}
              className="h-20 object-cover rounded-xl"
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-slate-600">{product.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">৳ {price.toFixed(0)}</span>
          {product.discount ? (
            <span className="line-through text-sm">
              ৳ {product.price.toFixed(0)}
            </span>
          ) : null}
        </div>
        <span
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Stock Out"}
        </span>
        <QuantityInput value={qty} onChange={setQty} max={product.stock || 1} />
        {!inCart ? (
          <button
            disabled={product.stock === 0}
            onClick={() => dispatch(addToCart({ product, quantity: qty }))}
            className="w-full bg-black text-white rounded-xl py-3 disabled:opacity-50"
          >
            Add to Cart
          </button>
        ) : (
          <Link href="/cart" className="block">
            <button className="w-full border rounded-xl py-3">View Cart</button>
          </Link>
        )}
      </div>
    </div>
  );
}
