"use client";
import { useEffect } from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";

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



export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.style.transitionProperty = "none";
    document.documentElement.style.marginRight = "0px";
  }, []);
  return (
    <html lang="en-US">
      <head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    
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
         <Toaster richColors position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
