import Navbar from "@/components/navbar";
import Hero from "@/components/home/hero";
import Featured from "@/components/home/featured";
import Testimonials from "@/components/home/testimonials";
import QnA from "@/components/home/question";
import CallToActionWithPartners from "@/components/home/cta";
import AboutUs from "@/components/home/about";
import Footer from "@/components/ui/footer";

export default function Home() {
  console.log(process.env.NODE_ENV);
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <AboutUs />
      <Testimonials />
      {/* <BookingInstructions /> */}
      <CallToActionWithPartners />
      <QnA />
      <Footer />
    </>
  );
}
