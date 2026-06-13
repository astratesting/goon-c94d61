import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goon - AI Trading Platform",
  description: "Autonomous AI trading platform for retail investors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-white antialiased">{children}</body>
    </html>
  );
}
