import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";
import { CheckoutFormProvider } from "@/context/checkoutFormContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import favicon from "@/lib/favicon";
import Script from "next/script";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

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
      <GoogleTagManager gtmId="GTM-5P7KSW25" />
      <GoogleAnalytics gaId="G-BQ9J3MXCS1" />
      <body
        suppressHydrationWarning
        className={`${jakarta.className} antialiased mb-10`}
      >
        <QueryProvider>
          <CheckoutFormProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </CheckoutFormProvider>
        </QueryProvider>
        <Script id="clarity">
          {`(function(c,l,a,r,i,t,y){
                 c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                 t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                 y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
             })(window, document, "clarity", "script", "r9k5z1fjs5");`}
        </Script>
      </body>
    </html>
  );
}
