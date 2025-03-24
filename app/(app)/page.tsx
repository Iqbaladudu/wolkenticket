import Navbar from "@/components/navbar";
import Hero from "@/components/home/hero";
import Featured from "@/components/home/featured";
import Testimonials from "@/components/home/testimonials";
import BookingInstructions from "@/components/home/instructions";
import QnA from "@/components/home/question";
import CallToActionWithPartners from "@/components/home/cta";
import AboutUs from "@/components/home/about";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <Featured />
      <Testimonials />
      <BookingInstructions />
      <CallToActionWithPartners />
      <QnA />
    </>
  );
}
