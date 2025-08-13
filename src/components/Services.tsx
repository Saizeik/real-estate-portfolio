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
    <section id="pricing" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-3xl md:text-4xl font-semibold text-neutral-800 mb-4">
            Pricing & Packages
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Professional photography packages designed to meet your real estate needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Standard Package */}
          <Card className="bg-white rounded-lg shadow-lg border border-neutral-200">
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold text-neutral-800 mb-2">
                Standard
              </h3>
              <div className="text-4xl font-bold text-neutral-800 mb-2">$125</div>
              <ul className="space-y-3 mb-8 text-neutral-600 text-left">
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Interior and Exterior Photos</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Up to 20 Professionally edited Photos</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />$5 for each additional photo</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />Floor Plan included</li>
              </ul>
              <Button onClick={() => handleChoosePackage("standard")} className="w-full bg-neutral-800 text-white">
                Choose Standard
              </Button>
            </CardContent>
          </Card>

          {/* Video Package */}
          <Card className="bg-white rounded-lg shadow-xl border-2 border-neutral-800 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-neutral-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <CardContent className="p-8 text-center">
              <h3 className="font-serif text-2xl font-semibold text-neutral-800 mb-2">
                Video
              </h3>
              <div className="text-4xl font-bold text-neutral-800 mb-2">$175</div>
              <ul className="space-y-3 mb-8 text-neutral-600 text-left">
                <li className="flex items-center"><Check className="text-green-500 mr-2" />All that comes with Standard Package</li>
                <li className="flex items-center"><Check className="text-green-500 mr-2" />1-2 Minute Cinematic Walk Through</li>
                <li className="flex items-start"><Check className="text-green-500 mr-2 mt-1" />Options include Realtor Led Walk-through, Aerial captures, Instagram/Facebook Reels, and TikToks</li>
              </ul>
              <Button onClick={() => handleChoosePackage("video")} className="w-full bg-neutral-800 text-white">
                Choose Video
              </Button>
            </CardContent>
          </Card>

          {/* A la carte Package */}
          <Card className="bg-white rounded-lg shadow-lg border border-neutral-200">
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
              <Button onClick={() => handleChoosePackage("alacarte")} variant="outline" className="w-full bg-neutral-100 text-neutral-800">
                Contact for Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}