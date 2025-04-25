import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { CheckoutFormProvider } from "@/context/checkoutFormContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import favicon from "@/lib/favicon";
import Script from "next/script";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wolkenticket | Get Your Ticket In Minutes",
  description: "Get Your Ticket In Minutes",
  icons: favicon,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        dangerouslySetInnerHTML={{
          __html: ` (function(c,l,a,r,i,t,y){
               c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
               t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
               y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
           })(window, document, "clarity", "script", "r9k5z1fjs5");`,
        }}
      />
      <QueryProvider>
        <body
          suppressHydrationWarning
          className={`${jakarta.className} antialiased mb-10`}
        >
          <CheckoutFormProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </CheckoutFormProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
