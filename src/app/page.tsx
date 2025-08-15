import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PortfolioGallery from "@/components/Portfolio";
import PricingPackages from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { ContactFormProvider } from "@/context/ContactFormContext";




export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Portfolio Section */}
      <PortfolioGallery />

      {/* Services / Pricing Section */}
      <ContactFormProvider>
        <PricingPackages />
        <Contact />
      </ContactFormProvider>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal outside main flow */}
     
    </div>
  );
}
