import Navbar from "@/components/navbar";
import ViewBookingContainer from "@/components/view-booking/viewBooking";
import { Metadata } from "next";

// Add specific metadata for the view booking page
export const metadata: Metadata = {
  title: "View Your Booking",
  description: "Check the status and details of your flight reservation with Wolkenticket using your booking code.",
  alternates: { // Add canonical URL
    canonical: '/view-booking',
  },
  robots: { // Discourage indexing of search results unless specifically intended
    index: false,
    follow: true,
  },
  // OG/Twitter metadata will use defaults from layout unless overridden
};


export default function Page() {
  return (
    <>
      <Navbar />
      <main> {/* Wrap main content */}
        <ViewBookingContainer />
      </main>
      {/* Consider adding Footer here if needed */}
    </>
  );
}
