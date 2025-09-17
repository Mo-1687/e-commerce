import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center animate-pulse">
            <span className="text-primary-foreground font-bold text-2xl">
              E
            </span>
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-30 blur animate-ping"></div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="font-bold text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            ElegantShop
          </h1>
          <p className="text-muted-foreground text-sm">
            Loading your experience...
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex space-x-2">
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
