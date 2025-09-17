
import getUserToken from "@/UserToken/getUserToken";
import getProducts from "@/API/getProducts/productsApi";
import { Product } from "@/interface/products.type";
import { getUserWishList } from "@/API/WishList/WishList";
import ProductCard from "@/app/_Components/ProductCard/ProductCard";

// Mock products data

const Products = async () => {
  async function checkToken() {
    const userData = await getUserToken();
    const token = userData?.tokenApi;
    const products: Product[] = await getProducts(50);
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

  const products = await checkToken();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            All{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover our complete collection of premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
