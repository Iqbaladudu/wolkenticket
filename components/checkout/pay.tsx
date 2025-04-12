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

// Define interface for message state
interface TransactionState {
  status?: "FAILED" | "SUCCESS";
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
      console.error("Error creating order:", error);
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
        return actions.restart();
      } else if (errorDetail) {
        // Non-recoverable error
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // Successful transaction
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setTransactionState({
          status: "SUCCESS",
          detail: "Transaction successful",
          orderId: transaction.id,
        });
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2),
        );
      }
    } catch (error) {
      console.error("Error capturing payment:", error);
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
      {/* Display payment result if transaction state is set */}
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
