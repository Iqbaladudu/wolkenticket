import BookingFormPage from "@/components/checkout/main";
import { Metadata } from "next";

// Add specific metadata for the checkout page
export const metadata: Metadata = {
  title: "Checkout - Book Your Flight Reservation",
  description: "Complete your booking for a verified flight reservation with Wolkenticket. Enter your travel and passenger details securely.",
  alternates: { // Add canonical URL
    canonical: '/checkout',
  },
  robots: { // Discourage indexing of checkout process pages
    index: false,
    follow: false, // No need to follow links from checkout usually
  },
  // OG/Twitter metadata will use defaults from layout unless overridden
};

export default function Page() {
  return (
    <main> {/* Wrap main content */}
      <BookingFormPage />
    </main>
  );
}
