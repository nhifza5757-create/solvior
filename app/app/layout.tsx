import type { Metadata } from "next";
import { Lato, Libre_Franklin } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-libre-franklin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solvior - Business Consulting Next.js Template",
  description: "Tailored consulting for the modern business.",
icons: {
    icon: '/favicon.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${libreFranklin.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
