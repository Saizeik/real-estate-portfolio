// src/components/ToasterWrapper.tsx
"use client"; // must be first line

import { Toaster } from "sonner";

export default function ToastWrapper() {
  return <Toaster richColors position="top-center" />;
}