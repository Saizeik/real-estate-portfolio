"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const sections = ["home", "portfolio", "services", "contact"];

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 64; // Adjust for fixed header
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false); // Close mobile menu
    }
  };

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 80;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sec);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md rounded-b-xl z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <div
              className="text-2xl sm:text-3xl font-serif font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              Stephanie Kaye Photography
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className={`relative text-neutral-600 hover:text-neutral-800 transition-colors after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all hover:after:w-full ${
                    activeSection === sec
                      ? "font-semibold text-neutral-800 after:w-full"
                      : ""
                  }`}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 bg-purple-500 text-white rounded-full shadow-lg transform transition-transform duration-200 hover:scale-110 hover:bg-purple-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden fixed top-16 left-0 right-0 w-full bg-white border-t border-neutral-100 shadow-lg z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-4 space-y-2">
                {sections.map((sec) => (
                  <button
                    key={sec}
                    onClick={() => scrollToSection(sec)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeSection === sec
                        ? "bg-purple-50 text-purple-700 font-semibold"
                        : "text-neutral-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
