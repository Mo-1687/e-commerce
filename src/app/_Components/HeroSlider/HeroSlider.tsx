"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroSlide1 from "@/assets/julian-o-hayon-Bs-zngH79Ds-unsplash.jpg";
import heroSlide2 from "@/assets/kate-laine-luyfrZAXsbs-unsplash.jpg";
import heroSlide3 from "@/assets/spacejoy-YI2YkyaREHk-unsplash.jpg";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: heroSlide1,
    title: "Premium Electronics Collection",
    subtitle: "Discover the latest in tech innovation",
    description:
      "From cutting-edge headphones to smart devices, elevate your digital lifestyle with our curated selection.",
    cta: "Shop Electronics",
    price: "Starting at 2299 EGP",
  },
  {
    id: 2,
    image: heroSlide2,
    title: "Fashion Forward Style",
    subtitle: "Express your unique personality",
    description:
      "Trendsetting apparel and accessories that make a statement. Find your perfect style today.",
    cta: "Shop Fashion",
    price: "New arrivals from 559 EGP",
  },
  {
    id: 3,
    image: heroSlide3,
    title: "Home & Living Essentials",
    subtitle: "Transform your space",
    description:
      "Beautiful home decor and furniture to create the perfect ambiance for your living space.",
    cta: "Shop Home",
    price: "Up to 50% off",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[70vh] min-h-[400px] max-h-[800px] overflow-hidden rounded-3xl mx-4 lg:mx-8">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                className="object-cover object-center"
                priority={index === 0} // Prioritize loading the first slide
                quality={85}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent sm:from-black/60 sm:via-black/30" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                  <div className="max-w-xl sm:max-w-2xl text-white">
                    <p className="text-xs sm:text-sm font-medium text-white/80 mb-2 animate-slideIn">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 animate-fadeInUp leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 max-w-lg animate-fadeInUp delay-200 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 animate-fadeInUp delay-300">
                      <Button
                        size="default"
                        className="gradient-primary hover:scale-105 transition-transform text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        {slide.cta}
                      </Button>
                      <span className="text-base sm:text-lg font-semibold text-accent-light">
                        {slide.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
