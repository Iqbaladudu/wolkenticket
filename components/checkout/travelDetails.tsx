import { StepProps, AirportOption } from "@/constant/interfaces";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import { Plane, Calendar } from "lucide-react";
import { useMemo, useCallback } from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import StyledAsyncSelect from "./styledAsyncSelect";
import { pageVariants } from "./main";

export default function TravelDetails({ form, airportsData }: StepProps) {
  const flightType = form.watch("flightType");
  const fuse = useMemo(
    () =>
      new Fuse(airportsData || [], {
        keys: ["label", "value", "country"],
        threshold: 0.3,
        location: 0,
        distance: 100,
        minMatchCharLength: 2,
      }),
    [airportsData],
  );

  const loadAirports = useCallback(
    debounce(
      (inputValue: string, callback: (options: AirportOption[]) => void) => {
        if (!inputValue || inputValue.length < 2) {
          callback(airportsData?.slice(0, 15) || []);
          return;
        }

        const results = fuse
          .search(inputValue, { limit: 15 })
          .map((r) => r.item);
        callback(results);
      },
      300,
    ),
    [airportsData, fuse],
  );

  // Get current form values for enhanced UI feedback
  const departureCity = form.watch("departureCity");
  const destinationCity = form.watch("destinationCity");
  const departureDate = form.watch("departureDate");
  const returnDate = form.watch("returnDate");
  const showRoutePreview = departureCity && destinationCity;

  // Calculate duration if both dates are selected
  const tripDuration = useMemo(() => {
    if (departureDate && returnDate) {
      const start = new Date(departureDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return null;
  }, [departureDate, returnDate]);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            1
          </span>
          Flight Type
        </h3>

        <FormField
          control={form.control}
          name="flightType"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div
                    className={cn(
                      "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all duration-200",
                      field.value === "oneWay"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200",
                    )}
                  >
                    <RadioGroupItem value="oneWay" id="oneWay" />
                    <label
                      htmlFor="oneWay"
                      className="flex items-center gap-2 cursor-pointer font-medium text-gray-700"
                    >
                      <Plane className="h-4 w-4 text-blue-500" />
                      <span>One Way</span>
                    </label>
                  </div>
                  <div
                    className={cn(
                      "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-all duration-200",
                      field.value === "roundTrip"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-200",
                    )}
                  >
                    <RadioGroupItem value="roundTrip" id="roundTrip" />
                    <label
                      htmlFor="roundTrip"
                      className="flex items-center gap-2 cursor-pointer font-medium text-gray-700"
                    >
                      <Plane className="h-4 w-4 rotate-45 text-blue-500" />
                      <Plane className="h-4 w-4 -rotate-45 text-blue-500" />
                      <span>Round Trip</span>
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>
      {/* Header with animated background */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
        <motion.div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-white/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="relative flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Travel Details</h2>
            <p className="text-blue-100 text-sm mt-1">
              Find your perfect flight
            </p>
          </div>
        </div>
      </div>

      {/* Route Preview */}
      {showRoutePreview && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm border border-blue-100"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            {/* Departure */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider text-blue-500 font-semibold">
                Departure
              </span>
              <span className="text-base font-bold text-gray-800 mt-1">
                {departureCity.label}
              </span>
              {departureCity.country && (
                <span className="text-xs text-gray-500">
                  {departureCity.country}
                </span>
              )}
              {departureDate && (
                <span className="text-sm text-blue-700 mt-1">
                  {new Date(departureDate).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* Flight path */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
              <div className="w-full flex items-center justify-center gap-2">
                <div className="h-0.5 flex-1 bg-blue-200 relative">
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Plane className="h-6 w-6 text-blue-500 transform rotate-90" />
                </motion.div>
                <div className="h-0.5 flex-1 bg-blue-200"></div>
              </div>

              {tripDuration !== null && (
                <span className="text-xs text-blue-600 font-medium mt-2">
                  {tripDuration} {tripDuration === 1 ? "day" : "days"} trip
                </span>
              )}
            </div>

            {/* Destination */}
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
              <span className="text-xs uppercase tracking-wider text-indigo-500 font-semibold">
                Destination
              </span>
              <span className="text-base font-bold text-gray-800 mt-1">
                {destinationCity.label}
              </span>
              {destinationCity.country && (
                <span className="text-xs text-gray-500">
                  {destinationCity.country}
                </span>
              )}
              {returnDate && (
                <span className="text-sm text-indigo-700 mt-1">
                  {new Date(returnDate).toLocaleDateString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100 relative overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-3">
          <div className="p-2 bg-amber-100 rounded-full h-fit">
            <Calendar className="h-4 w-4 text-amber-600" />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-amber-800 text-sm">Travel Tips</h3>
            <p className="text-sm text-amber-700">
              Select your travel dates carefully.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-3 -bottom-3 h-12 w-12 rounded-full bg-amber-100/50" />
        <div className="absolute -right-6 -bottom-6 h-8 w-8 rounded-full bg-amber-100/30" />
      </motion.div>

      <div className="space-y-8">
        {/* Airport Selection Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
              1
            </span>
            Select Airports
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="departureCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-gray-700 font-medium">
                    <Plane className="h-3.5 w-3.5 text-blue-500" />
                    <span>Departure City</span>
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <StyledAsyncSelect
                        instanceId="departure-city-select"
                        placeholder="Search for departure city or airport"
                        cacheOptions
                        defaultOptions={airportsData?.slice(0, 15)}
                        loadOptions={loadAirports}
                        formatOptionLabel={(option: AirportOption) => (
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-1 rounded mt-0.5">
                              <Plane className="h-3 w-3 text-blue-700" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {option.label}
                              </span>
                              {option.country && (
                                <span className="text-xs text-gray-500">
                                  {option.country}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        noOptionsMessage={({
                          inputValue,
                        }: {
                          inputValue: string;
                        }) =>
                          inputValue.length < 2
                            ? "Type at least 2 characters to search"
                            : "No airports found"
                        }
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter city name or airport code
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destinationCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-gray-700 font-medium">
                    <Plane className="h-3.5 w-3.5 text-indigo-500" />
                    <span>Destination City</span>
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <StyledAsyncSelect
                        instanceId="destination-city-select"
                        placeholder="Search for destination city or airport"
                        cacheOptions
                        defaultOptions={airportsData?.slice(0, 15)}
                        loadOptions={loadAirports}
                        formatOptionLabel={(option: AirportOption) => (
                          <div className="flex items-start gap-2">
                            <div className="bg-indigo-100 p-1 rounded mt-0.5">
                              <Plane className="h-3 w-3 text-indigo-700" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {option.label}
                              </span>
                              {option.country && (
                                <span className="text-xs text-gray-500">
                                  {option.country}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        noOptionsMessage={({ inputValue }) =>
                          inputValue.length < 2
                            ? "Type at least 2 characters to search"
                            : "No airports found"
                        }
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter city name or airport code
                  </p>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Date Selection Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
              2
            </span>
            Choose Travel Dates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem className="bg-gray-50 p-3 rounded-lg transition-all duration-200 hover:shadow-sm">
                  <FormLabel className="flex items-center gap-1 text-gray-700 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-blue-500" />
                    <span>Departure Date</span>
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="date"
                        className="pl-10 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        min={new Date().toISOString().split("T")[0]}
                        {...field}
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                  <p className="text-xs text-gray-500 mt-1">
                    Select your outbound flight date
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="returnDate"
              render={({ field, fieldState }) => {
                return (
                  <FormItem
                    className={cn(
                      "bg-gray-50 p-3 rounded-lg transition-all duration-200 hover:shadow-sm",
                      flightType === "oneWay" && "opacity-50",
                    )}
                  >
                    <FormLabel className="flex items-center gap-1 text-gray-700 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                      <span>Return Date</span>
                      {flightType === "roundTrip" && (
                        <span className="text-red-500">*</span>
                      )}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="date"
                          className={cn(
                            "pl-10 border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                            fieldState.invalid && "border-red-300",
                          )}
                          min={
                            departureDate ||
                            new Date().toISOString().split("T")[0]
                          }
                          disabled={!departureDate || flightType === "oneWay"}
                          {...field}
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <p className="text-xs text-gray-500 mt-1">
                      {flightType === "oneWay"
                        ? "Not required for one-way flights"
                        : !departureDate
                          ? "Please select a departure date first"
                          : "Select your return flight date"}
                    </p>
                  </FormItem>
                );
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
