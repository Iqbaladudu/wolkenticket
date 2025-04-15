"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getFormAction } from "@/action/getform.action";
import { Form as FormType } from "@/payload-types";
import { submitMessageAction } from "@/action/submitmessage.action";

// Definisi Zod Schema untuk field yang digunakan (email, text, textarea)
const emailFieldSchema = z.object({
  name: z.string(),
  label: z.string().optional().nullable(),
  width: z.number().optional().nullable(),
  required: z.boolean().optional().nullable(),
  id: z.string().optional().nullable(),
  blockName: z.string().optional().nullable(),
  blockType: z.literal("email"),
});

const textFieldSchema = z.object({
  name: z.string(),
  label: z.string().optional().nullable(),
  width: z.number().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  required: z.boolean().optional().nullable(),
  id: z.string().optional().nullable(),
  blockName: z.string().optional().nullable(),
  blockType: z.literal("text"),
});

const textareaFieldSchema = z.object({
  name: z.string(),
  label: z.string().optional().nullable(),
  width: z.number().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  required: z.boolean().optional().nullable(),
  id: z.string().optional().nullable(),
  blockName: z.string().optional().nullable(),
  blockType: z.literal("textarea"),
});

// Gabungkan field yang digunakan menjadi satu schema menggunakan z.discriminatedUnion
const fieldSchema = z.discriminatedUnion("blockType", [
  emailFieldSchema,
  textFieldSchema,
  textareaFieldSchema,
]);

// Definisi Zod Schema untuk Form (disederhanakan)
const formSchema = z.object({
  id: z.string(),
  title: z.string(),
  fields: z.array(fieldSchema).optional().nullable(),
  submitButtonLabel: z.string().optional().nullable(),
  confirmationType: z.enum(["message", "redirect"]).optional().nullable(),
  confirmationMessage: z
    .object({
      root: z.object({
        type: z.string(),
        children: z.array(
          z.object({
            type: z.string(),
            version: z.number(),
            additionalProperties: z.any().optional(),
          }),
        ),
        direction: z.enum(["ltr", "rtl"]).nullable(),
        format: z
          .enum(["left", "start", "center", "right", "end", "justify", ""])
          .optional(),
        indent: z.number(),
        version: z.number(),
      }),
      additionalProperties: z.any().optional(),
    })
    .optional()
    .nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

// Fungsi untuk membuat schema validasi formulir dinamis berdasarkan data Form
const createDynamicFormSchema = (formData: FormType) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  if (formData.fields) {
    formData.fields.forEach((field) => {
      // Hanya proses field yang relevan (email, text, textarea)
      if (["email", "text", "textarea"].includes(field.blockType)) {
        let fieldSchema: z.ZodTypeAny;

        switch (field.blockType) {
          case "email":
            fieldSchema = z
              .string()
              .email({ message: "Invalid email address" });
            break;
          case "text":
          case "textarea":
          default:
            fieldSchema = z.string();
            break;
        }

        if (field.required) {
          fieldSchema = fieldSchema.min(1, {
            message: `${field.label || field.name} is required`,
          });
        }

        schemaFields[field.name] = fieldSchema;
      }
    });
  }

  return z.object(schemaFields);
};

const DynamicContactForm: React.FC<{ variants: any }> = ({ variants }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormType | null>(null);

  // Ambil data formulir
  useEffect(() => {
    const fetchFormData = async () => {
      const data = await getFormAction({ form_id: "67fe11190b955fa959b41015" });
      setFormData(data);
    };
    fetchFormData();
  }, []);

  // Buat schema dinamis berdasarkan data formulir
  const dynamicSchema = formData
    ? createDynamicFormSchema(formData)
    : z.object({});

  // Inisialisasi form dengan react-hook-form dan zod
  const form = useForm({
    resolver: zodResolver(dynamicSchema),
    defaultValues:
      formData?.fields?.reduce(
        (acc, field) => {
          if (["email", "text", "textarea"].includes(field.blockType)) {
            acc[field.name] = field.defaultValue || "";
          }
          return acc;
        },
        {} as Record<string, any>,
      ) || {},
  });

  // Handle form submission
  const handleSubmit = (data: Record<string, any>) => {
    setIsLoading(true);
    const transformedData = Object.entries(data).map(
      ([fieldName, fieldValue]) => ({
        field: fieldName,
        value: fieldValue,
      }),
    );

    submitMessageAction({
      data: transformedData,
      form_id: "67fe11190b955fa959b41015",
    })
      .then((dt) => dt)
      .catch((err) => err)
      .finally(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      });
  };

  // Extract confirmation message text
  const confirmationText =
    "Thank you for reaching out. We’ll get back to you as soon as possible, typically less than 1 hour.";

  if (!formData) {
    return <FormLoading />;
  }

  return (
    <motion.div variants={variants} className="lg:col-span-2">
      <Card className="bg-white shadow-lg border-none rounded-xl overflow-hidden h-full">
        <CardContent className="p-6 sm:p-8">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10 sm:py-12"
            >
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {confirmationText}
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {formData.title}
                </h3>
                <p className="text-gray-600">
                  Fill out the form below, and we’ll respond promptly.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {formData.fields
                      ?.filter(
                        (field) =>
                          field.blockType === "email" ||
                          field.blockType === "text",
                      )
                      .map((field) => (
                        <FormField
                          key={field.id || field.name}
                          control={form.control}
                          name={field.name}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                {field.label || field.name}{" "}
                                {field.required && (
                                  <span className="text-red-500">*</span>
                                )}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type={
                                    field.blockType === "email"
                                      ? "email"
                                      : "text"
                                  }
                                  placeholder={`Your ${field.label || field.name}`}
                                  {...formField}
                                  className="border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-100"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                  </div>

                  {formData.fields
                    ?.filter((field) => field.blockType === "textarea")
                    .map((field) => (
                      <FormField
                        key={field.id || field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                              {field.label || field.name}{" "}
                              {field.required && (
                                <span className="text-red-500">*</span>
                              )}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help you?"
                                {...formField}
                                rows={4}
                                className="border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-100"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="flex items-center justify-center"
                      >
                        <LoaderCircle className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="h-4 w-4 mr-2" />
                        {formData.submitButtonLabel || "Submit"}
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Define props interface for customization
interface FormLoadingProps {
  message?: string;
  className?: string;
}

const FormLoading: React.FC<FormLoadingProps> = ({
  message = "Loading form...",
  className = "",
}) => {
  // Animation variants for the loading spinner
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Animation variants for the text fade
  const textVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center py-10 space-y-4 ${className}`}
    >
      {/* Animated Loading Spinner */}
      <motion.div
        variants={spinnerVariants}
        animate="animate"
        className="text-primary"
      >
        <Loader2 className="w-10 h-10 md:w-12 md:h-12" />
      </motion.div>

      {/* Animated Loading Text */}
      <motion.div
        variants={textVariants}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <p className="text-sm md:text-base lg:text-lg text-gray-600 font-medium">
          {message}
        </p>
      </motion.div>
    </div>
  );
};

export default DynamicContactForm;
