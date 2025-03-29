import { StepProps } from "@/constant/interfaces";
import { motion } from "framer-motion";
import { User, Mail, Phone, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { pageVariants } from "./main";

export default function PassengerInfo({ form }: StepProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "passengers",
  });

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 border-b pb-4">
        <div className="bg-green-100 p-2 rounded-full">
          <User className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Passenger Information
        </h2>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="e.g., john@example.com"
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      {...field}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-medium">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="e.g., +62 123 456 7890"
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      {...field}
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-lg font-medium text-gray-700 mt-6 mb-2">
          Passenger Details
        </h3>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
              }}
              className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-gray-700">
                  Passenger {index + 1}
                </h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`passengers.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., John Doe"
                          className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`passengers.${index}.birthDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Birth Date
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            {...field}
                          />
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: "", birthDate: "" })}
          className="mt-4 w-full md:w-auto border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
        >
          <User className="h-4 w-4 mr-2" /> Add Passenger
        </Button>
      </div>
    </motion.div>
  );
}
