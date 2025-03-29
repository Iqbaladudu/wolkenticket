import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Plane, User, CreditCard } from "lucide-react";

export default function BookingProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const steps = [
    { name: "Travel Details", icon: Plane },
    { name: "Passenger Info", icon: User },
    { name: "Checkout", icon: CreditCard },
  ];

  return (
    <div className="w-full mb-10">
      <div className="relative flex justify-between">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {/* Step circles */}
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep >= index + 1;
          const isCurrent = currentStep === index + 1;

          return (
            <div key={index} className="z-10 flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all",
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-white border-2 border-gray-200 text-gray-400",
                )}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 0.5,
                  repeat: isCurrent ? Infinity : 0,
                  repeatDelay: 5,
                }}
              >
                <StepIcon className="h-5 w-5" />
              </motion.div>
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  isActive ? "text-blue-700" : "text-gray-500",
                )}
              >
                {step.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
