"use client";
import { useEffect, useState, useCallback, useContext } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  clearCartAPI,
  getCartData,
  removeItemAPI,
  updateQuantityAPI,
} from "@/API/CartActions/CartActions";
import { CartItem, CartData } from "@/interface/Cart/CartProducts.type";
import Image from "next/image";
import Link from "next/link";
import { countContext } from "@/CountProvider/CountProvider";
import showMessage from "@/app/_Components/Toast/Toast";

function Cart() {
  const [loading, setLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(false);
  const [operationLoading, setOperationLoading] = useState<{
    type: "quantity" | "remove" | "clear" | null;
    itemId?: string;
  }>({ type: null });
  const [cart, setCart] = useState<CartItem | null>(null);

  const countContextValue = useContext(countContext);
  if (!countContextValue) {
    throw new Error("CountContext must be used within a CountProvider");
  }
  const { updateCount } = countContextValue;

  // Fetch cart data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCartData();
      setCart(data?.data || null);
    } catch (error) {
      showMessage("Failed to load cart data", false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Remove item from cart
  const removeItem = useCallback(
    async (id: string) => {
      setOperationLoading({ type: "remove", itemId: id });
      setItemLoading(true);
      try {
        const data: CartData = await removeItemAPI(id);
        if (data?.status === "success") {
          showMessage("Item removed from cart", true);
          setCart(data?.data || null);
          updateCount(data);
        } else {
          showMessage("Failed to remove item from cart", false);
        }
      } catch (error) {
        showMessage("Failed to remove item from cart", false);
      } finally {
        setOperationLoading({ type: null });
        setItemLoading(false);
      }
    },
    [updateCount]
  );

  // Clear cart
  const clearCart = useCallback(async () => {
    setOperationLoading({ type: "clear" });
    setItemLoading(true);
    try {
      const data = await clearCartAPI();
      if (data.message === "success") {
        showMessage("Cart cleared successfully", true);
        setCart(null);
        updateCount(undefined, true);
      } else {
        showMessage("Failed to clear cart", false);
      }
    } catch (error) {
      showMessage("Failed to clear cart", false);
    } finally {
      setOperationLoading({ type: null });
      setItemLoading(false);
    }
  }, [updateCount]);

  // Update quantity
  const updateQuantity = useCallback(
    async (id: string, count: number) => {
      setOperationLoading({ type: "quantity", itemId: id });
      setItemLoading(true);
      try {
        const data = await updateQuantityAPI(id, count);
        if (data.status === "success") {
          showMessage(
            count === 0
              ? "Item removed from cart"
              : "Quantity updated successfully",
            true
          );
          setCart(data?.data || null);
          updateCount(data);
        } else {
          showMessage("Failed to update quantity", false);
        }
      } catch (error) {
        showMessage("Failed to update quantity", false);
      } finally {
        setOperationLoading({ type: null });
        setItemLoading(false);
      }
    },
    [updateCount]
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Empty cart
  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="gradient-primary cursor-pointer"
                disabled={itemLoading}
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto sm:px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/products">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">
                Shopping{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Cart
                </span>
              </h1>
            </div>
          </div>

          {/* Clear Cart */}
          <Button
            variant="destructive"
            size="sm"
            onClick={clearCart}
            disabled={operationLoading.type === "clear" || itemLoading}
            className="cursor-pointer self-start sm:self-center"
          >
            {operationLoading.type === "clear" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {cart.products.map((item, index) => (
                    <div key={item._id}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 relative w-28 h-28 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                            className="rounded-lg object-contain bg-muted border"
                            loading="lazy"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold sm:text-lg mb-2 line-clamp-2">
                            {item.product.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-bold text-lg text-primary">
                              ${item.price}
                            </span>
                          </div>
                          {item.product.quantity === 0 && (
                            <p className="text-destructive text-sm font-medium">
                              Out of stock
                            </p>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center p-2 border rounded-lg overflow-hidden">
                            <Button
                              variant="destructive"
                              className="cursor-pointer"
                              size="sm"
                              onClick={() =>
                                updateQuantity(item.product._id, item.count - 1)
                              }
                              disabled={itemLoading}
                            >
                              {item.count === 1 ? (
                                <Trash2 className="h-4 w-4" />
                              ) : (
                                <Minus className="h-4 w-4" />
                              )}
                            </Button>
                            <span className="px-3 py-1 text-center min-w-[3rem]">
                              {operationLoading.type === "quantity" &&
                              operationLoading.itemId === item.product._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                item.count
                              )}
                            </span>
                            <Button
                              variant="default"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() =>
                                updateQuantity(item.product._id, item.count + 1)
                              }
                              disabled={itemLoading}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeItem(item.product._id)}
                            disabled={itemLoading}
                            className="cursor-pointer text-accent-foreground"
                          >
                            {operationLoading.type === "remove" &&
                            operationLoading.itemId === item.product._id ? (
                              <Loader2 className="h-6 w-6 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {index < cart.products.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{cart.totalCartPrice.toFixed(2)} EGP</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="w-full gradient-primary cursor-pointer hover:scale-105 transition-transform"
                    disabled={operationLoading.type !== null}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
