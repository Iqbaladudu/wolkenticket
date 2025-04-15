"use server";

import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export async function submitMessageAction({
  data,
  form_id,
}: {
  data: any;
  form_id: string;
}) {
  try {
    const result = await payload.create({
      collection: "form-submissions",
      data: {
        form: form_id,
        submissionData: data,
      },
    });
    return result;
  } catch (error: unknown) {
    throw new Error(
      `Failed to submit form data for form ID ${form_id}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
