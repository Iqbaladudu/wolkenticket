"use client";

import * as React from "react";
import { Facebook, Instagram, Twitter, Github, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

const Footer: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="w-full bg-background">
      <div className="container px-4 py-8 md:py-12 lg:py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Company info and subscription */}
          <div className="lg:col-span-5 space-y-4">
            {/* <div className="space-y-2">
              <h2 className="text-xl font-bold">Wolkenticket</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                WolkenTicket provides instant, secure dummy tickets trusted by
                100++ travelers. Embassy-recognized documentation for smooth
                visa applications and stress-free travel planning.
              </p>
            </div> */}

            {/* <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-sm"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-10"
                required
              />
              <Button type="submit" className="sm:w-auto">
                Subscribe
              </Button>
            </form> */}
          </div>

          {/* Footer links */}
          {/* <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <FooterLinkGroup
                title="Company"
                links={[
                  { label: "About Us", href: "/about" },
                  { label: "Careers", href: "/careers" },
                  { label: "Press", href: "/press" },
                  { label: "Blog", href: "/blog" },
                ]}
              />
              <FooterLinkGroup
                title="Resources"
                links={[
                  { label: "Documentation", href: "/docs" },
                  { label: "Help Center", href: "/help" },
                  { label: "Tutorials", href: "/tutorials" },
                  { label: "Community", href: "/community" },
                ]}
              />
              <FooterLinkGroup
                title="Legal"
                links={[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                  { label: "Compliance", href: "/compliance" },
                ]}
              />
            </div>
          </div> */}
        </div>

        <Separator className="my-8" />

        {/* Bottom footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground order-2 sm:order-1">
            © {new Date().getFullYear()} Wolkenticket. All rights reserved.
          </div>

          <div className="flex space-x-2 order-1 sm:order-2">
            <SocialIcon href="https://twitter.com" ariaLabel="Twitter">
              <Twitter className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" ariaLabel="Instagram">
              <Instagram className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" ariaLabel="Facebook">
              <Facebook className="h-4 w-4" />
            </SocialIcon>
            <SocialIcon href="mailto:info@company.com" ariaLabel="Email">
              <Mail className="h-4 w-4" />
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
