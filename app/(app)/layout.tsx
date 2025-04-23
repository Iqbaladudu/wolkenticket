import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { CheckoutFormProvider } from "@/context/checkoutFormContext";
import { Analytics } from "@vercel/analytics/react";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wolkenticket | Get Your Ticket In Minutes",
  description: "Get Your Ticket In Minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body
          suppressHydrationWarning
          className={`${jakarta.className} antialiased mb-10`}
        >
          <CheckoutFormProvider>
            {children}
            <Analytics />
          </CheckoutFormProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
