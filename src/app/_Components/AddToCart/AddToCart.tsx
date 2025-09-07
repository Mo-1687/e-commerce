import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

function AddToCart() {
  return (
    <div className="flex-1">
      <Button size="lg" className="w-full gradient-primary hover:scale-[1.02] cursor-pointer transition-all duration-200">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  );
}

export default AddToCart;
