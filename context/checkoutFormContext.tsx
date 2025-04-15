"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AirportOption } from "@/constant/interfaces";
import { formSchema } from "@/constant/schema";

// Derived type from the schema
export type FormValues = z.infer<typeof formSchema>;

// Create context interface
interface CheckoutFormContextType {
  form: UseFormReturn<FormValues>;
  airportsData: AirportOption[] | null;
  setAirportsData: React.Dispatch<React.SetStateAction<AirportOption[] | null>>;
}

// Create context with a default undefined value
const CheckoutFormContext = createContext<CheckoutFormContextType | undefined>(
  undefined,
);

// Context provider component
export function CheckoutFormProvider({ children }: { children: ReactNode }) {
  const [airportsData, setAirportsData] = React.useState<
    AirportOption[] | null
  >(null);

  // Initialize form with default values
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
      transaction_id: "XXXXXXXXXXXXXXXXX",
    },
  });

  return (
    <CheckoutFormContext.Provider
      value={{ form, airportsData, setAirportsData }}
    >
      {children}
    </CheckoutFormContext.Provider>
  );
}

// Custom hook to use the form context
export function useCheckoutForm() {
  const context = useContext(CheckoutFormContext);
  if (context === undefined) {
    throw new Error(
      "useCheckoutForm must be used within a CheckoutFormProvider",
    );
  }
  return context;
}
