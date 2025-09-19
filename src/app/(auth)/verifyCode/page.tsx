"use client";
import { ArrowLeft, RefreshCcw, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import Link from "next/link";
import VerifyCodeAPI from "@/API/Auth/verifyCode/VerifyCode";
import showMessage from "@/app/_Components/Toast/Toast";

const ResetCode = () => {
  const router = useRouter();
  // Schema Validation
  const schema = z.object({
    resetCode: z
      .string()
      .min(4, "Code must be 6 digits")
      .max(6, "Code must be 6 digits"),
  });

  // Use Form
  const verifyCodeForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(schema),
  });

  async function handleVerifyCode(values: z.infer<typeof schema>) {
    try {
      const data = await VerifyCodeAPI<z.infer<typeof schema>>(values);

      if (data?.status) {
        showMessage(data?.status, true);

        setTimeout(() => {
          router.push("/resetPassword");
        }, 1500);
      } else {
        showMessage(data?.message || "Invalid verification code", false);
      }
    } catch (error) {
      showMessage("Code verification failed. Please try again.", false);
      throw new Error("Code verification failed. Please try again.");
    }
  }

  return (
    <>
      <Link
        href="/forgotPassword"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to password reset
      </Link>

      <Card className="glass border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Verify Code
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the 6-digit code sent to
            <br />
            {/* <span className="font-medium text-foreground">{email}</span> */}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...verifyCodeForm}>
            <form
              onSubmit={verifyCodeForm.handleSubmit(handleVerifyCode)}
              className="space-y-4"
            >
              <FormField
                control={verifyCodeForm.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">Verify Code</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center justify-center">
                        <InputOTP
                          maxLength={6}
                          {...field}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full gradient-primary cursor-pointer hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={verifyCodeForm.formState.isSubmitting}
              >
                {verifyCodeForm.formState.isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCcw className="animate-spin" />
                    Verify Code
                  </span>
                ) : (
                  "Verify Code"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetCode;
