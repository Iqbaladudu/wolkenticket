"use client";

import React, { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCheckoutForm } from "@/context/checkoutFormContext"; // Import from context
import TravelDetails from "./travelDetails";
import PassengerInfo from "./passengerInfo";
import CheckoutOptions from "./checkoutOptions";
import { convertToSelectOptionsWithCountry } from "@/lib/utils";
import { AirportOption, StepProps } from "@/constant/interfaces";
import { formSchema } from "@/constant/schema";
import { z } from "zod";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Plane } from "lucide-react";
import BookingProgressBar from "./bookingProgressbar";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Navbar from "../navbar";

// Animation variants
export const pageVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeInOut" } }, // Added transition
  exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeInOut" } }, // Added transition
};

export type FormValues = z.infer<typeof formSchema>;

export default function MultiStepBookingForm() {
  const [step, setStep] = useState(1);
  const { form } = useCheckoutForm();
  const totalSteps = 3;

  const {
    data: airports,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["get-airports"],
    queryFn: async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_AIRPORT_CODE as string,
      );
      return convertToSelectOptionsWithCountry(data);
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: Array<keyof FormValues> = [];
    if (step === 1) {
      fieldsToValidate = [
        "departureCity",
        "destinationCity",
        "departureDate",
        "returnDate",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["email", "phone", "passengers"];
    }

    const validate = await form.trigger(fieldsToValidate as any);
    if (validate) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
      // Scroll to top on step change
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    // Scroll to top on step change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Plane className="h-12 w-12 text-blue-500 mx-auto" />
          </motion.div>
          <p className="text-lg font-medium text-gray-700">
            Loading airports...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg w-full">
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Error loading airports
          </h3>
          <p className="text-red-600">{(error as Error).message}</p>
          <Button
            className="mt-4 bg-red-100 text-red-700 hover:bg-red-200 border border-red-200"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Floating elements for visual interest */}
          <div className="relative">
            <motion.div
              className="absolute -top-10 -left-16 opacity-10 hidden md:block"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Plane className="h-16 w-16 text-blue-500" />
            </motion.div>

            <motion.div
              className="absolute top-40 -right-10 opacity-10 hidden md:block"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Plane className="h-12 w-12 text-purple-500" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            {/* Use H1 for the main page title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Book Your Flight Reservation
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Complete the steps below to get your verified flight document instantly.
            </p>
          </motion.div>

          <BookingProgressBar currentStep={step} totalSteps={totalSteps} />

          <Card className="bg-white shadow-xl border-none rounded-xl overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form className="space-y-8">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <TravelDetails key="step1" form={form} airportsData={airports} />
                    )}
                    {step === 2 && <PassengerInfo key="step2" form={form} />}
                    {step === 3 && <CheckoutOptions key="step3" form={form} />}
                  </AnimatePresence>

                  <motion.div
                    className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100" // Added items-center
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="flex items-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 rounded-full px-5 py-2.5" // Style adjustments
                      >
                        <ChevronLeft className="h-4 w-4" /> Back
                      </Button>
                    ) : (
                      // Keep space consistent even if button isn't there
                      <div aria-hidden="true" />
                    )}

                    {step !== totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full px-5 py-2.5" // Style adjustments
                      >
                        Continue <ChevronRight className="h-4 w-4" />
                      </Button>
                    ) : null} {/* Submit button is handled within CheckoutOptions */}
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500 mt-8">
            <p>
              Need help with your booking?{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
