"use client";

import * as React from "react";
import { Facebook, Instagram, Twitter, Github, Mail, Copyright } from "lucide-react"; // Added Copyright
import { Separator } from "@/components/ui/separator";
import Link from "next/link"; // Use NextLink for internal links if applicable

interface FooterLinkGroupProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({ title, links }) => (
  <div className="space-y-3">
    <h3 className="font-medium text-sm text-primary">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

interface SocialIconProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  href,
  ariaLabel,
  children,
}) => (
  <a
    href={href}
    aria-label={ariaLabel}
    className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors duration-200"
  >
    {children}
  </a>
);

// Define Footer component
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: "About Us", href: "/about" }, // Example internal link
    { label: "Contact", href: "/contact" },
    { label: "Terms of Service", href: "/terms" }, // Example page
    { label: "Privacy Policy", href: "/privacy" }, // Example page
  ];

  const resourceLinks = [
    { label: "FAQ", href: "/#faq" }, // Link to FAQ section on homepage
    { label: "How it Works", href: "/#how-it-works" }, // Link to instructions section
    { label: "Blog", href: "/blog" }, // Example blog page
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12"> {/* Use footer tag */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4">
             <Link href="/" className="flex items-center space-x-2">
               {/* Assuming similar logo structure as navbar */}
               <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                 {/* Replace with appropriate icon if Plane isn't right */}
                 <Mail className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform text-white" />
               </div>
               <span className="text-xl font-bold tracking-tight text-foreground">
                 Wolken
                 <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                   Ticket
                 </span>
               </span>
             </Link>
             <p className="text-sm text-muted-foreground">
               Your trusted partner for verified flight reservations. Fast, secure, and reliable service for visa applications worldwide.
             </p>
          </div>

          {/* Link Groups */}
          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Resources" links={resourceLinks} />

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-primary">Connect With Us</h3>
            <div className="flex space-x-3">
              <SocialIcon href="#" ariaLabel="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="#" ariaLabel="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="#" ariaLabel="Twitter">
                <Twitter className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="mailto:support@wolkenticket.com" ariaLabel="Email">
                <Mail className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground flex items-center justify-center">
          <Copyright className="h-4 w-4 mr-1.5" />
          <span>{currentYear} WolkenTicket. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Export the main Footer component
