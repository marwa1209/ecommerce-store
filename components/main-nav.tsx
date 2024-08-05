/** @format */

"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data?: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const routes = data?.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center lg:space-x-6">
      {routes?.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary hidden lg:block",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
      <div className="flex items-center justify-between w-full lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {menuOpen ? "" : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-all duration-500 ease-in-out lg:hidden",
          {
            "-translate-x-full": !menuOpen,
            "translate-x-0": menuOpen,
          }
        )}
      >
        <div className="flex items-center justify-between p-4">
          <span className="text-xl font-semibold">Menu</span>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-full">
          <div className="flex flex-col space-y-2 p-4">
            {routes?.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "block px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive
                      ? "text-black dark:text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {route.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
