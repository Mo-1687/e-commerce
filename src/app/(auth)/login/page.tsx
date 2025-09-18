"use client";
import { useContext, useState } from "react";
import { Eye, EyeOff, LoaderCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { countContext } from "@/CountProvider/CountProvider";
import { getCartData } from "@/API/CartActions/CartActions";
import showMessage from "@/app/_Components/Toast/Toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const contextValue = useContext(countContext);
  if (!contextValue) {
    throw new Error("CountContext must be used within a CountProvider");
  }
  const { updateCount } = contextValue;
  const Router = useRouter();
  // Schema Validation
  const schema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .regex(
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        "Email must be like example@example.com"
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be like example: Abcd@1234"
      ),
  });

  // Use Form
  const loginForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const formInputs = [
    { id: "email", type: "email", placeholder: "Enter your email", icon: Mail },
    {
      id: "password",
      type: showPassword ? "text" : "password",
      placeholder: "Enter your password",
      icon: showPassword ? Eye : EyeOff,
    },
  ];

  async function handleLogin(values: z.infer<typeof schema>) {
    try {
      const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
      console.log(data)
    if (data?.ok) {
      showMessage("Login successfully", true);

      const CartData = await getCartData();
      updateCount(CartData);

      setTimeout(() => {
        Router.push("/");
      }, 1500);
    } else {
      showMessage("Email or password is incorrect", false);
    }
    } catch (error) {
      console.log(error);
       
    }
    
  }
  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      <Card className="border-0 shadow-xl glass">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              {formInputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <FormField
                    control={loginForm.control}
                    name={input.id as keyof z.infer<typeof schema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={input.id} className="capitalize">
                          {input.id === "rePassword"
                            ? "Confirm Password"
                            : input.id}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            {input.id === "password" ? (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer text-muted-foreground p-0"
                                onClick={() => handleShowPassword()}
                              >
                              
                                  <input.icon className="h-4 w-4" />
                                
                              </Button>
                            ) : (
                              <input.icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            )}
                            <Input
                              {...field}
                              id={input.id}
                              type={input.type}
                              placeholder={input.placeholder}
                              className="pl-3 pr-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {/* Login Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full cursor-pointer gradient-primary hover:scale-105 transition-transform"
                disabled={loginForm.formState.isSubmitting}
              >
                {loginForm.formState.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    Login...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          {/* Sign In Links */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Do not have an account?{" "}
              <Link
                href="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-muted-foreground">
              Forgot password?{" "}
              <Link
                href="/forgotPassword"
                className="text-primary font-medium hover:underline"
              >
                Reset Password
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
