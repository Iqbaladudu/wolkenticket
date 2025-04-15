"use server";

import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export async function getFormAction({ form_id }: { form_id: string }) {
  try {
    const result = await payload.findByID({
      id: form_id,
      collection: "forms",
    });
    return result;
  } catch (error: unknown) {
    throw new Error(
      `Failed to fetch form with ID ${form_id}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
