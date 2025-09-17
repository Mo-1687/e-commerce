import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interface/products.type";
import { Eye, Star } from "lucide-react";
import Favorite from "../Favorite/Favorite";
import AddToCart from "../AddToCart/AddToCart";

export default function ProductCard({ product }: { product: Product }) {
  const {
    imageCover,
    title,
    price,
    category: { name },
    ratingsAverage,
    id,
    isInWishList,
    ratingsQuantity,
  } = product;

  return (
    <Card className="product-card border-0 py-0 shadow-md bg-card/80 backdrop-blur-sm group h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
      <CardContent className="!p-0 flex flex-col h-full">
        {/* Image Container - Responsive Aspect Ratio */}
        <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden rounded-t-lg p-0 flex-shrink-0">
          <Image
            src={imageCover}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            className="product-image w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Quick Actions - Responsive Positioning */}
          <div
            className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 transition-all duration-300 
                         opacity-100 sm:opacity-0 sm:translate-x-4 
                         sm:group-hover:translate-x-0 sm:group-hover:opacity-100"
          >
            <div className="transform transition-transform hover:scale-110">
              <Favorite
                isHome={true}
                productId={id}
                isInWishList={isInWishList}
              />
            </div>

            <Link href={`/products/${id}`}>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 sm:h-9 sm:w-9 shadow-sm cursor-pointer rounded-full 
                         bg-background hover:scale-110 transition-transform"
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </div>

          {/* Add to Cart Button - Responsive Behavior */}
          <div
            className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 
                         transition-all duration-300 
                         opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4 
                         sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
          >
            <div className="w-full">
              <AddToCart id={id} />
            </div>
          </div>
        </div>

        {/* Product Info - Responsive Padding */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          {/* Category and Rating - Responsive Heights */}
          <div className="flex items-center justify-between mb-1.5 sm:mb-2 min-h-[16px] sm:min-h-[20px]">
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate pr-2">
              {name}
            </span>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                {ratingsAverage} ({ratingsQuantity})
              </span>
            </div>
          </div>

          {/* Title - Responsive Typography */}
          <Link href={`/products/${id}`}>
            <h3
              className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3 
                          line-clamp-2 hover:text-primary transition-colors 
                          min-h-[32px] sm:min-h-[40px] flex items-start leading-tight"
            >
              {title}
            </h3>
          </Link>

          {/* Spacer to push price to bottom */}
          <div className="flex-grow"></div>

          {/* Price Section - Responsive Sizing */}
          <div className="flex items-center justify-between min-h-[24px] sm:min-h-[28px]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-lg text-primary">
                {price} EGP
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
