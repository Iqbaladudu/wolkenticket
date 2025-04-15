"use server";

import { formSchema } from "@/constant/schema";
import { getPayload } from "payload";
import { z } from "zod";
import config from "@payload-config";

const payload = await getPayload({ config });

interface SubmissionResponse {
  success: boolean;
  result?: Record<string, any>;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export async function submitForm({
  formData,
  status,
}: {
  formData: z.infer<typeof formSchema>;
  status: "confirmed";
}): Promise<SubmissionResponse> {
  try {
    // Convert FormData to a plain object
    const data = Object.fromEntries(
      formData instanceof FormData ? formData : Object.entries(formData),
    ) as Record<string, unknown>;

    // Validate the form data
    const validationResult = formSchema.safeParse(data);

    if (!validationResult.success) {
      // Return validation errors
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: validationResult.error.flatten().fieldErrors,
      };
    }

    // Validated data
    const validData = validationResult.data;

    // Create a record in the database
    const result = await payload.create({
      collection: "bookings",
      data: {
        flightType: validData.flightType,
        departureCity: {
          value: validData.departureCity.value,
          label: validData.departureCity.label,
        },
        destinationCity: {
          value: validData.destinationCity.value,
          label: validData.destinationCity.label,
        },
        departureDate: validData.departureDate,
        returnDate: validData.returnDate,
        passengers: validData.passengers,
        paymentMethod: validData.paymentMethod,
        email: validData.email,
        phone: validData.phone,
        transaction_id: validData.transaction_id,
        bookingStatus: status,
        totalPrice: validData.passengers.length * 8,
      },
    });

    return {
      success: true,
      result,
    };
  } catch (error: unknown) {
    // Properly type the error
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return {
      success: false,
      error: errorMessage,
    };
  }
}
