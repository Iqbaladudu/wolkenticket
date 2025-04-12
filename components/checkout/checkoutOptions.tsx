import { StepProps } from "@/constant/interfaces";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormValues, pageVariants } from "./main";
import Pay from "./pay";
import { UseFormReturn } from "react-hook-form";
import PaymentSuccess from "../ui/paymentSuccess";

export default function CheckoutOptions({ form }: StepProps) {
  const qty = form.getValues().passengers.length;
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="bg-purple-100 p-2 rounded-full">
          <CreditCard className="h-5 w-5 text-purple-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>
      </div>

      <div className="space-y-6">
        <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="font-medium text-green-800 mb-2">Booking Summary</h3>
          <SummaryItem form={form} />
        </div>
        {/* <PaymentSuccess /> */}
        <Pay quantity={qty} />
      </div>
    </motion.div>
  );
}

function SummaryItem({ form }: { form: UseFormReturn<FormValues> }) {
  const values = form.getValues();
  const departureCity = values.departureCity?.label || "Not selected";
  const destinationCity = values.destinationCity?.label || "Not selected";
  const departureDate = values.departureDate
    ? new Date(values.departureDate).toLocaleDateString()
    : "Not selected";
  const returnDate = values.returnDate
    ? new Date(values.returnDate).toLocaleDateString()
    : "Not selected";
  const passengerCount = values.passengers?.length || 0;

  return (
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Route:</span>
        <span className="font-medium text-gray-800">
          {departureCity} → {destinationCity}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Dates:</span>
        <span className="font-medium text-gray-800">
          {departureDate} - {returnDate}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Passengers:</span>
        <span className="font-medium text-gray-800">
          {passengerCount} {passengerCount === 1 ? "person" : "people"}
        </span>
      </div>
    </div>
  );
}
