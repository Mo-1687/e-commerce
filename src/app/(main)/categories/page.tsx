import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategory } from "@/API/Category/Category";
import { Category } from "@/interface/Category/Category.type";
import Image from "next/image";

const Categories = async () => {
  const categories: Category[] = await getCategory(40);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Page Header - Responsive */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Shop by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Categories
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4">
            Explore our wide range of product categories and find exactly what
            you&apos;re looking for
          </p>
        </div>

        {/* View Mode Toggle - Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-3">
          <div>
            <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1">
              {categories.length} categories available
            </Badge>
          </div>
          <div className="flex border rounded-lg p-1 w-fit"></div>
        </div>

        {/* Categories Grid - Enhanced Responsive Grid */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {categories.map((category) => (
            <Card
              key={category._id}
              className="hover-lift p-0 overflow-hidden border-0 bg-card/80 backdrop-blur-sm 
                       cursor-pointer group shadow-lg hover:shadow-xl transition-all duration-300 
                       h-full flex flex-col"
            >
              <CardContent className="p-0 flex flex-col h-full">
                {/* Image Container - Responsive Aspect Ratio */}
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square overflow-hidden flex-shrink-0">
                  <Image
                    src={category.image}
                    alt={`${category.name} category`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    quality={85}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Category Name Overlay - Mobile Only */}
                  <div className="absolute inset-0 flex items-end sm:hidden">
                    <div className="w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="font-semibold text-white text-lg leading-tight">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content - Responsive Padding */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  {/* Category Name - Hidden on Mobile (shown in overlay) */}
                  <h3
                    className="hidden sm:block font-semibold text-lg sm:text-xl mb-2 sm:mb-3 
                               group-hover:text-primary transition-colors duration-200 
                               line-clamp-2 leading-tight"
                  >
                    {category.name}
                  </h3>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-grow"></div>

                  {/* Browse Button - Responsive */}
                  <Button
                    size="sm"
                    className="w-full mt-3 sm:mt-4 gradient-primary 
                             group-hover:scale-105 transition-transform duration-200 
                             text-sm sm:text-base py-2 sm:py-3"
                  >
                    <span className="truncate">Browse {category.name}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Categories Section - Enhanced Responsive */}
        <section className="mt-12 sm:mt-16 lg:mt-20 py-8 sm:py-12 lg:py-16 bg-muted/30 rounded-2xl sm:rounded-3xl">
          <div className="text-center mb-6 sm:mb-8 px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
              Trending{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Categories
              </span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Most popular categories this month
            </p>
          </div>

          {/* Trending Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 px-4 sm:px-8">
            {categories.slice(0, 4).map((category, index) => (
              <Card
                key={category._id}
                className="text-center hover-lift border-0 bg-card/50 backdrop-blur-sm 
                         cursor-pointer group transition-all duration-300 hover:bg-card/70"
              >
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  {/* Icon Circle - Responsive */}
                  <div
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 
                                rounded-full bg-gradient-to-br from-primary to-accent 
                                flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg"
                  >
                    <span className="text-lg sm:text-2xl lg:text-3xl text-primary-foreground font-bold">
                      {category.name[0]}
                    </span>
                  </div>

                  {/* Category Name - Responsive */}
                  <h3
                    className="font-medium text-xs sm:text-sm lg:text-base mb-1 
                               group-hover:text-primary transition-colors line-clamp-2 leading-tight"
                  >
                    {category.name}
                  </h3>

                  {/* Trending Indicator */}
                  {index < 2 && (
                    <Badge
                      variant="outline"
                      className="text-[10px] sm:text-xs mt-1 border-primary/20"
                    >
                      Hot
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* No Results - Enhanced Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <span className="text-2xl sm:text-3xl">📦</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                No categories found
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Check back later for more categories.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
