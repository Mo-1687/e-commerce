"use client";
import { ArrowLeft, LoaderCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import ForgotPasswordAPI from "@/API/ForgotPassword/ForgotPassword";
import showMessage from "@/app/_Components/Toast/Toast";

const ForgotPassword = () => {
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
  });

  // Use Form
  const forgotPasswordForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const formInputs = [
    { id: "email", type: "email", placeholder: "Enter your email", icon: Mail },
  ];

  async function handleForgotPassword(values: z.infer<typeof schema>) {
    
    try {
      const data = await ForgotPasswordAPI<z.infer<typeof schema>>(values);
      console.log(data);
      

      if (data.statusMsg === "success") {
        showMessage("Code sent to your email", true);

        setTimeout(() => {
          router.push("/verifyCode");
        }, 1500);
      } else {
        showMessage(data.message, false);
      }
    } catch (error) {
      console.log(error);

      showMessage("Invalid email or password.", false);
      throw new Error("Invalid email or password.");
    }
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
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...forgotPasswordForm}>
            <form
              onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
              className="space-y-4"
            >
              {formInputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <FormField
                    control={forgotPasswordForm.control}
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
                            <input.icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <Input
                              {...field}
                              id={input.id}
                              type={input.type}
                              placeholder={input.placeholder}
                              className="pl-3 pr-10  transition-all duration-200 focus:scale-[1.02]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full gradient-primary cursor-pointer hover:scale-105 transition-transform"
                disabled={forgotPasswordForm.formState.isSubmitting}
              >
                {forgotPasswordForm.formState.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Code"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotPassword;
