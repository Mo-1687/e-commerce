"use client";
import { useState } from "react";
import { Eye, EyeOff, Mail, User, Phone, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import handleSignup from "@/API/Regester/Regester";
import { useRouter } from "next/navigation";
import showMessage from "@/app/_Components/Toast/Toast";

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    rePassword: false,
  });

  // Schema Validation
  const schema = z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
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
      rePassword: z.string().min(1, "Please confirm your password"),
      phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: "Passwords must match",
    });

  // Use Form
  const Register = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

  const formInputs = [
    { id: "name", type: "text", placeholder: "Enter your name", icon: User },
    { id: "email", type: "email", placeholder: "Enter your email", icon: Mail },
    {
      id: "password",
      type: showPassword.password ? "text" : "password",
      placeholder: "Create password",
      icon: showPassword.password ? Eye : EyeOff,
    },
    {
      id: "rePassword",
      type: showPassword.rePassword ? "text" : "password",
      placeholder: "Confirm password",
      icon: showPassword.rePassword ? Eye : EyeOff,
    },
    { id: "phone", type: "tel", placeholder: "Phone number", icon: Phone },
  ];

  async function handleRegister(values: z.infer<typeof schema>) {
    try {
      const data = await handleSignup<z.infer<typeof schema>>(values);

      if (data?.message === "success") {
        showMessage(data?.message || "Account created successfully", true);

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        showMessage(data?.message || "Something went wrong", false);
      }
    } catch (error) {
      showMessage("Failed to create account. Please try again.", false);
      throw new Error("Failed to create account. Please try again.");
    }
  }

  function handleShowPassword(id: keyof typeof showPassword) {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <>
      <Card className="border-0 shadow-xl glass">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...Register}>
            <form
              onSubmit={Register.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              {formInputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <FormField
                    control={Register.control}
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
                            {input.id === "password" ||
                            input.id === "rePassword" ? (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer text-muted-foreground p-0"
                                onClick={() =>
                                  handleShowPassword(
                                    input.id as keyof typeof showPassword
                                  )
                                }
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

              {/* Sign Up Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full gradient-primary hover:scale-105 transition-transform"
                disabled={Register.formState.isSubmitting}
              >
                {Register.formState.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    Creating Account
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Signup;
