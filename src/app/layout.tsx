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
      <head>
      
      <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />
    
      
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;900&display=swap"
          rel="stylesheet"
          />
    </head>
      
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><QueryProvider>
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}
