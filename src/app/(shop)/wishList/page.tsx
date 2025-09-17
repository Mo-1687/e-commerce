"use client";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserWishList } from "@/API/WishList/WishList";
import { Product } from "@/interface/wishList/wishList.type";
import FavoriteCard from "@/app/_Components/FavoriteCard/FavoriteCard";
import { useCallback, useEffect, useState } from "react";
import showMessage from "@/app/_Components/Toast/Toast";
import Link from "next/link";

const Favorites = () => {
  const [loading, setLoading] = useState(true);
  const [wishList, setWishList] = useState<Product[]>([]);

  const getWishList = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserWishList();
      setWishList(data);
    } catch (error) {
      showMessage("Failed to load wish list", false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getWishList();
  }, [getWishList]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/98 to-background/95">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              My Favorites
            </h1>
          </div>
        </div>

        {wishList.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-24 w-24 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start browsing and save items you love!
            </p>
            <Link href="/products">
              <Button className="gradient-primary cursor-pointer text-primary-foreground rounded-xl">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishList.map((item) => (
              <FavoriteCard
                key={item.id}
                product={item}
                setIsFavorite={setWishList}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
