"use client";

import { useState, useCallback, useMemo } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { convertToSelectOptionsWithCountry } from "@/lib/utils";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import { fit } from "sharp";

// Type definitions
interface AirportOption {
  value: string;
  label: string;
  country?: string;
}

// Zod schema for form validation
const formSchema = z.object({
  departureCity: z
    .object({
      value: z.string(),
      label: z.string(),
      country: z.string().optional(),
    })
    .nullable()
    .refine((val) => val !== null, { message: "Departure city is required" }),
  destinationCity: z
    .object({
      value: z.string(),
      label: z.string(),
      country: z.string().optional(),
    })
    .nullable()
    .refine((val) => val !== null, { message: "Destination city is required" }),
  departureDate: z
    .string()
    .min(1, "Departure date is required")
    .refine((val) => new Date(val) >= new Date(), {
      message: "Departure date must be today or later",
    }),
  returnDate: z
    .string()
    .min(1, "Return date is required")
    .refine((val) => new Date(val) >= new Date(), {
      message: "Departure date must be today or later",
    }),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  passengers: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        birthDate: z.string().min(1, "Birth date is required"),
      }),
    )
    .min(1, "At least one passenger is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

// Step 1: Travel Details Component
function TravelDetails({
  form,
  airportsData,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  airportsData: AirportOption[] | undefined;
}) {
  const fuse = useMemo(
    () => new Fuse(airportsData || [], { keys: ["label", "value"] }),
    [airportsData],
  );
  const loadAirports = useCallback(
    debounce(
      (inputValue: string, callback: (options: AirportOption[]) => void) => {
        const results = inputValue
          ? fuse.search(inputValue).map((r) => r.item)
          : airportsData || [];
        callback(results);
      },
      1000,
    ),
    [fuse, airportsData],
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Travel Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="departureCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure City</FormLabel>
              <FormControl>
                <AsyncSelect
                  placeholder="Select Departure City"
                  cacheOptions
                  defaultOptions={airportsData}
                  isClearable
                  isSearchable
                  loadOptions={loadAirports}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destinationCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination City</FormLabel>
              <FormControl>
                <AsyncSelect
                  placeholder="Select Destination City"
                  cacheOptions
                  defaultOptions={airportsData}
                  isClearable
                  isSearchable
                  loadOptions={loadAirports}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Date</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" className="pl-10" {...field} />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Date</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type="date" {...field} className="pl-10" />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </motion.div>
  );
}

// Step 2: Passenger Info Component
function PassengerInfo({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "passengers",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Passenger Information
      </h2>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g., john@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"phone"}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="e.g., +62 123 456 7890"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <FormField
              control={form.control}
              name={`passengers.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`passengers.${index}.birthDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-end gap-2">
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  className="mt-2"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ name: "", birthDate: "" })}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105"
        >
          Add Passenger
        </Button>
      </div>
    </motion.div>
  );
}
// Step 3: Checkout Options Component
function CheckoutOptions({ form }: { form: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Checkout Options
      </h2>
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <select
                value={field.value}
                onChange={field.onChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Payment Method</option>
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-sm text-gray-600 mt-4">
        Review your details before proceeding to payment.
      </p>
    </motion.div>
  );
}

// Main Multi-Step Booking Form Component
export default function MultiStepBookingForm() {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departureCity: {
        label: "",
        value: "",
      },
      destinationCity: {
        label: "",
        value: "",
      },
      departureDate: "",
      returnDate: "",
      passengers: [{ name: "", birthDate: "" }], // Start with one passenger
      paymentMethod: "",
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
    const validate = await form.trigger(
      step === 1
        ? ["departureCity", "destinationCity", "departureDate", "returnDate"]
        : ["email", "phone"],
    );

    if (validate) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Booking Data:", data);
    // Add API call here
  };

  if (isLoading)
    return <div className="text-center py-12">Loading airports...</div>;
  if (error)
    return (
      <div className="text-center py-12 text-red-500">
        Error loading airports: {(error as Error).message}
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 relative overflow-hidden">
      <motion.div
        className="absolute top-10 left-10 opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plane className="h-12 w-12 text-blue-300" />
      </motion.div>

      <Card className="max-w-2xl w-full mx-4 bg-white shadow-xl rounded-xl border border-gray-100">
        <CardContent className="p-8">
          <motion.h1
            className="text-3xl font-bold text-center mb-8 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Book Your Trip
          </motion.h1>

          {/* Progress Indicator */}
          <div className="flex justify-between mb-8">
            {["Travel Details", "Passenger Info", "Checkout"].map(
              (label, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <motion.div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white font-semibold ${
                      step > idx + 1
                        ? "bg-blue-600"
                        : step === idx + 1
                          ? "bg-blue-500"
                          : "bg-gray-300"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {idx + 1}
                  </motion.div>
                  <p className="text-sm mt-2 text-gray-600">{label}</p>
                </div>
              ),
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <TravelDetails form={form} airportsData={airportsData} />
                )}
                {step === 2 && <PassengerInfo form={form} />}
                {step === 3 && <CheckoutOptions form={form} />}
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    <ChevronLeft className="h-5 w-5" /> Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next <ChevronRight className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-green-600 hover:bg-green-700 text-white transform transition-all duration-300 hover:scale-105"
                  >
                    Confirm Booking
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
