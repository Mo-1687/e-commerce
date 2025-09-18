import { Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Favorite from "@/app/_Components/Favorite/Favorite";
import AddToCart from "@/app/_Components/AddToCart/AddToCart";
import getProductDetails from "@/API/getProductDetails/ProductDetails";
import { ProductItem } from "@/interface/productDetails.type";
import ImagesPreview from "@/app/_Components/ImagesPreview/ImagesPreview";
import Link from "next/link";
import getUserToken from "@/UserToken/getUserToken";
import { getUserWishList } from "@/API/WishList/WishList";
import { Product } from "@/interface/wishList/wishList.type";

async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await getProductDetails(id);

  if(!data){
    return <div>Product not found</div>;
  }
  
  const product: ProductItem = data?.data;
  const userData = await getUserToken();
  let isInWishList = false;
  
  if (userData?.tokenApi) {
    const wishList: Product[] = await getUserWishList();
    const whishListProducts = new Set(wishList.map((product) => product.id));
    isInWishList = whishListProducts.has(product.id);
  }

  const {
    title,
    description,
    price,
    brand: { name: brandName },
    category: { name: categoryName },
    imageCover,
    images,
    sold,
    ratingsAverage,
    ratingsQuantity,
    quantity,
  } = product;

  // All images including cover
  const allImages = [imageCover, ...images];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Product Images with responsive wrapper */}
          <div className="w-full max-w-lg mx-auto">
            <ImagesPreview allImages={allImages} title={title} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{categoryName}</Badge>
                {sold > 1000 && (
                  <Badge className="bg-success text-success-foreground">
                    Popular
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-muted-foreground">by {brandName}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(ratingsAverage)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium">
                  {ratingsAverage}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({ratingsQuantity} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                {price} EGP
              </span>
              <Badge variant="secondary">{sold} sold</Badge>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  quantity > 0 ? "bg-success" : "bg-destructive"
                }`}
              />
              <span
                className={quantity > 0 ? "text-success" : "text-destructive"}
              >
                {quantity > 0
                  ? `In Stock (${quantity} available)`
                  : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>

            {/*  Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <AddToCart id={id} />
                <Favorite
                  isHome={false}
                  productId={id}
                  isInWishList={isInWishList}
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">2 Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">30-Day Returns</p>
                  <p className="text-xs text-muted-foreground">
                    Money back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Product Description
                  </h3>
                  <div className="prose text-muted-foreground ">
                    {description}
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Product Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Brand:</span> {brandName}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span>{" "}
                        {categoryName}
                      </div>
                      <div>
                        <span className="font-medium">Items Sold:</span> {sold}
                      </div>
                      <div>
                        <span className="font-medium">Available:</span>{" "}
                        {quantity}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Technical Specifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Price</span>
                      <span className="text-muted-foreground">
                        ${(price / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Rating</span>
                      <span className="text-muted-foreground">
                        {ratingsAverage}/5 ({ratingsQuantity} reviews)
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Availability</span>
                      <span className="text-muted-foreground">
                        {quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Customer Reviews
                  </h3>
                  <div className="space-y-6">
                    {/* Sample review */}
                    <div className="border-b pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">John D.</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        Amazing sound quality and the noise cancellation is
                        top-notch. Very comfortable for long listening sessions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
