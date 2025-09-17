"use client";
import { AddToCartAPI } from "@/API/CartActions/CartActions";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useCallback, useContext, useState } from "react";
import { countContext } from "@/CountProvider/CountProvider";
import showMessage from "../Toast/Toast";

function AddToCart({ id }: { id: string }) {
  const contextValue = useContext(countContext);
  const updateCount = contextValue?.updateCount;

  const [loading, setLoading] = useState(false);
  const addProduct = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await AddToCartAPI(id);
      if (data?.status !== "success")
        showMessage("Failed to add product", false);
      const message = data?.message || "Product added to cart";
      showMessage(message, true);
      setLoading(false);
      if (updateCount) {
        updateCount(data);
      }
    } catch (error) {
      showMessage("You must Login first", false);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex-1">
      <Button
        onClick={() => addProduct(id)}
        size="lg"
        className="w-full gradient-primary hover:scale-[1.02] cursor-pointer transition-all duration-200"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <ShoppingCart className="mr-2 h-5 w-5" />
        )}
        Add to Cart
      </Button>
    </div>
  );
}

export default AddToCart;
