"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "use-shopping-cart";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize animate on scroll
    AOS.init();
  }, []);

  const cartProviderProps: {
    stripe: string;
    cartMode: "checkout-session";
    currency: string;
    shouldPersist: boolean;
  } = {
    stripe: process.env.NEXT_PUBLIC_STRIPE_KEY ?? "",
    cartMode: "checkout-session",
    currency: "USD",
    shouldPersist: true,
  };

  return (
    <html lang="en">
      <Head>
        <title>Best Books</title>
      </Head>
      <body className={inter.className}>
        <CartProvider {...cartProviderProps}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" />
      <Script
        src="https://kit.fontawesome.com/a0c5c115e8.js"
        crossOrigin="anonymous"
      ></Script>
    </html>
  );
}

export const dynamic = 'force-dynamic'