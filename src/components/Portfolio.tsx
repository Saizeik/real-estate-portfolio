"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { portfolioItems, PortfolioItem } from "@/components/data/portfolio";

const FILTERS = ["all", "interior", "exterior"] as const;
type Filter = (typeof FILTERS)[number];

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [visibleItems, setVisibleItems] = useState<PortfolioItem[]>(portfolioItems);
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null);

  // Filter items and animate transitions
  useEffect(() => {
    const filtered =
      activeFilter === "all"
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeFilter);

    setVisibleItems([]);
    const timer = setTimeout(() => setVisibleItems(filtered), 50);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const openLightbox = useCallback((item: PortfolioItem) => {
    setLightboxImage(item);
    if (window.innerWidth < 1024) document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    document.body.style.overflow = "auto";
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-neutral-800 mb-4">
            Portfolio
          </h2>
          <p className="text-lg text-neutral-600 font-semibold max-w-2xl mx-auto">
            Explore work showcasing beautiful homes and properties
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {FILTERS.map(filter => (
            <Button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-neutral-800 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        {/* Gallery with AnimatePresence */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleItems.map((item, idx) => (
              <motion.div
                key={`${item.id}-${idx}`}
                className="relative cursor-pointer overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => openLightbox(item)}
              >
                <div className="w-full aspect-[4/3] relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover rounded-lg shadow-md transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 bg-white/70 backdrop-blur-sm text-black text-sm px-2 py-1 rounded">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4 overflow-auto"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-[90%] max-h-[90%] rounded-lg overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-gray-300 z-50"
            >
              ✕
            </button>
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={1200}
              height={900}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
              priority
            />
            <div className="mt-2 bg-black bg-opacity-50 text-white text-center px-2 py-1 text-sm">
              {lightboxImage.alt}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
