"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hotel, Menu, Plane, Tickets, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                <Plane className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Wolken<span className="text-primary">Ticket</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavItem
              href="/flights"
              icon={<Plane className="h-4 w-4" />}
              active
            >
              Flights
            </NavItem>
            <NavItem href="/hotels" icon={<Hotel className="h-4 w-4" />}>
              Hotels
            </NavItem>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center rounded-full"
            >
              <Tickets className="h-4 w-4 mr-2" />
              Lihat Pesanan
            </Button>
            <Button
              size="sm"
              className="hidden md:flex items-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Kontak Kami
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <nav className="grid gap-1">
              <MobileNavItem
                href="/flights"
                icon={<Plane className="h-5 w-5" />}
                active
              >
                Flights
              </MobileNavItem>
              <MobileNavItem
                href="/hotels"
                icon={<Hotel className="h-5 w-5" />}
              >
                Hotels
              </MobileNavItem>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({
  href,
  icon,
  active,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        group flex items-center space-x-1 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200
        ${
          active
            ? "bg-primary/10 text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }
      `}
    >
      <span
        className={`
        transition-transform duration-300 group-hover:scale-110
        ${active ? "text-primary" : ""}
      `}
      >
        {icon}
      </span>
      <span className={"text-primary"}>{children}</span>
      {active && (
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
      )}
    </Link>
  );
}

function MobileNavItem({
  href,
  icon,
  active,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium transition-colors
        ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
      `}
    >
      <span className={active ? "text-primary" : ""}>{icon}</span>
      <span>{children}</span>
      {active && (
        <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>
      )}
    </Link>
  );
}
