import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interface/products.type";
import { Eye, ShoppingCart, Star } from "lucide-react";
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
    ratingsQuantity,
  } = product;

  return (
    <Link href={`/products/${id}`}>
      <Card className="product-card border-0 py-0 shadow-md bg-card/80 backdrop-blur-sm group">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative p-3 h-56 overflow-hidden rounded-t-lg">
            <Image
              src={imageCover}
              alt={title}
              fill
              className="product-image w-full  object-cover"
            />

            {/* Quick Actions */}
            <div
              className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 o group-hover:translate-x-0
                  group-hover:opacity-100 opacity-0 translate-x-4"
              }`}
            >
          
                <Favorite isHome={true} />
              

              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full glass hover:scale-110 transition-transform"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Add to Cart Button - Shows on Hover */}
            <div
              className="absolute bottom-3 left-3 right-3 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
              "
            >
              <div className="w-full">
                <AddToCart />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {name}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">
                  {ratingsAverage} ({ratingsQuantity})
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-sm mb-3 line-clamp-2 hover:text-primary transition-colors">
              {title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-primary">${price}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
