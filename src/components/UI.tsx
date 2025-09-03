"use client";
import { motion } from "framer-motion";
import React from "react";

export const Button = ({
  children,
  className = "",
  ...props
}: import("framer-motion").HTMLMotionProps<"button">) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    className={`px-4 py-2 rounded-xl shadow-sm border text-sm ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full border rounded-xl px-3 py-2 outline-none ${
      props.className ?? ""
    }`}
  />
);

export const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) => (
  <label htmlFor={htmlFor} className="text-sm font-medium">
    {children}
  </label>
);
