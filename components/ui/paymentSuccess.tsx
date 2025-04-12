import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define props interface for customization
interface PaymentSuccessProps {
  transactionId?: string;
  onBackToHome?: () => void;
  message?: string;
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

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({
  transactionId = "N/A",
  onBackToHome,
  message = "Your payment has been successfully processed!",
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
        <div className="mt-8 bg-green-50 p-4 sm:p-6 rounded-lg border border-green-100">
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
            {/* Success Icon with Animation */}
            <motion.div variants={iconVariants}>
              <CheckCircle
                className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-green-600"
                strokeWidth={2}
              />
            </motion.div>

            {/* Success Message */}
            <div className="space-y-2 sm:space-y-3 max-w-xs sm:max-w-sm md:max-w-md">
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-green-800">
                Payment Successful
              </h3>
              <p className="text-base sm:text-lg text-gray-700">{message}</p>
              <p className="text-sm sm:text-base text-gray-500">
                Transaction ID:{" "}
                <span className="font-mono">{transactionId}</span>
              </p>
            </div>

            {/* Back to Home Button */}
            <Button
              onClick={onBackToHome}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-purple-600 hover:bg-purple-700 transition duration-300 rounded-lg"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
