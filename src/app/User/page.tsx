"use client";

import { UpdateUser } from "@/API/User/User";
import showMessage from "../_Components/Toast/Toast";
import { Edit, LoaderCircle, Mail, Phone, Save, User } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import defaultAvatar from "@/assets/3d-cartoon-style-character.jpg";

export default function UserProfile() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  // Schema Validation
  const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .regex(
        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
        "Email must be like example@example.com"
      ),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  });

  // Use Form
  const UserForm = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
    },
    resolver: zodResolver(schema),
  });

  // Update form values when session data loads
  useEffect(() => {
    if (session?.user) {
      UserForm.reset({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "",
      });
    }
  }, [session?.user, UserForm]);

  const formInputs = [
    { id: "name", type: "text", placeholder: "Enter your name", icon: User },
    { id: "email", type: "email", placeholder: "Enter your email", icon: Mail },
    { id: "phone", type: "tel", placeholder: "Enter your phone", icon: Phone },
  ];

  async function handleUpdate(values: z.infer<typeof schema>) {
    try {
      const data = await UpdateUser(values);

      if (data?.message === "success") {
        // Update the NextAuth session with new user data
        await update({
          name: values.name,
          email: values.email,
        });

        showMessage("Account updated successfully", true);
        setIsEditing(false);
      } else {
        showMessage(data?.errors?.msg || "Something went wrong", false);
      }
    } catch (error) {
      showMessage("Failed to update account. Please try again.", false);
      console.error("Update error:", error);
    }
  }

  const handleCancel = () => {
    UserForm.reset({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "", // Reset to current local phone
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Profile
          </h1>

          <Card className="glass border-white/20">
            <CardHeader className="text-center pb-6">
              <div className="relative mx-auto">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage src={defaultAvatar.src} alt="Profile" />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {session?.user?.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="mt-4">Profile Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {isEditing ? (
                <Form {...UserForm}>
                  <form
                    onSubmit={UserForm.handleSubmit(handleUpdate)}
                    className="space-y-4"
                  >
                    {formInputs.map((input) => (
                      <div key={input.id} className="space-y-2">
                        <FormField
                          control={UserForm.control}
                          name={input.id as keyof z.infer<typeof schema>}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor={input.id}
                                className="capitalize flex items-center gap-2"
                              >
                                {input.id}
                              </FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <input.icon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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

                    <div className="flex gap-4 pt-6">
                      <Button
                        type="submit"
                        className="flex-1 cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={UserForm.formState.isSubmitting}
                      >
                        {UserForm.formState.isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <LoaderCircle className="animate-spin h-4 w-4" />
                            Updating...
                          </span>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        className="cursor-pointer flex-1 rounded-xl border-border/20"
                        onClick={handleCancel}
                        disabled={UserForm.formState.isSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Name
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                        {session?.user?.name}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </div>
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                        {session?.user?.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
