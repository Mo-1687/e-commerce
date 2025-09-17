"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft, ShoppingBag, Compass } from "lucide-react";

const NotFound = () => {
  const quickLinks = [
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "Categories", href: "/categories", icon: Compass },
    { name: "Home", href: "/", icon: Home },
  ];

  function handleGoBack() {
    window.history.back();
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-8xl font-bold text-muted/20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-2xl gradient-primary flex items-center justify-center animate-pulse">
              <Search className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <h1 className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ElegantShop
          </h1>
          <div className="h-px w-24 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Don&apos;t worry, let&apos;s get you back on track with some
            helpful links below.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex-1 rounded-xl cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>

            <Link href="/" className="flex-1">
              <Button className="w-full cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">
            Or explore these popular sections:
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <div className="group p-4 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <link.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      {link.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

       
        
      </div>
    </div>
  );
};

export default NotFound;
