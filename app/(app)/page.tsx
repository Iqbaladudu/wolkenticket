import Navbar from "@/components/navbar";
import Hero from "@/components/home/hero";
import Featured from "@/components/home/featured";
import Testimonials from "@/components/home/testimonials";
import QnA from "@/components/home/question";
import CallToActionWithPartners from "@/components/home/cta";
import AboutUs from "@/components/home/about";
import Footer from "@/components/ui/footer";
import { Metadata } from "next";
// import BookingInstructions from "@/components/home/instructions"; // Uncomment if used

// Add specific metadata for the homepage
export const metadata: Metadata = {
  title: "Wolkenticket | Get Your Verified Flight Reservation In Minutes", // Keep specific or use default from layout
  description:
    "Get verified flight reservations for visa applications in minutes. Fast, easy, reliable, and affordable dummy tickets starting at just $8 with Wolkenticket.",
  alternates: { // Add canonical URL
    canonical: '/',
  },
  // You can override OG/Twitter data here if needed, otherwise layout defaults apply
};

export default function Home() {
  console.log(process.env.NODE_ENV);
  return (
    <>
      <Navbar />
      <main> {/* Wrap main content */}
        <Hero />
        <Featured />
        <AboutUs />
        <Testimonials />
        {/* <BookingInstructions /> */}
        <CallToActionWithPartners />
        <QnA />
      </main>
      <Footer />
    </>
  );
}
