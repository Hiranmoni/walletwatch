import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WalletWatch – Easy Expense Tracker",
  description: "Manage your financial goals easily with WalletWatch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${inter.className} min-h-screen flex flex-col justify-between`}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
        <Toaster />
      </ClerkProvider>
    </html>
  );
}
