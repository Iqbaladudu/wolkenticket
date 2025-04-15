import { initTransaction } from "payload";
import { z } from "zod";

export const formSchema = z
  .object({
    flightType: z.enum(["oneWay", "roundTrip"], {
      required_error: "Please select a flight type",
    }),
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
      .refine((val) => val !== null, {
        message: "Destination city is required",
      }),
    departureDate: z
      .string()
      .min(1, "Departure date is required")
      .refine((val) => new Date(val) >= new Date(), {
        message: "Departure date must be today or later",
      }),
    returnDate: z.string().optional(),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    phone: z.string().min(1, "Phone number is required"),
    passengers: z
      .array(
        z.object({
          name: z.string().min(1, "Name is required"),
          birthDate: z.string().min(1, "Birth date is required"),
        }),
      )
      .min(1, "At least one passenger is required"),
    paymentMethod: z.enum(["paypal", "bank_transfer"]),
    transaction_id: z
      .string()
      .min(17, "Transaction ID must be at least 17 characters long"),
  })
  .superRefine((data, ctx) => {
    // Only validate returnDate if flight type is roundTrip
    if (data.flightType === "roundTrip") {
      if (!data.returnDate || data.returnDate.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Return date is required for round trips",
          path: ["returnDate"],
        });
      }

      // Check if return date is after departure date when both exist
      if (data.returnDate && data.departureDate) {
        if (new Date(data.returnDate) < new Date(data.departureDate)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Return date must be after departure date",
            path: ["returnDate"],
          });
        }
      }
    }
  });
