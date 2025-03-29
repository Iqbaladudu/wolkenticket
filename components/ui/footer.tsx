"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

// Define types for footer content
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  logo?: React.ReactNode;
  tagline?: string;
  columns: FooterColumn[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  copyrightText?: string;
  variant?: "light" | "dark";
  animationEnabled?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  logo = "Wolkenticket",
  tagline = "Creating better experiences for a digital world",
  columns = [],
  newsletterTitle = "Subscribe to our newsletter",
  newsletterDescription = "Get the latest updates and news delivered to your inbox.",
  socialLinks = {},
  copyrightText = `© ${new Date().getFullYear()} Brand, Inc. All rights reserved.`,
  variant = "light",
  animationEnabled = true,
}) => {
  const [email, setEmail] = React.useState<string>("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  // Determine theme classes based on variant
  const themeClasses = {
    container: variant === "light" ? "bg-gray-50" : "bg-gray-900",
    text: variant === "light" ? "text-gray-800" : "text-gray-200",
    subtext: variant === "light" ? "text-gray-600" : "text-gray-400",
    separator: variant === "light" ? "bg-gray-200" : "bg-gray-700",
    input: variant === "light" ? "bg-white" : "bg-gray-800",
    logo: variant === "light" ? "text-primary" : "text-primary-foreground",
  };

  // Animation variants with Framer Motion
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Conditionally wrap with motion component based on animation preference
  const AnimatedContainer = animationEnabled ? motion.div : React.Fragment;

  const AnimatedItem = animationEnabled ? motion.div : React.Fragment;

  // Motion props based on animation preference
  const containerMotionProps = animationEnabled
    ? {
        variants: containerAnimation,
        initial: "hidden",
        animate: "show",
      }
    : {};

  const itemMotionProps = animationEnabled
    ? {
        variants: itemAnimation,
      }
    : {};

  return (
    <footer
      className={`${themeClasses.container} ${themeClasses.text} pt-12 pb-8`}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <AnimatedContainer
          {...containerMotionProps}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8"
        >
          {/* Brand Section */}
          <AnimatedItem
            {...itemMotionProps}
            className="lg:col-span-4 flex flex-col space-y-4"
          >
            <div className={`text-2xl font-bold ${themeClasses.logo}`}>
              {logo}
            </div>
            <p
              className={`${themeClasses.subtext} text-sm md:text-base max-w-md`}
            >
              {tagline}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.github && (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <GitHubLogoIcon className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {socialLinks.twitter && (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <TwitterLogoIcon className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {socialLinks.instagram && (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <InstagramLogoIcon className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {socialLinks.linkedin && (
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:scale-110 transition-transform"
                >
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInLogoIcon className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </AnimatedItem>

          {/* Footer Columns */}
          {columns.map((column, columnIndex) => (
            <AnimatedItem
              {...itemMotionProps}
              key={`column-${columnIndex}`}
              className="lg:col-span-2"
            >
              <h3 className="font-semibold text-base md:text-lg mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={`link-${columnIndex}-${linkIndex}`}>
                    <a
                      href={link.href}
                      className={`${themeClasses.subtext} text-sm hover:underline hover:text-primary transition-colors duration-200`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          ))}

          {/* Newsletter Section */}
          <AnimatedItem {...itemMotionProps} className="lg:col-span-4">
            <h3 className="font-semibold text-base md:text-lg mb-2">
              {newsletterTitle}
            </h3>
            <p className={`${themeClasses.subtext} text-sm mb-4`}>
              {newsletterDescription}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className={`${themeClasses.input} w-full`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className={`${themeClasses.subtext} text-xs`}>
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </AnimatedItem>
        </AnimatedContainer>

        <Separator className={`${themeClasses.separator} my-8`} />

        {/* Copyright Section */}
        <AnimatedItem
          {...itemMotionProps}
          className="flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <div
            className={`${themeClasses.subtext} mb-4 md:mb-0 text-center md:text-left`}
          >
            {copyrightText}
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className={`${themeClasses.subtext} hover:underline hover:text-primary transition-colors duration-200`}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={`${themeClasses.subtext} hover:underline hover:text-primary transition-colors duration-200`}
            >
              Terms of Service
            </a>
            <a
              href="#"
              className={`${themeClasses.subtext} hover:underline hover:text-primary transition-colors duration-200`}
            >
              Cookies
            </a>
          </div>
        </AnimatedItem>
      </div>
    </footer>
  );
};

export default Footer;
