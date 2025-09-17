"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

function ImagesPreview({
  allImages,
  title,
}: {
  allImages: string[];
  title: string;
}) {
  const [selectedImage, setSelectedImage] = useState<number>(0);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Image Display */}
      <div className="aspect-square relative rounded-lg overflow-hidden border bg-muted">
        <Image
          src={allImages[selectedImage]}
          alt={`${title} - Main view`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 60vw, (max-width: 1280px) 50vw, 40vw"
          className="object-cover object-center transition-all duration-300"
          priority={selectedImage === 0} // Prioritize the first/selected image
          quality={90}
        />

        {/* Image Counter Overlay */}
        {allImages.length > 1 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {selectedImage + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 sm:gap-3 min-w-full">
            {allImages.map((image, index) => (
              <Button
                variant="outline"
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 relative rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105
                  w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-0 ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/20 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                aria-label={`View image ${index + 1} of ${title}`}
              >
                <Image
                  src={image}
                  fill
                  alt={`${title} - Thumbnail ${index + 1}`}
                  sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                  className="object-cover object-center transition-all duration-200"
                  quality={75}
                />

                {/* Selection Indicator */}
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full shadow-lg"></div>
                  </div>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Swipe Indicator */}
      {allImages.length > 1 && (
        <div className="flex justify-center gap-1 sm:hidden">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                selectedImage === index
                  ? "bg-primary scale-110"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImagesPreview;
