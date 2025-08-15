"use client";

import React, { useState, useEffect } from "react";
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

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  // Touch swipe handlers
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextImage(); // swipe left
    if (touchEndX > touchStartX + 50) prevImage(); // swipe right
  };

  return (
    <AnimatePresence>
      {images[currentIndex] && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <div className="absolute top-4 right-4 z-50">
            <button onClick={onClose} className="text-white text-3xl sm:text-4xl">
              <X />
            </button>
          </div>

          {/* Navigation and image */}
          <div className="flex w-full max-w-[90%] max-h-[90vh] items-center justify-between">
            {/* Prev */}
            <button
              onClick={prevImage}
              className="text-white text-4xl sm:text-5xl px-2 hover:scale-110 transition-transform"
            >
              <ChevronLeft />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <motion.img
                key={images[currentIndex].src}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
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
