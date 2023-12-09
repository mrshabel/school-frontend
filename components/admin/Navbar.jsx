import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-end items-center backdrop-blur-sm shadow-sm fixed top-0 h-[7vh] w-screen px-6 pt-1 ">
      <div className="flex items-center gap-2 mr-1">
        <ThemeToggle />
      </div>
    </nav>
  );
}
