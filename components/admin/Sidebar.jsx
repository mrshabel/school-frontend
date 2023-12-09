"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Book,
  BookOpenCheck,
  ClipboardSignature,
  GraduationCap,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
  },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: <ClipboardSignature className="h-4 w-4 mr-2" />,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: <GraduationCap className="h-4 w-4 mr-2" />,
  },
  {
    title: "Teachers",
    href: "/admin/teachers",
    icon: <UsersRound className="h-4 w-4 mr-2" />,
  },
  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: <Book className="h-4 w-4 mr-2" />,
  },
  {
    title: "Results",
    href: "/admin/results",
    icon: <BookOpenCheck className="h-4 w-4 mr-2" />,
  },
];
export function Sidebar({ className }) {
  const path = usePathname();
  return (
    <nav className={cn("py-12 ", className)}>
      <div className="space-y-4">
        <div className="px-3">
          <h2 className="my-2 px-4 text-center text-lg font-semibold tracking-tight">
            Dev Schools
          </h2>
          <div className="space-y-2 pt-3">
            {links.map((link, index) => (
              <Button
                variant={link.href === path ? "" : "ghost"}
                className="w-full justify-start transition ease-linear "
                key={index}
                asChild
              >
                <Link href={link.href}>
                  {link.icon} {link.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
