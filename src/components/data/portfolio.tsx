// src/components/data/portfolio.ts
"use client";

export interface PortfolioItem {
  src: string;
  alt: string;
  category: "interior" | "exterior";
}

export const portfolioItems: PortfolioItem[] = [
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern kitchen interior",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Luxury exterior",
    category: "exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&h=600",
    alt: "Master bedroom interior",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&h=600",
    alt: "Modern bathroom interior",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=800&h=600",
    alt: "Home office interior",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=800&h=600",
    alt: "Dining room interior",
    category: "interior",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&h=600",
    alt: "Contemporary home exterior",
    category: "exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&h=600",
    alt: "Modern two-story home",
    category: "exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&h=600",
    alt: "Luxury home with pool",
    category: "exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&h=600",
    alt: "Suburban home exterior",
    category: "exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=800&h=600",
    alt: "Craftsman style home",
    category: "exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&h=600",
    alt: "Commercial real estate",
    category: "exterior",
  },
];
