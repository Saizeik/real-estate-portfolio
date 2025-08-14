"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 64; // Account for fixed header
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setActiveSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  // Highlight active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "portfolio", "pricing", "contact"];
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
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md rounded-b-xl z-50 transition-all duration-300 ease-in-out">
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
              {["home", "portfolio", "pricing", "contact"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className={`relative text-neutral-600 hover:text-neutral-800 transition-colors after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all hover:after:w-full ${
                    activeSection === sec ? "font-semibold text-neutral-800 after:w-full" : ""
                  }`}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden transform transition-transform duration-200 hover:scale-110"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-16 inset-x-0 bg-white border-t border-neutral-100 shadow-lg z-50 animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {["home", "portfolio", "pricing", "contact"].map((sec) => (
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
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes slideDown {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
