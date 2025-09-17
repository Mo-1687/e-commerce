import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllBrands } from "@/API/Brands/Brands";
import { Brand } from "@/interface/productDetails.type";
import Image from "next/image";

const Brands = async () => {
  const brands: Brand[] = await getAllBrands(55);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Page Header - Responsive */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Brands
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4">
            Discover products from the world&apos;s most trusted and innovative
            brands
          </p>
        </div>

        {/* Featured Brands Section */}
        <section className="mb-12 sm:mb-14 lg:mb-16">
          {/* Section Header - Responsive */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
              Featured Brands
            </h2>
            <Badge
              variant="secondary"
              className="text-xs sm:text-sm px-3 py-1 w-fit"
            >
              {brands.length} featured brands
            </Badge>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {brands.map((brand) => (
              <Card
                key={brand._id}
                className="hover-lift p-0 border-0 bg-gradient-to-br from-card to-muted/50 
                         backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 
                         group cursor-pointer h-full flex flex-col"
              >
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Image Container - Responsive Height */}
                  <div className="relative h-40 sm:h-48 lg:h-52 xl:h-56 mb-3 sm:mb-4 flex-shrink-0">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} brand logo`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      className="object-cover object-center rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                      quality={85}
                      loading="lazy"
                    />

                    {/* Verified Badge - Responsive */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-primary-foreground text-[10px] sm:text-xs font-bold">
                          ✓
                        </span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-t-2xl"></div>
                  </div>

                  {/* Brand Info - Responsive Padding */}
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col flex-grow">
                    {/* Brand Name - Responsive Typography */}
                    <h3
                      className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 
                                 group-hover:text-primary transition-colors duration-200 
                                 line-clamp-2 leading-tight"
                    >
                      {brand.name}
                    </h3>

                    {/* Spacer to push rating to bottom */}
                    <div className="flex-grow"></div>

                    {/* Star Rating - Responsive */}
                    <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 
                                   fill-yellow-400 text-yellow-400 
                                   transition-transform duration-200 hover:scale-110"
                        />
                      ))}
                      <span className="text-xs sm:text-sm text-muted-foreground ml-2 font-medium">
                        5.0
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* No Results - Responsive */}
        {brands.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl mb-2">
                No brands found
              </p>
              <p className="text-muted-foreground/70 text-sm sm:text-base">
                Check back later for more brands.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brands;
