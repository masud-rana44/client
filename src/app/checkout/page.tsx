"use client";
import { AuthGuard } from "@/components/Guard";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useCreateOrderMutation } from "@/store/services/ordersApi";
import { clearCart } from "@/store/slices/cartSlice";
import { toast } from "react-toastify";

export default function Checkout() {
  return (
    <AuthGuard>
      <CheckoutInner />
    </AuthGuard>
  );
}

function CheckoutInner() {
  const { items, shipping } = useAppSelector((s) => s.cart);
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch();

  const subtotal = items.reduce(
    (s, i) =>
      s + i.product.price * (1 - (i.product.discount || 0) / 100) * i.quantity,
    0
  );
  const total = subtotal + shipping;

  const placeOrder = async () => {
    const payload = {
      items: items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
      })),
      shipping,
    };
    const res = await createOrder(payload).unwrap();
    if ("success" in res && res.success) {
      toast.success("Order placed");
      dispatch(clearCart());
    }
  };

  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-xl font-semibold">Checkout</h1>
      <div className="border rounded-2xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Items</span>
          <span>{items.length}</span>
        </div>
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
      <button
        onClick={placeOrder}
        className="w-full bg-black text-white rounded-xl py-3"
      >
        Place Order
      </button>
    </div>
  );
}
