"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Only render after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <Button
        variant="outline"
        className="cursor-pointer text-muted-foreground rounded-full border-none p-2 hover:bg-accent/50 focus:outline-none transition-all duration-300"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  function toggleTheme() {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }

  return (
    <>
      <Button
        variant={"outline"}
        onClick={toggleTheme}
        className="cursor-pointer text-muted-foreground rounded-full border-none p-2 hover:bg-accent/50 focus:outline-none  transition-all duration-300"
      >
        {resolvedTheme === "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]    transition-all duration-300 scale-100 rotate-0 " />
        ) : (
          <Moon className=" h-[1.2rem] w-[1.2rem]  transition-all duration-300 scale-100 rotate-0" />
        )}
      </Button>
    </>
  );
}
export default ThemeToggle;
