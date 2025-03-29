"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Plane,
  ChevronLeft,
  ChevronRight,
  Trash2,
  CheckCircle2,
  User,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { convertToSelectOptionsWithCountry } from "@/lib/utils";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formSchema } from "@/constant/schema";
import { submitForm } from "@/action/submit.action";
import Pay from "./pay";
import StyledAsyncSelect from "./styledAsyncSelect";
import { StepProps, AirportOption } from "@/constant/interfaces";
import TravelDetails from "./travelDetails";

// Animation variants
export const pageVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export type FormValues = z.infer<typeof formSchema>;

export default function MultiStepBookingForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flightType: "roundTrip",
      departureCity: {
        label: "",
        value: "",
        country: "",
      },
      destinationCity: {
        label: "",
        value: "",
        country: "",
      },
      departureDate: "",
      returnDate: "",
      email: "",
      phone: "",
      passengers: [{ name: "", birthDate: "" }],
      paymentMethod: "paypal",
    },
  });

  const {
    data: airportsData,
    isLoading,
    error,
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

  const onSubmit = (data: FormValues) => {
    console.log("Booking Data:", data);
    submitForm(data);
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Book Your Journey
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Find the perfect flight for your next adventure with our easy
            booking process.
          </p>
        </motion.div>

        <BookingProgressBar currentStep={step} totalSteps={totalSteps} />

        <Card className="bg-white shadow-xl border-none rounded-xl overflow-hidden">
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <TravelDetails form={form} airportsData={airportsData} />
                  )}
                  {step === 2 && <PassengerInfo form={form} />}
                  {step === 3 && <CheckoutOptions form={form} />}
                </AnimatePresence>

                <motion.div
                  className="flex justify-between mt-10 pt-6 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex items-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  {step !== totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Complete Booking
                    </Button>
                  )}
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 mt-8">
          <p>
            Need help with your booking?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
