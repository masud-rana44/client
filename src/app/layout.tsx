import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = { title: "Shop", description: "E‑commerce" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <main className="container py-6">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
