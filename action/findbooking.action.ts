"use server";

import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export async function findBookingAction(code: string) {
  try {
    const result = await payload.find({
      collection: "bookings",
      where: {
        or: [
          {
            transaction_id: {
              equals: code,
            },
          },
          {
            id: {
              equals: code,
            },
          },
        ],
      },
    });
    return result;
  } catch (error: unknown) {
    throw new Error(
      `Failed to find booking with code ${code}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
