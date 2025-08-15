"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PortfolioItem } from "./data/portfolio";

interface LightboxProps {
  images: PortfolioItem[];
  startIndex: number;
  onClose: () => void;
}

export default function LightboxModal({ images, startIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(startIndex);

  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <AnimatePresence>
      {images[currentIndex] && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute top-4 right-4 z-50">
            <button onClick={onClose} className="text-white text-3xl sm:text-4xl">
              <X />
            </button>
          </div>

          <div className="flex w-full max-w-[90%] max-h-[90vh] items-center justify-between">
            {/* Prev */}
            <button
              onClick={prevImage}
              className="text-white text-4xl sm:text-5xl px-2 hover:scale-110 transition-transform"
            >
              <ChevronLeft />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center overflow-auto">
              <motion.img
                key={images[currentIndex].src}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-[90vh] object-contain"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              />
            </div>

            {/* Next */}
            <button
              onClick={nextImage}
              className="text-white text-4xl sm:text-5xl px-2 hover:scale-110 transition-transform"
            >
              <ChevronRight />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
