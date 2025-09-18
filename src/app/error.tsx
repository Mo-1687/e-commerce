"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, ArrowLeft, Loader2 } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: React.FC<ErrorPageProps> = ({ error, reset }) => {
useEffect(() => {
    console.error(error);
}, [error])  

  const handleRetry = () => {
    reset();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 overflow-hidden">
      <div className="max-w-md w-full text-center space-y-8 animate-fadeInUp">
        {/* Error Icon with Shake Animation */}
        <div className="flex justify-center animate-slideDown">
          <div className="relative animate-shake">
            <div className="h-24 w-24 rounded-2xl bg-destructive/10 flex items-center justify-center shadow-lg animate-pulse">
              <AlertTriangle className="h-12 w-12 text-destructive animate-wiggle" />
            </div>
            <div className="absolute -inset-2 rounded-2xl bg-destructive/20 blur animate-ping"></div>
            <div className="absolute -inset-4 rounded-2xl bg-destructive/10 blur animate-ping"></div>
          </div>
        </div>

        {/* Brand with Slide Animation */}
        <div className="space-y-3 animate-slideUp">
          <h1 className="font-bold text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient">
            ElegantShop
          </h1>
          <div className="h-px w-28 bg-gradient-to-r from-transparent via-destructive to-transparent mx-auto animate-shimmer"></div>
        </div>

        {/* Error Message with Stagger Animation */}
        <div className="space-y-5 animate-slideUp">
          <h2 className="text-3xl font-bold text-foreground animate-bounce-gentle">
            Oops! Something went wrong ${error.message}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed animate-fadeIn">
            We encountered an unexpected error while loading this page.
            Don&apos;t worry, our team has been notified and we&apos;re working
            to fix it.
          </p>
        </div>

        {/* Action Buttons with Scale Animation */}
        <div className="space-y-4 animate-slideUp">
          <button
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-300 animate-scaleIn hover:animate-pulse px-4 py-3 flex items-center justify-center font-medium"
          >
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Try Again
          </button>

          <div className="flex space-x-3">
            <button
              onClick={handleGoBack}
              className="flex-1 border cursor-pointer border-border bg-background hover:bg-accent hover:text-accent-foreground rounded-xl hover:scale-105 transition-transform duration-200 animate-slideInLeft px-4 py-3 flex items-center justify-center font-medium"
              style={{ animationDelay: "1.2s" }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>

            <Link
              href="/"
              className="flex-1 border border-border bg-background hover:bg-accent hover:text-accent-foreground rounded-xl hover:scale-105 transition-transform duration-200 animate-slideInRight px-4 py-3 flex items-center justify-center font-medium"
              style={{ animationDelay: "1.2s" }}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </div>
        </div>

        {/* Help Text with Fade Animation */}
        <div className="pt-6 border-t border-border/40 animate-fadeIn">
          <p className="text-xs text-muted-foreground">
            If this problem persists, please{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium hover:animate-pulse"
            >
              contact our support team
            </Link>
          </p>
        </div>

        {/* Floating Error Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-destructive/30 rounded-full animate-float-error"></div>
          <div className="absolute top-1/3 right-1/5 w-2 h-2 bg-destructive/20 rounded-full animate-float-error-slow"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-destructive/25 rounded-full animate-float-error"></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
