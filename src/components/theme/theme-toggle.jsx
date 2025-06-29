// import { Moon, Sun } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "./theme-provider";

// export function ThemeToggle() {
//   const { setTheme, theme } = useTheme();

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   const isDark = theme === "dark";

//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       onClick={toggleTheme}
//       aria-label="Toggle theme"
//     >
//       {isDark ? (
//         <Sun className="w-5 h-5 text-background dark:text-foreground transition-transform" />
//       ) : (
//         <Moon className="w-5 h-5 text-background dark:text-foreground transition-transform" />
//       )}
//     </Button>
//   );
// }

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  console.log(theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="text-foreground">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
