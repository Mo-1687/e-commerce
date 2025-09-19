"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ResetPasswordAPI from "@/API/Auth/ResetPassword/ResetPasswordApi";
import showMessage from "@/app/_Components/Toast/Toast";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  // Schema Validation
  const schema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .regex(
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        "Email must be like example@example.com"
      ),
    newPassword: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be like example: Abcd@1234"
      ),
  });

  // Use Form
  const resetPasswordForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const formInputs = [
    { id: "email", type: "email", placeholder: "Enter your email", icon: Mail },
    {
      id: "newPassword",
      type: showPassword ? "text" : "password",
      placeholder: "Create password",
      icon: showPassword ? Eye : EyeOff,
    },
  ];

  async function handleResetPassword(values: z.infer<typeof schema>) {
    try {
      const data = await ResetPasswordAPI<z.infer<typeof schema>>(values);

      if (data?.token) {
        showMessage("Password reset successfully", true);

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

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

 

  return (
    <>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to login
      </Link>

      <Card className="glass border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Set New Password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter a new password for your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
              className="space-y-4"
            >
              {formInputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <FormField
                    control={resetPasswordForm.control}
                    name={input.id as keyof z.infer<typeof schema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={input.id} className="capitalize">
                          {input.id}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 cursor-pointer text-muted-foreground p-0"
                              onClick={() => handleShowPassword()}
                            >
                              <input.icon className="h-4 w-4" />
                            </Button>

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

              <Button
                type="submit"
                className="w-full gradient-primary hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={resetPasswordForm.formState.isSubmitting}
              >
                {resetPasswordForm.formState.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCcw className="animate-spin" />
                    Update Password
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPassword;
