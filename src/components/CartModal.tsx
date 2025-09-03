"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setQuantity,
  removeFromCart,
  clearCart,
} from "@/store/slices/cartSlice";
import { Button } from "./UI";
import Link from "next/link";

export default function CartModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, shipping } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const subtotal = items.reduce(
    (s, i) =>
      s + i.product.price * (1 - (i.product.discount || 0) / 100) * i.quantity,
    0
  );
  const total = subtotal + shipping;

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Shopping Cart</h3>
          <button onClick={onClose}>✖</button>
        </div>
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {items.map((i) => (
              <div
                key={i.product._id}
                className="flex gap-3 border rounded-xl p-3"
              >
                {i.product.images?.[0] && (
                  <img
                    src={i.product.images[0]}
                    alt={i.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{i.product.name}</p>
                    <button
                      className="text-sm underline"
                      onClick={() => dispatch(removeFromCart(i.product._id))}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <input
                      type="number"
                      className="w-20 border rounded-xl px-2 py-1"
                      value={i.quantity}
                      min={1}
                      max={i.product.stock}
                      onChange={(e) =>
                        dispatch(
                          setQuantity({
                            id: i.product._id,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                    />
                    <span>
                      ৳{" "}
                      {(
                        i.product.price *
                        (1 - (i.product.discount || 0) / 100) *
                        i.quantity
                      ).toFixed(0)}
                    </span>
                  </div>
                  {i.product.stock === 0 && (
                    <p className="text-xs text-red-600 mt-1">Stock Out</p>
                  )}
                </div>
              </div>
            ))}
            <div className="border-t pt-3 text-sm space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳ {subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>৳ {shipping.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>৳ {total.toFixed(0)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => dispatch(clearCart())}>
                Clear
              </Button>
              <Link href="/checkout" className="flex-1">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
