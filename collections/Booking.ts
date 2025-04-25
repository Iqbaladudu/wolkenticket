import { NextResponse } from "next/server";
import { CollectionConfig } from "payload";
import config from "@payload-config";

import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
} from "@paypal/paypal-server-sdk";
import { generateBookingEmail, get_access_token } from "@/lib/utils";
import { nanoid } from "nanoid";
import { getPayload } from "payload";

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId:
      process.env.NODE_ENV === "development"
        ? (process.env.PAYPAL_API_KEY_DEV as string)
        : (process.env.PAYPAL_API_KEY as string),
    oAuthClientSecret:
      process.env.NODE_ENV === "development"
        ? (process.env.PAYPAL_API_SECRET_DEV as string)
        : (process.env.PAYPAL_SECRET as string),
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
      name: "transaction_id",
      type: "text",
      required: true,
    },
    {
      name: "booking_code",
      type: "text",
      required: false,
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
      path: "/create-order",
      method: "post",
      handler: async (req) => {
        try {
          const reqData = await req?.json();
          const accessToken = await get_access_token();

          const orderDataJson = {
            intent: reqData?.intent?.toUpperCase() || "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: `${reqData?.amount * 8}`,
                },
              },
            ],
          };

          const response = await fetch(
            `${process.env.NODE_ENV === "development" ? process.env.PAYPAL_ENDPOINT_DEV : process.env.PAYPAL_ENDPOINT}/v2/checkout/orders`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "PayPal-Request-Id": nanoid(),
              },
              body: JSON.stringify(orderDataJson),
            },
          );

          if (!response.ok) {
            return NextResponse.json(
              { error: "Failed to create PayPal order" },
              { status: response.status },
            );
          }

          const paypalResponse = await response.json();
          return NextResponse.json({ ...paypalResponse }, { status: 200 });
        } catch (error) {
          return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
          );
        }
      },
    },
    {
      path: "/capture/:order_id",
      method: "post",
      handler: async (req) => {
        try {
          const params = req.routeParams;
          const accessToken = await get_access_token();
          const response = await fetch(
            `${process.env.NODE_ENV === "development" ? process.env.PAYPAL_ENDPOINT_DEV : process.env.PAYPAL_ENDPOINT}/v2/checkout/orders/${params?.order_id}/capture`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          const paypalResponse = await response.json();
          console.log(paypalResponse.payer.email_address);
          return NextResponse.json({ ...paypalResponse }, { status: 200 });
        } catch (e) {
          return NextResponse.json({ e }, { status: 500 });
        }
      },
    },
    {
      path: "/complete-order",
      method: "post",
      handler: async (req) => {
        try {
          const accessToken = await get_access_token();
          const { order_id, intent } = await req.json();

          const response = await fetch(
            `${process.env.NODE_ENV === "development" ? process.env.PAYPAL_ENDPOINT_DEV : process.env.PAYPAL_ENDPOINT}/v2/checkout/orders/${order_id}/${intent}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );

          if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
              { message: "Failed to create PayPal order", ...errorData },
              { status: response.status },
            );
          }

          const paypalResponse = await response.json();

          return NextResponse.json({ ...paypalResponse }, { status: 200 });
        } catch (error) {
          return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
          );
        }
      },
    },
  ],
  hooks: {
    afterOperation: [
      async (args) => {
        if (args.operation === "create") {
          const payload = await getPayload({ config });

          try {
            payload.sendEmail({
              to: args.result.email as string,
              subject: "Order Confirmation",
              html: generateBookingEmail(args.result),
            });
          } catch (error) {
            console.error(error);
          }
        }
      },
    ],
  },
};
