import { StepProps } from "@/constant/interfaces";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormValues, pageVariants } from "./main";
import Pay from "./pay";
import { UseFormReturn } from "react-hook-form";

export default function CheckoutOptions({ form }: StepProps) {
  const watchPaymentMethod = form.watch("paymentMethod");
  const paymentMethods = [
    { id: "credit_card", label: "Credit Card", icon: CreditCard },
    { id: "paypal", label: "PayPal", icon: CreditCard },
    { id: "bank_transfer", label: "Bank Transfer", icon: CreditCard },
  ];

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
        <h2 className="text-2xl font-semibold text-gray-800">
          Checkout Options
        </h2>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Payment Method
              </FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isSelected = field.value === method.id;

                  return (
                    <div
                      key={method.id}
                      className={cn(
                        "relative p-4 border rounded-lg cursor-pointer transition-all duration-300",
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-blue-200 hover:bg-blue-50/30",
                      )}
                      onClick={() => field.onChange(method.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-full",
                            isSelected ? "bg-blue-100" : "bg-gray-100",
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5",
                              isSelected ? "text-blue-600" : "text-gray-500",
                            )}
                          />
                        </div>
                        <span
                          className={cn(
                            "font-medium",
                            isSelected ? "text-blue-700" : "text-gray-700",
                          )}
                        >
                          {method.label}
                        </span>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-2 top-2 text-blue-500"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Pay />

        <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="font-medium text-green-800 mb-2">Booking Summary</h3>
          <SummaryItem form={form} />
        </div>
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
