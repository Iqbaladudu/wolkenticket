import { NextResponse } from "next/server";
import { CollectionConfig } from "payload";

import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
  PaypalExperienceLandingPage,
  PaypalExperienceUserAction,
  ShippingPreference,
} from "@paypal/paypal-server-sdk";

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_API_KEY as string,
    oAuthClientSecret: process.env.PAYPAL_SECRET as string,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Error,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

const ordersController = new OrdersController(client);
const paymentsController = new PaymentsController(client);

const createOrder = async () => {
  const collect = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: "100",
            breakdown: {
              itemTotal: {
                currencyCode: "USD",
                value: "100",
              },
            },
          },
          // lookup item details in `cart` from database
          items: [
            {
              name: "T-Shirt",
              unitAmount: {
                currencyCode: "USD",
                value: "100",
              },
              quantity: "1",
              description: "Super Fresh Shirt",
              sku: "sku01",
            },
          ],
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    const response = await ordersController.ordersCreate({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: "100",
            },
          },
        ],
      },
    });
    // Get more response info...
    // const { statusCode, headers } = httpResponse;
    return {
      jsonResponse: JSON.parse(response.body as string),
      httpStatusCode: response.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      // const { statusCode, headers } = error;
      throw new Error(error.message);
    }
  }
};

export const BookingsCollection: CollectionConfig = {
  slug: "bookings",
  admin: {
    useAsTitle: "email",
    defaultColumns: [
      "email",
      "flightType",
      "departureCity",
      "destinationCity",
      "departureDate",
      "createdAt",
    ],
    group: "Travel",
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "flightType",
      type: "select",
      required: true,
      options: [
        {
          label: "One Way",
          value: "oneWay",
        },
        {
          label: "Round Trip",
          value: "roundTrip",
        },
      ],
      admin: {
        description: "Type of flight booking",
      },
    },
    {
      name: "departureCity",
      type: "group",
      admin: {
        description: "Departure city or airport",
      },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "country",
          type: "text",
        },
      ],
    },
    {
      name: "destinationCity",
      type: "group",
      admin: {
        description: "Destination city or airport",
      },
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "country",
          type: "text",
        },
      ],
    },
    {
      name: "departureDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMM d, yyyy",
        },
        description: "Date of departure",
      },
      validate: (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const departureDate = new Date(value);
        departureDate.setHours(0, 0, 0, 0);

        if (departureDate < today) {
          return "Departure date must be today or later";
        }

        return true;
      },
    },
    {
      name: "returnDate",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMM d, yyyy",
        },
        description: "Date of return (required for round trips)",
        condition: (data) => data.flightType === "roundTrip",
      },
      validate: (value, { data }) => {
        if (data.flightType === "roundTrip" && !value) {
          return "Return date is required for round trips";
        }

        if (value && data.departureDate) {
          const departureDate = new Date(data.departureDate);
          const returnDate = new Date(value);

          if (returnDate < departureDate) {
            return "Return date must be after departure date";
          }
        }

        return true;
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      admin: {
        description: "Contact email for booking",
      },
    },
    {
      name: "phone",
      type: "text",
      required: true,
      admin: {
        description: "Contact phone number",
      },
    },
    {
      name: "passengers",
      type: "array",
      minRows: 1,
      admin: {
        description: "Passenger information",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          admin: {
            description: "Full name of passenger",
          },
        },
        {
          name: "birthDate",
          type: "date",
          required: true,
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "MMM d, yyyy",
            },
            description: "Date of birth",
          },
        },
      ],
    },
    {
      name: "paymentMethod",
      type: "select",
      required: true,
      options: [
        {
          label: "Credit Card",
          value: "credit_card",
        },
        {
          label: "PayPal",
          value: "paypal",
        },
        {
          label: "Bank Transfer",
          value: "bank_transfer",
        },
      ],
      admin: {
        description: "Method of payment",
      },
    },
    {
      name: "bookingStatus",
      type: "select",
      defaultValue: "pending",
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Confirmed",
          value: "confirmed",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
        {
          label: "Completed",
          value: "completed",
        },
      ],
      admin: {
        description: "Current status of the booking",
        position: "sidebar",
      },
    },
    {
      name: "totalPrice",
      type: "number",
      admin: {
        description: "Total price of the booking",
        position: "sidebar",
      },
    },
    {
      name: "notes",
      type: "textarea",
      admin: {
        description: "Additional notes or special requirements",
      },
    },
  ],
  timestamps: true,
  endpoints: [
    {
      path: "/pay",
      method: "post",
      handler: async () => {
        try {
          const data = await createOrder();
          return NextResponse.json(
            {
              ...data?.jsonResponse,
            },
            { status: data?.httpStatusCode },
          );
        } catch (error) {
          return NextResponse.json({
            error: error,
          });
        }
      },
    },
  ],
};
