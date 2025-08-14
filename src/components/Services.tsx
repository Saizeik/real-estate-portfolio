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
    <section id="pricing" className="relative py-20 bg-neutral-50 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-200 rounded-full opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="font-bebas text-3xl md:text-4xl font-semibold text-neutral-800 mb-4">
            Pricing & Packages
          </h2>
          <p className="text-lg text-neutral-600 font-semibold max-w-2xl mx-auto">
            Professional photography packages designed to meet your real estate needs
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          {/* Standard Package */}
          <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold text-neutral-800 mb-2">
                Standard
              </h3>
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">$125</div>
              <ul className="space-y-3 mb-8 text-neutral-600 text-left">
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Interior and Exterior Photos</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Up to 20 Professionally edited Photos</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />$5 for each additional photo</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Floor Plan included</li>
              </ul>
              <Button
                onClick={() => handleChoosePackage("standard")}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Choose Standard
              </Button>
            </CardContent>
          </Card>

          {/* Video Package */}
          <Card className="relative bg-white rounded-2xl shadow-xl border-2 border-indigo-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                Most Popular
              </span>
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold text-neutral-800 mb-2">
                Video
              </h3>
              <div className="text-5xl font-bold text-indigo-600 mb-2">$175</div>
              <ul className="space-y-3 mb-8 text-neutral-600 text-left">
                <li className="flex items-center"><Check className="text-green-500 mr-2" />All that comes with Standard Package</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />1-2 Minute Cinematic Walk Through</li>
                <li className="flex items-start"><Check className="text-green-500 mr-2 mt-1" />Options include Realtor Led Walk-through, Aerial captures, Instagram/Facebook Reels, and TikToks</li>
              </ul>
              <Button
                onClick={() => handleChoosePackage("video")}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg shadow-md transition-all duration-300"
              >
                Choose Video
              </Button>
            </CardContent>
          </Card>

          {/* A la carte Package */}
          <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold text-neutral-800 mb-2">
                A la carte
              </h3>
              <div className="text-xl font-medium text-neutral-600 mb-2">Contact me</div>
              <ul className="space-y-3 mb-8 text-neutral-600 text-left">
                <li className="flex items-center"><Check className="text-green-500 mr-2" />$15 per Professionally edited photo (min 5)</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Cinematic Walk Through $50</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Floor Plan $40</li>
              </ul>
              <Button
                onClick={() => handleChoosePackage("alacarte")}
                variant="outline"
                className="w-full bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-neutral-800 font-bold rounded-lg shadow-sm transition-all duration-300"
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
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -10px) scale(1.05); }
          66% { transform: translate(-20px, 10px) scale(0.95); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
