import Image from "next/image";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import LightboxModal from "@/components/lightbox-modal";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ContactFormProvider } from "@/context/ContactFormContext";
import type { Metadata } from "next"; // <--- import this


export const metadata: Metadata = {
  title: "Stepanie Kaye | Real Estate Photography",
  description: "High-quality real estate photography services",
};


export default function Home() {
  return (
    <div className=" w-full mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <Navigation />
      <Hero />
     <Portfolio />
      <ContactFormProvider>
      <Services />
      <Contact />
      </ContactFormProvider>
      <Footer />
      <LightboxModal />
    </div>
  );
}
