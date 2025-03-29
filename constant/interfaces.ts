import { UseFormReturn } from "react-hook-form";
import { formSchema } from "./schema";
import { z } from "zod";

export interface AirportOption {
  value: string;
  label: string;
  country?: string;
}

export interface StepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  airportsData?: AirportOption[];
}
