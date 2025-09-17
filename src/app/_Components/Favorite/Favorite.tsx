"use client";
import { addToFavorite, removeFromFavorite } from "@/API/WishList/WishList";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import showMessage from "../Toast/Toast";

function Favorite({ isHome, productId, isInWishList }: { isHome: boolean; productId: string; isInWishList: boolean }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isInWishList);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync with prop changes
  useEffect(() => {
    setIsFavorite(isInWishList);
  }, [isInWishList]);

  async function toggleFavorite() {
    if (isLoading) return;

    setIsLoading(true);
    const previousState = isFavorite;

    // Optimistic update
    setIsFavorite(!isFavorite);

    try {
      if (isFavorite) {
        const data = await removeFromFavorite(productId);
        if (data?.status !== "success") throw new Error("Remove failed");
        showMessage("Product removed from favorites", true);
      } else {
        const data = await addToFavorite(productId);
        if (data?.status !== "success") throw new Error("Add failed");
        showMessage("Product added to favorites", true);
      }
    } catch (error) {
      // Revert on failure
      setIsFavorite(previousState);
      showMessage(
        `Failed to ${isFavorite ? "remove from" : "add to"} favorites`, false
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="secondary"
      size={isHome ? "icon" : "lg"}
      disabled={isLoading}
      onClick={toggleFavorite}
      className="cursor-pointer h-9 w-9 bg-background shadow-sm rounded-full hover:scale-110 transition-transform"
    >
      <Heart
        className={`h-5 w-5 text-accent  ${
          isFavorite ? "fill-destructive text-destructive" : ""
        }`}
      />
    </Button>
  );
}

export default Favorite;
