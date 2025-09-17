"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import { getUserWishList, removeFromFavorite } from "@/API/WishList/WishList";
import { Product } from "@/interface/wishList/wishList.type";
import { Badge } from "@/components/ui/badge";
import AddToCart from "../AddToCart/AddToCart";
import showMessage from "../Toast/Toast";

export default function FavoriteCard({
  product,
  setIsFavorite,
}: {
  product: Product;
  setIsFavorite: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const {
    imageCover,
    title,
    quantity,
    price,
    category: { name },
    ratingsAverage,
    id,
  } = product;

  const handleRemoveFromFavorites = async (id: string) => {
    try {
      const data = await removeFromFavorite(id);
      if (data?.status !== "success") throw new Error("Remove failed");
      showMessage("Product removed from favorites", true);
      getUserWishList().then((data) => {
        setIsFavorite(data);
      });
    } catch (error) {
      showMessage("Failed to remove from favorites", false);
    }
  };

  return (
    <Card className="group glass p-0 border-white/10 hover-lift transition-all duration-300 h-full flex flex-col hover:shadow-xl">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Image Section - Responsive Aspect Ratio */}
        <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square flex-shrink-0 overflow-hidden rounded-t-lg">
          <Image
            src={imageCover}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            quality={85}
            loading="lazy"
          />

          {/* Remove Button - Responsive Positioning */}
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-1 right-1 sm:top-2 sm:right-2 cursor-pointer rounded-full 
                     w-8 h-8 sm:w-9 sm:h-9 p-0 
                     opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                     transition-all duration-300 hover:scale-110"
            onClick={() => handleRemoveFromFavorites(id)}
            aria-label="Remove from favorites"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>

          {/* Stock Status Badge */}
          {quantity === 0 && (
            <Badge
              className="absolute top-1 left-1 sm:top-2 sm:left-2 
                           bg-destructive/90 text-destructive-foreground 
                           text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1"
            >
              Out of Stock
            </Badge>
          )}

          {/* Sale Badge */}
          {price && (
            <Badge
              variant="default"
              className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 
                       gradient-primary text-primary-foreground 
                       text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1"
            >
              Sale
            </Badge>
          )}
        </div>

        {/* Content Section - Responsive Padding */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          {/* Category Badge - Responsive Height */}
          <div className="mb-1.5 sm:mb-2 min-h-[20px] sm:min-h-[24px] flex items-start">
            <Badge className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1">
              {name}
            </Badge>
          </div>

          {/* Title - Responsive Typography */}
          <h3
            className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2 
                        line-clamp-2 group-hover:text-primary transition-colors 
                        min-h-[32px] sm:min-h-[40px] flex items-start leading-tight"
          >
            {title}
          </h3>

          {/* Rating - Responsive Sizing */}
          <div className="flex items-center gap-2 mb-2 sm:mb-3 min-h-[16px] sm:min-h-[20px]">
            <div className="flex items-center">
              <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current text-primary mr-1" />
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                {ratingsAverage}
              </span>
            </div>
          </div>

          {/* Spacer to push bottom content down */}
          <div className="flex-grow"></div>

          {/* Bottom Section - Responsive Spacing */}
          <div className="space-y-2 sm:space-y-3">
            {/* Price - Responsive Typography */}
            <div className="flex items-center gap-2 min-h-[20px] sm:min-h-[24px]">
              <span className="font-bold text-sm sm:text-base lg:text-lg text-primary">
                {price} EGP
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="w-full">
              <AddToCart id={id} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
