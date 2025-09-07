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
    price: "Starting at $99",
  },
  {
    id: 2,
    image: heroSlide2,
    title: "Fashion Forward Style",
    subtitle: "Express your unique personality",
    description:
      "Trendsetting apparel and accessories that make a statement. Find your perfect style today.",
    cta: "Shop Fashion",
    price: "New arrivals from $29",
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
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden rounded-3xl mx-4 lg:mx-8">
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
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                  <div className="max-w-2xl text-white">
                    <p className="text-sm font-medium text-white/80 mb-2 animate-slideIn">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 animate-fadeInUp">
                      {slide.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-xl animate-fadeInUp delay-200">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fadeInUp delay-300">
                      <Button
                        size="lg"
                        className="gradient-primary hover:scale-105 transition-transform"
                      >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        {slide.cta}
                      </Button>
                      <span className="text-lg font-semibold text-accent-light">
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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
