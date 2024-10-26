import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import {AppbarClient }from "../components/AppbarClient";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
 
  return (
    <html lang="en">
      <Providers>
        
        <body className={inter.className}>
          <div >
          <AppbarClient /></div>{children}</body>
      </Providers>
    </html>
  );
}