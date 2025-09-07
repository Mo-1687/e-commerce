"use client";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React, { useState } from "react";

function Favorite({ isHome }: { isHome: boolean }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  function toggleFavorite() {
    setIsFavorite((prev) => !prev);
  }
  return (
    <div>
      <Button
        variant="ghost"
        size={isHome ? "icon" : "lg"}
        className={`glass ${isHome ? "rounded-full h-8 w-8" : ""}`}
        onClick={toggleFavorite}
      >
        <Heart
          className={`  hover:text-destructive hover:fill-destructive  ${
            isFavorite ? "fill-destructive text-destructive" : ""
          }`}
        />
      </Button>
    </div>
  );
}

export default Favorite;
