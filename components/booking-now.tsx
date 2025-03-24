"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const FormSchema = z.object({
  from: z.string({
    required_error: "Please select departure airport",
  }),
  to: z.string({
    required_error: "Please select arrival airport",
  }),
});

export default function BookingNow() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [airportFilter, setAirportFilter] = useState();

  const airports = useQuery({
    queryKey: ["airports"],
    queryFn: async () => {
      return await axios.get(process.env.NEXT_PUBLIC_AIRPORT_CODE! as string);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-12 lg:grid-cols-2 items-center"
      ></form>
    </Form>
  );
}

function searchAirport(arr: any, query: string) {
  // Ubah input menjadi huruf kecil untuk pencarian case-insensitive
  const searchTerm = query.toLowerCase();

  // Filter array berdasarkan input
  const results = arr?.filter(
    (airport) =>
      airport.label.toLowerCase().includes(searchTerm) ||
      airport.value.toLowerCase().includes(searchTerm),
  );

  return results;
}
