"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Banknote,
  CreditCard,
  Loader2,
  MapPin,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CartItem } from "@/interface/Cart/CartProducts.type";
import { getCartData } from "@/API/CartActions/CartActions";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { payCash, payVisa } from "@/API/Checkout/Checkout";
import { countContext } from "@/CountProvider/CountProvider";
import showMessage from "@/app/_Components/Toast/Toast";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const contextValue = useContext(countContext);
  if (!contextValue) {
    throw new Error("CountContext must be used within a CountProvider");
  }
  const { updateCount } = contextValue;

  useEffect(() => {
    fetchData();
  }, []);

  // Initial data fetch
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

  const checkoutSchema = z.object({
    details: z.string().nonempty("Address is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    city: z.string().nonempty("City is required"),
  });

  // Use Form
  const checkoutForm = useForm<z.infer<typeof checkoutSchema>>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  const formInputs = [
    {
      id: "details",
      type: "text",
      placeholder: "Enter your details",
      icon: MapPin,
    },
    {
      id: "phone",
      type: "text",
      placeholder: "Enter your phone number",
      icon: Phone,
    },
    {
      id: "city",
      type: "text",
      placeholder: "Enter your city",
      icon: MapPin,
    },
  ];

  async function handleCheckout(values: z.infer<typeof checkoutSchema>) {
    try {
      const data =
        paymentMethod === "cash"
          ? await payCash(values, cart?._id)
          : await payVisa(values, cart?._id);

      if (data?.status === "success") {
        showMessage("Order placed successfully", true);
        updateCount(undefined, true);
        if (paymentMethod === "visa") {
          setTimeout(() => {
            window.open(data.session.url);
          }, 1500);
        } else {
        fetchData()
        }
      } else {
        showMessage("Failed to place order, please try again", false);
      }
    } catch (error) {
      console.error(error);
      showMessage("Failed to place order, please try again", false);
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Empty cart check or failed to fetch data
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
              <Button size="lg" className="gradient-primary cursor-pointer">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="secondary"
              size="sm"
              className="hover:cursor-pointer"
            >
              <Link href="/cart" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Checkout
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Shipping Information */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...checkoutForm}>
                  <form
                    onSubmit={checkoutForm.handleSubmit(handleCheckout)}
                    className="space-y-4"
                  >
                    {formInputs.map((input) => (
                      <div key={input.id} className="space-y-2">
                        <FormField
                          control={checkoutForm.control}
                          name={
                            input.id as keyof z.infer<typeof checkoutSchema>
                          }
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor={input.id}
                                className="capitalize text-sm sm:text-base"
                              >
                                {input.id}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <input.icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                  {input.id === "details" ? (
                                    <Textarea
                                      {...field}
                                      id={input.id}
                                      placeholder={input.placeholder}
                                      className="pl-3 pr-10 text-sm sm:text-base"
                                    />
                                  ) : (
                                    <Input
                                      {...field}
                                      id={input.id}
                                      type={input.type}
                                      placeholder={input.placeholder}
                                      className="pl-3 pr-10 text-sm sm:text-base"
                                    />
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full cursor-pointer gradient-primary hover:scale-105 transition-transform text-sm sm:text-base"
                      disabled={checkoutForm.formState.isSubmitting}
                    >
                      {checkoutForm.formState.isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin h-4 w-4" />
                          Placing Order
                        </span>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {cart?.products.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/20"
                    >
                      <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                          className="rounded-lg object-cover"
                          priority={false}
                          quality={75}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm sm:text-base">
                          {item.product.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Quantity: {item.count}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm sm:text-base">
                          {item.price} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-border/20">
                  <div className="flex justify-between text-base sm:text-lg font-semibold pt-3 border-t border-border/20">
                    <span>Total</span>
                    <span>{cart?.totalCartPrice.toFixed(2)} EGP</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4 pt-6 border-t border-border/20">
                  <Label className="text-base sm:text-lg font-semibold">
                    Payment Method
                  </Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label
                        htmlFor="cash"
                        className="flex items-center gap-2 cursor-pointer flex-1 text-sm sm:text-base"
                      >
                        <Banknote className="h-4 w-4" />
                        Cash on Delivery
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border border-border/20 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer">
                      <RadioGroupItem value="visa" id="visa" />
                      <Label
                        htmlFor="visa"
                        className="flex items-center gap-2 cursor-pointer flex-1 text-sm sm:text-base"
                      >
                        <CreditCard className="h-4 w-4" />
                        Visa Card
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
