"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  LogOut,
  Menu,
  ShoppingCart,
  User,
  X,
  ChevronDown,
  Home,
  Package,
  Grid3X3,
  Tag,
  ShoppingBag,
  Heart,
} from "lucide-react";
import ThemeToggle from "../Theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { countContext } from "@/CountProvider/CountProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, status } = useSession();

  const countContextValue = useContext(countContext);
  if (!countContextValue) {
    throw new Error("CountContext must be used within a CountProvider");
  }
  const { count } = countContextValue;

  const shopItems = [
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/categories", icon: Grid3X3 },
    { name: "Brands", href: "/brands", icon: Tag },
  ];

  const userItems = [
    { name: "Profile", href: "/User", icon: User },
    { name: "Orders", href: "/allorders", icon: ShoppingBag },
    { name: "Favorites", href: "/wishList", icon: Heart },
  ];

  const pathname: string = usePathname();

  function checkPathname(path: string): boolean {
    return pathname === path;
  }

  function isUserItemActive(): boolean {
    return userItems.some((item) => pathname === item.href);
  }

  function handleLogout() {
    signOut({
      callbackUrl: "/",
    });
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 logo">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                E
              </span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ElegantShop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {/* Home Link */}
            <Link
              href="/"
              className={`relative overflow-hidden text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                checkPathname("/")
                  ? "text-primary font-semibold after:w-full after:left-0"
                  : "text-muted-foreground after:left-1/2"
              } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}
            >
              Home
            </Link>

            {/* Shop Links */}
            {shopItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative overflow-hidden text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                  checkPathname(item.href)
                    ? "text-primary font-semibold after:w-full after:left-0"
                    : "text-muted-foreground after:left-1/2"
                } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all after:duration-300 hover:after:w-full hover:after:left-0`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User & Cart */}
            {status === "authenticated" ? (
              <>
                {/* User Dropdown - Desktop */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden sm:flex cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl capitalize"
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span className="hidden md:inline">
                        {data?.user.name}
                      </span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-background border-white/20"
                  >
                    {userItems.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-2 cursor-pointer ${
                            checkPathname(item.href)
                              ? "text-primary bg-primary/10"
                              : "bg-background"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-destructive cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Dropdown - Mobile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="sm:hidden cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-background border-white/20"
                  >
                    {userItems.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={`flex items-center space-x-2 cursor-pointer ${
                            checkPathname(item.href)
                              ? "text-primary bg-primary/10"
                              : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="hover:bg-destructive cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart */}
                <Link href="/cart" className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`cursor-pointer hover:bg-gradient-to-r from-primary to-accent transition-all duration-200 ${
                      checkPathname("/cart") &&
                      "bg-gradient-to-r text-accent-foreground from-primary to-accent"
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {count > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gradient-primary border-none shadow-lg animate-glow"
                      >
                        {count}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {/* Auth Buttons - Desktop */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl text-xs md:text-sm"
                    >
                      <User className="h-4 w-4 mr-1 md:mr-2" />
                      <span className="hidden md:inline">Login</span>
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="default"
                      size="sm"
                      className="cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-xs md:text-sm"
                    >
                      <span className="hidden md:inline">Sign Up</span>
                      <span className="md:hidden">Join</span>
                    </Button>
                  </Link>
                </div>

                {/* Auth Dropdown - Mobile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="sm:hidden cursor-pointer gradient-primary text-primary-foreground hover:opacity-90 rounded-xl"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 glass border-white/20"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href="/login"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <User className="h-4 w-4" />
                        <span>Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/signup"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <User className="h-4 w-4" />
                        <span>Sign Up</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/40 py-4 animate-slideIn">
            <nav className="flex flex-col space-y-3">
              {/* Home */}
              <Link
                href="/"
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary py-2 ${
                  checkPathname("/") ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>

              {/* Shop Items */}
              {shopItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary py-2 ${
                    checkPathname(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
