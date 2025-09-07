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
    <>
      <div className="space-y-4">
        <div className="aspect-square text-center relative rounded-lg overflow-hidden border">
          <Image
            src={allImages[selectedImage]}
            alt={title}
            fill
            priority
            className="w-full  object-cover"
          />
        </div>
        <div className="flex gap-2">
          {allImages.map((image, index) => (
            <Button
              variant="outline"
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 relative  rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? "border-primary" : "border-border"
              }`}
            >
              <Image
                src={image}
                fill
                alt={`${title} ${index + 1}`}
                className="   object-cover"
              />
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImagesPreview;
