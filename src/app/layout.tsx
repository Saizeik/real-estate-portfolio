import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stepanie Kaye | Real Estate Photography",
  description: "High-quality real estate photography services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><QueryProvider>
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}
