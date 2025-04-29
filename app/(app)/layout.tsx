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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // Fallback for local dev

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Add metadataBase
  title: {
    default: "Wolkenticket | Get Your Verified Flight Reservation In Minutes",
    template: "%s | Wolkenticket",
  },
  description:
    "Get verified flight reservations for visa applications in minutes. Fast, easy, reliable, and affordable dummy tickets starting at just $8.",
  icons: favicon,
  // openGraph: {
  //   title: "Wolkenticket | Verified Flight Reservations Fast",
  //   description:
  //     "Need a flight reservation for your visa? Get it instantly with Wolkenticket for just $8. Secure, reliable, and embassy-accepted.",
  //   url: siteUrl,
  //   siteName: "Wolkenticket",
  //   images: [
  //     {
  //       url: "/og-image.png", // Replace with your actual OG image path
  //       width: 1200,
  //       height: 630,
  //       alt: "Wolkenticket - Fast Flight Reservations",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Wolkenticket | Verified Flight Reservations Fast",
  //   description:
  //     "Instant flight reservations for visa needs from $8. Wolkenticket: Fast, Secure, Reliable.",
  //   // site: '@yourTwitterHandle', // Add your Twitter handle if you have one
  //   // creator: '@creatorTwitterHandle', // Add creator handle if applicable
  //   images: [`${siteUrl}/twitter-image.png`], // Replace with your actual Twitter image path
  // },
  robots: { // Add robots meta tag
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: ['flight reservation', 'dummy ticket', 'visa application', 'travel document', 'flight itinerary'],
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
