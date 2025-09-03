"use client";
import { Button } from "./UI";

export default function QuantityInput({
  value,
  onChange,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  max: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => onChange(Math.max(1, value - 1))}>-</Button>
      <input
        value={value}
        onChange={(e) =>
          onChange(Math.max(1, Math.min(Number(e.target.value || 1), max)))
        }
        className="w-16 text-center border rounded-xl py-2"
      />
      <Button onClick={() => onChange(Math.min(max, value + 1))}>+</Button>
    </div>
  );
}
