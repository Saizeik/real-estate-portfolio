"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useContactForm } from "@/context/ContactFormContext";

export default function PricingPackages() {
  const { setSelectedPackage } = useContactForm();

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      const offsetTop = element.offsetTop - 64;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const handleChoosePackage = (pkg: string) => {
    setSelectedPackage(pkg);
    scrollToContact();
  };

  return (
    <section id="services" className="relative py-16 sm:py-20 bg-neutral-50 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-200 rounded-full opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-bebas text-3xl sm:text-4xl font-semibold text-neutral-800 mb-4">
            Pricing & Packages
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
            Professional photography packages designed to meet your real estate needs
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Standard Package */}
          <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center flex flex-col">
              <h3 className="font-serif text-2xl sm:text-2xl font-semibold text-neutral-800 mb-2">
                Standard
              </h3>
              <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">$125</div>
              <ul className="space-y-2 mb-6 text-neutral-600 text-left">
                {[
                  "Interior and Exterior Photos",
                  "Up to 20 Professionally edited Photos",
                  "$5 for each additional photo",
                  "Floor Plan included",
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="text-green-500 mr-2 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleChoosePackage("standard")}
                className="mt-auto w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Choose Standard
              </Button>
            </CardContent>
          </Card>

          {/* Video Package */}
          <Card className="relative bg-white rounded-2xl shadow-xl border-2 border-indigo-500 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-indigo-500 text-white px-3 sm:px-4 py-1 rounded-full text-sm sm:text-base font-medium shadow-md">
                Most Popular
              </span>
            </div>
            <CardContent className="p-6 sm:p-8 text-center flex flex-col">
              <h3 className="font-serif text-2xl sm:text-2xl font-semibold text-neutral-800 mb-2">
                Video
              </h3>
              <div className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-2">$175</div>
              <ul className="space-y-2 mb-6 text-neutral-600 text-left">
                {[
                  "All that comes with Standard Package",
                  "1-2 Minute cinematic Walk-through",
                  "Options include realtor led walk-through, Aerial captures, Instagram/Facebook Reels, and TikToks",
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="text-green-500 mr-2 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleChoosePackage("video")}
                className="mt-auto w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Choose Video
              </Button>
            </CardContent>
          </Card>

          {/* A la carte Package */}
          <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center flex flex-col">
              <h3 className="font-serif text-2xl sm:text-2xl font-semibold text-neutral-800 mb-2">
                A la carte
              </h3>
              <div className="text-lg sm:text-xl font-medium text-neutral-600 mb-2">Contact me</div>
              <ul className="space-y-2 mb-6 text-neutral-600 text-left">
                {[
                  "$15 per Professionally edited photo (min 5)",
                  "Cinematic walk-through $50",
                  "Floor Plan $40",
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="text-green-500 mr-2 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleChoosePackage("alacarte")}
                variant="outline"
                className="mt-auto w-full bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-neutral-800 font-bold rounded-lg shadow-sm transition-all duration-300"
              >
                Contact for Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tailwind keyframes for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-10px) scale(1.05); }
          66% { transform: translate(-20px,10px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
}
