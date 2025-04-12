"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define props interface for customization
interface PaymentFailedProps {
  errorMessage?: string;
  onRetry?: () => void;
  onBackToHome?: () => void;
}

// Animation variants for fade and slide effect, consistent with CheckoutOptions
const pageVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.4 } },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
};

const PaymentFailed: React.FC<PaymentFailedProps> = ({
  errorMessage = "Sorry, your payment could not be processed. Please try again.",
  onRetry,
  onBackToHome,
}) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        <div className="mt-8 bg-red-50 p-4 sm:p-6 rounded-lg border border-red-100">
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
            {/* Error Icon with Animation */}
            <motion.div variants={iconVariants}>
              <XCircle
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-red-600"
                strokeWidth={2}
              />
            </motion.div>

            {/* Error Message */}
            <div className="space-y-2 sm:space-y-3 max-w-xs sm:max-w-sm md:max-w-md">
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-red-800">
                Payment Failed
              </h3>
              <p className="text-base sm:text-lg text-gray-700">
                {errorMessage}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                onClick={onRetry}
                className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-purple-600 hover:bg-purple-700 transition duration-300 rounded-lg"
              >
                Retry Payment
              </Button>
              <Button
                onClick={onBackToHome}
                variant="outline"
                className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base border-gray-300 hover:bg-gray-50 transition duration-300 rounded-lg text-gray-700"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentFailed;
