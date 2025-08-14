"use client";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 64;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="py-12 sm:py-16 lg:py-20 text-center bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden"
    >
      {/* Floating background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200/20 rounded-full animate-floatSlow z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200/20 rounded-full animate-float z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-textGradient leading-tight">
                Real Estate Photography
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-600 font-light">
                Serving Seattle, WA and surrounding areas
              </p>
            </div>

            <p className="text-lg text-neutral-600 leading-relaxed max-w-md">
              Professional real estate photography that showcases properties in
              their best light. Capturing the essence and beauty of every home
              with expert composition and editing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => scrollToSection("portfolio")}
                className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-medium rounded-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                data-testid="button-view-portfolio"
              >
                View Portfolio
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-medium rounded-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
              className="rounded-lg shadow-2xl w-full h-auto transform transition-transform duration-500 hover:scale-105"
              data-testid="img-hero"
            />
            {/* Sparkle overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
              <div className="w-1 h-1 bg-white rounded-full opacity-70 animate-sparkle absolute top-1/4 left-1/4"></div>
              <div className="w-1 h-1 bg-white rounded-full opacity-50 animate-sparkle delay-1000 absolute top-1/3 left-2/3"></div>
              <div className="w-1 h-1 bg-white rounded-full opacity-60 animate-sparkle delay-2000 absolute top-2/3 left-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes floatSlow {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
 
        @keyframes textGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-textGradient {
          background-size: 200% 200%;
          animation: textGradient 6s ease infinite;
        }

        @keyframes sparkle {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translate(10px, -10px) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translate(20px, -20px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-sparkle {
          animation: sparkle 3s linear infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
