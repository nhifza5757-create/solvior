import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Northbound — Consulting that moves you forward",
  description:
    "Northbound partners with growing businesses on strategy, operations, and leadership — turning complexity into a clear direction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-ink cursor-none-fine">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
