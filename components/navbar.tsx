"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plane,
  Tickets,
  Menu,
  X,
  Hotel,
  Train,
  CarTaxiFront,
  Bus,
  Headphones,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <Link
              href="/"
              className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                <Plane className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Wolken
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Ticket
                </span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation & User Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            {/* Use nav for primary navigation links */}
            <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="items-center rounded-full text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                <Link href={"/view-booking"}>
                  <Tickets className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>View booking</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="items-center rounded-full text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-600"
              >
                <Link href={"/contact"}>
                  <Headphones className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Contact us</span>
                </Link>
              </Button>
            </nav>

            <Button
              size="lg"
              asChild // Use asChild to allow Link to control navigation
              className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-1px]"
            >
              <Link href={"/checkout"} className="md:inline-flex items-center">
                <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Book now</span>
              </Link>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="sm:flex md:flex lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="border-t overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Use nav for mobile navigation */}
            <nav className="py-4 px-4" aria-label="Mobile navigation">
              <ul className="">
                <li>
                  <MobileNavItem
                    href="/view-booking"
                    icon={<Tickets className="h-4 w-4" aria-hidden="true" />}
                    onClick={() => setIsMenuOpen(false)} // Close menu on click
                  >
                    View booking
                  </MobileNavItem>
                </li>
                <li>
                  <MobileNavItem
                    href="/contact"
                    icon={<Headphones className="h-4 w-4" aria-hidden="true" />}
                    onClick={() => setIsMenuOpen(false)} // Close menu on click
                  >
                    Contact
                  </MobileNavItem>
                </li>
                <li>
                  <Link
                    href="/checkout"
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                    Book now
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavItem({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-3 rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
        "text-muted-foreground hover:bg-gray-100 hover:text-gray-900",
      )}
      onClick={onClick}
    >
      <span>{icon}</span> {/* Icon styling simplified */}
      <span>{children}</span>
    </Link>
  );
}
