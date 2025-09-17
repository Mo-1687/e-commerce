import getProducts from "@/API/getProducts/productsApi";
import { Product } from "@/interface/products.type";
import ProductCard from "./_Components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import HeroSlider from "./_Components/HeroSlider/HeroSlider";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Headphones, RotateCcw, Shield, Truck } from "lucide-react";
import Image from "next/image";
import { getUserWishList } from "@/API/WishList/WishList";
import getUserToken from "@/UserToken/getUserToken";
import { getCategory } from "@/API/Category/Category";
import { Category } from "@/interface/Category/Category.type";
import Link from "next/link";

export default async function Home() {
  async function checkLogin() {
    const userData = await getUserToken();
    const token = userData?.tokenApi;
    const products: Product[] = await getProducts(4);
    if (token) {
      const wishListData: Product[] = await getUserWishList();
      const wishListProducts = new Set(
        wishListData.map((product) => product.id)
      );

      const updatedProducts = products.map((product) => ({
        ...product,
        isInWishList: wishListProducts.has(product.id),
      }));
      return updatedProducts;
    } else return products;
  }

  const products = await checkLogin();

  const categories: Category[] = await getCategory(4);

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment methods",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer service",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-8">
        <HeroSlider />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center border-0 bg-card/50 backdrop-blur-sm hover-lift"
              >
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Shop by{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our wide range of products across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden p-0 hover-lift border-0 bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Featured{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Products
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Handpicked items just for you
              </p>
            </div>
            <Link href="/products">
              <Button  className="cursor-pointer">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
