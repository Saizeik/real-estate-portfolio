"use client";
import { Button } from "@/components/ui/button";


export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 64;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className=" font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-800 leading-tight">
                Real Estate Photography
              </h1>
              <p className="text-xl text-neutral-600 font-light">
                serving Seattle, WA and surrounding areas
              </p>
            </div>
            
            <p className="text-lg text-neutral-600 leading-relaxed max-w-md">
              Professional real estate photography that showcases properties in their best light. 
              Capturing the essence and beauty of every home with expert composition and editing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="inline-flex items-center justify-center px-8 py-3 bg-neutral-800 text-white font-medium rounded-sm hover:bg-neutral-700 transition-colors"
                data-testid="button-view-portfolio"
              >
                View Portfolio
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center px-8 py-3 bg-neutral-800 text-white font-medium rounded-sm  hover:bg-neutral-700  transition-colors"
                data-testid="button-get-quote"
              >
                Get Quote
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional real estate photographer at work" 
              className="rounded-lg shadow-2xl w-full h-auto"
              data-testid="img-hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
