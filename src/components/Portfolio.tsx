"use client";

import { useState } from "react";
import { portfolioItems } from "@/components/data/portfolio";
import LightboxModal from "@/components/LightboxModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "interior" | "exterior">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  // Randomized delay + horizontal offset for shuffle effect
  const getRandomDelay = (index: number) => 0.05 + Math.random() * 0.1 + index * 0.03;
  const getRandomX = () => (Math.random() - 0.5) * 20; // random x between -10 and 10

  const itemVariants = {
    hidden: { opacity: 0, y: 20, x: getRandomX() },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
      transition: { delay: getRandomDelay(index), duration: 0.35 },
    }),
    exit: (index: number) => ({
      opacity: 0,
      y: -20,
      x: getRandomX(),
      transition: { delay: getRandomDelay(index), duration: 0.25 },
    }),
  };

  return (
    <section className="py-12 px-4">
      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8">
        {["all", "interior", "exterior"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as any)}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid with AnimatePresence & staggered enter/exit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" key={selectedCategory}>
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.src}
              className="relative cursor-pointer group"
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg h-64 sm:h-72 lg:h-80">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 text-sm rounded">
                {item.category}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <LightboxModal
          images={filteredItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
