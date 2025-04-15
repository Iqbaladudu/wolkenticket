"use client";

import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import PaymentFailed from "../ui/paymentFailed";
import PaymentSuccess from "../ui/paymentSuccess";
import { submitForm } from "@/action/submit.action";
import { motion } from "framer-motion"; // Tambahkan import framer-motion
import { useCheckoutForm } from "@/context/checkoutFormContext";

// Define interface for message state
interface TransactionState {
  status?: "FAILED" | "SUCCESS" | "PROCESSING"; // Tambahkan status PROCESSING
  detail?: string;
  orderId?: string;
}

// Pay component props
interface PayProps {
  quantity: number;
}

const Pay: React.FC<PayProps> = ({ quantity }) => {
  const router = useRouter();
  const [transactionState, setTransactionState] = useState<TransactionState>(
    {},
  );

  const { form } = useCheckoutForm();

  // PayPal SDK initial options
  const initialOptions: ReactPayPalScriptOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_API_KEY,
    clientId: (process.env.NEXT_PUBLIC_PAYPAL_API_KEY as string) || "",
    "enable-funding": "venmo",
    "disable-funding": "paylater",
    "buyer-country": "CA",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  // Handle retry payment by resetting state
  const handleRetry = () => {
    setTransactionState({});
  };

  // Handle navigation back to home
  const handleBackToHome = () => {
    router.push("/");
  };

  // Render processing animation
  const renderProcessingAnimation = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <motion.div
        className="relative w-32 h-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-blue-200"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Spinning circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner checkmark container (appears after spinning) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8, ease: "easeOut" }}
          >
            <path d="M20 6L9 17l-5-5" />
          </motion.svg>
        </motion.div>
      </motion.div>

      <motion.h3
        className="mt-6 text-xl font-medium text-gray-800"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Processing your payment
      </motion.h3>

      <motion.div
        className="mt-4 flex space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 rounded-full bg-blue-500"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: dot * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.p
        className="mt-4 text-sm text-gray-600 max-w-xs text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Please wait while we confirm your payment and secure your tickets. This
        will only take a moment.
      </motion.p>
    </div>
  );

  // Render payment result based on transaction state
  const renderPaymentResult = () => {
    switch (transactionState.status) {
      case "SUCCESS":
        return (
          <PaymentSuccess
            onBackToHome={handleBackToHome}
            transactionId={transactionState.orderId}
            message="Your payment has been successfully processed!"
          />
        );
      case "FAILED":
        return (
          <PaymentFailed
            onRetry={handleRetry}
            onBackToHome={handleBackToHome}
            errorMessage={transactionState.detail}
          />
        );
      case "PROCESSING":
        return renderProcessingAnimation();
      default:
        return null;
    }
  };

  // Handle order creation for PayPal
  const createOrder = async () => {
    try {
      const response = await fetch("/api/bookings/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          amount: quantity,
        }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      setTransactionState({
        status: "FAILED",
        detail:
          error instanceof Error
            ? error.message
            : "An error occurred during order creation.",
      });
      throw error; // Re-throw to stop PayPal flow
    }
  };

  // Handle payment approval/capture
  const handleApprove = async (data: { orderID: string }, actions: any) => {
    try {
      // Set processing state immediately when payment is approved
      setTransactionState({
        status: "PROCESSING",
        detail: "Processing your payment",
      });

      const response = await fetch(`/api/bookings/capture/${data.orderID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const orderData = await response.json();
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // Recoverable error: restart payment flow
        setTransactionState({}); // Clear processing state
        return actions.restart();
      } else if (errorDetail) {
        // Non-recoverable error
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // Successful transaction
        const transaction = orderData.purchase_units[0].payments.captures[0];
        form.setValue("transaction_id", transaction.id);

        // Submit form with a slight delay to allow animation to be visible
        await submitForm({ formData: form.getValues(), status: "confirmed" });

        // Show success state after processing
        setTimeout(() => {
          setTransactionState({
            status: "SUCCESS",
            detail: "Transaction successful",
            orderId: transaction.id,
          });
        }, 3000);
      }
    } catch (error) {
      setTransactionState({
        status: "FAILED",
        detail:
          error instanceof Error
            ? error.message
            : "An error occurred during payment capture.",
      });
    }
  };

  return (
    <div className="mx-auto">
      {transactionState.status ? (
        renderPaymentResult()
      ) : (
        <div className="paypal-button-container">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{
                shape: "rect",
                layout: "vertical",
                color: "gold",
                label: "paypal",
              }}
              createOrder={createOrder}
              onApprove={handleApprove}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
};

export default Pay;
