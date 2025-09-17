import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_Components/Navbar/Navbar";
import Footer from "./_Components/Footer/Footer";
import { ThemeProvider } from "./_Components/Theme/ThemeProvider";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import UserProvider from "@/UserProvider/UserProvider";
import CountProvider from "@/CountProvider/CountProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elegant Shop",
  description: "E-commerce website for all your needs ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProvider>
            <CountProvider>
              <ThemeProvider
                attribute={"class"}
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
              <Toaster position="top-center" visibleToasts={1} />
                <Navbar />
                <main className="min-h-screen p-8 bg-background antialiased">
                  {children}
                </main>
                <Footer />
              </ThemeProvider>
            </CountProvider>
          </UserProvider>
        </Suspense>
      </body>
    </html>
  );
}
