"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioItem {
  id: string;
  src: string;
  alt: string;
  category: "interior" | "exterior";
}

const portfolioItems: PortfolioItem[] = [
  { id: "1", src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Modern kitchen interior", category: "interior" },
  { id: "2", src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Luxury living room interior", category: "interior" },
  { id: "3", src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Master bedroom interior", category: "interior" },
  { id: "4", src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Modern bathroom interior", category: "interior" },
  { id: "5", src: "https://images.unsplash.com/photo-1541558869434-2840d308329a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Home office interior", category: "interior" },
  { id: "6", src: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Dining room interior", category: "interior" },
  { id: "7", src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Contemporary home exterior", category: "exterior" },
  { id: "8", src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Modern two-story home", category: "exterior" },
  { id: "9", src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Luxury home with pool", category: "exterior" },
  { id: "10", src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Suburban home exterior", category: "exterior" },
  { id: "11", src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Craftsman style home", category: "exterior" },
  { id: "12", src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600", alt: "Commercial real estate", category: "exterior" },
];

const FILTERS = ["all", "interior", "exterior"] as const;
type Filter = (typeof FILTERS)[number];

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null);
  const [visibleItems, setVisibleItems] = useState<PortfolioItem[]>([]);

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  // Staggered animation for smooth appearance
  useEffect(() => {
    setVisibleItems([]);
    const timer = setTimeout(() => setVisibleItems(filteredItems), 50);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const openLightbox = (item: PortfolioItem) => {
    setLightboxImage(item);
    if (window.innerWidth < 1024) {
      document.body.style.overflow = "hidden"; // lock scroll only on mobile
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-neutral-800 mb-4">
            Portfolio
          </h2>
          <p className="text-lg text-neutral-600 font-semibold max-w-2xl mx-auto">
            Explore work showcasing beautiful homes and properties across the Seattle area
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          {FILTERS.map((filter) => (
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

        {/* Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="relative cursor-pointer overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => openLightbox(item)}
            >
              <motion.img
                src={item.src}
                alt={item.alt}
                className="w-full h-64 object-cover rounded-lg shadow-md transition-shadow duration-500"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              />
              <motion.span
                className="absolute bottom-2 left-2 bg-white/70 backdrop-blur-sm text-black text-sm px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity"
                whileHover={{ y: -2 }}
              >
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative w-full max-w-[90%] max-h-[90%] rounded-lg overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-2 right-2 text-white text-2xl sm:text-3xl md:text-4xl font-bold hover:text-gray-300 z-50"
              >
                ✕
              </button>
              <div className="w-full h-full flex flex-col items-center justify-center overflow-auto max-h-screen">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
                <div className="mt-2 bg-black bg-opacity-50 text-white text-center px-2 py-1 rounded-b-lg text-sm sm:text-base">
                  {lightboxImage.alt}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>{/* Lightbox */}
<AnimatePresence>
  {lightboxImage && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={closeLightbox}
    >
      <motion.div
        className="relative w-full max-w-[90%] max-h-[90vh] rounded-lg overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-2 right-2 text-white text-2xl sm:text-3xl md:text-4xl font-bold hover:text-gray-300 z-50"
        >
          ✕
        </button>

        {/* Image */}
        <Image
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          width={1200}
          height={800}
          className="w-full h-auto object-contain rounded-lg shadow-lg"
        />

        {/* Caption */}
        <div className="mt-2 bg-black bg-opacity-50 text-white text-center px-2 py-1 rounded-b-lg text-sm sm:text-base">
          {lightboxImage.alt}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
