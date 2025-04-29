"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchIcon,
  TicketIcon,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
  Plane,
  User,
  Calendar,
  Phone,
  Mail,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Booking } from "@/payload-types";
import { findBookingAction } from "@/action/findbooking.action";

// Simple fade animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// Search form component
const FullScreenLookupForm: React.FC<{
  onSearch: (code: string) => void;
  isSearching: boolean;
}> = ({ onSearch, isSearching }) => {
  const [bookingCode, setBookingCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingCode.trim()) {
      onSearch(bookingCode.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12 text-center" // Added text-center
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-50 to-transparent opacity-70"></div>

      {/* Content */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-lg w-full"
      >
        <Card className="bg-white/80 backdrop-blur-md shadow-xl border-none">
          <CardHeader>
            <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
              <TicketIcon className="h-8 w-8 text-blue-600" />
            </div>
            {/* Add H1 for the main title */}
            <CardTitle className="text-3xl font-bold text-gray-900">
              View Your Booking
            </CardTitle>
            <CardDescription className="text-gray-600 pt-1">
              Enter your booking code below to retrieve your flight reservation details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter Booking Code (e.g., WK123XYZ)"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value.toUpperCase())} // Suggest uppercase
                  className="pl-10 pr-4 py-3 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  aria-label="Booking Code Input"
                  required
                  minLength={6} // Example minimum length
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                disabled={isSearching || !bookingCode.trim()}
              >
                {isSearching ? "Searching..." : "Find Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-xs text-gray-500 mt-4">
          Can&apos;t find your code? Check your confirmation email or{" "}
          <a href="/contact" className="text-blue-600 hover:underline">contact support</a>.
        </p>
      </motion.div>
    </motion.div>
  );
};

// --- Placeholder for BookingDetails component ---
// This component would display the actual booking info once found.
// It should use semantic HTML (sections, headings, lists) for structure.
const BookingDetails: React.FC<{ booking: Booking; onBack: () => void }> = ({ booking, onBack }) => {
  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status config for styling
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
          title: "Completed",
          description: "Your booking has been completed",
        };
      case "confirmed":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <CheckCircle2 className="h-5 w-5 text-blue-600" />,
          title: "Confirmed",
          description: "Your booking is confirmed",
        };
      case "pending":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <Clock className="h-5 w-5 text-amber-600" />,
          title: "Pending",
          description: "Your booking is being processed",
        };
      case "cancelled":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <XCircle className="h-5 w-5 text-red-600" />,
          title: "Cancelled",
          description: "Your booking has been cancelled",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <AlertCircle className="h-5 w-5 text-gray-600" />,
          title: "Processing",
          description: "We're processing your booking",
        };
    }
  };

  const status = booking.bookingStatus || "pending";
  const statusConfig = getStatusConfig(status);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-gray-700 -ml-2 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Search
        </Button>
      </motion.div>

      <div className="space-y-6">
        {/* Status Badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-gray-900">Your Booking</h2>
            <Badge className={`${statusConfig.color} ml-2 flex items-center`}>
              {statusConfig.icon}
              <span className="ml-1">{statusConfig.title}</span>
            </Badge>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Ticket</span>
          </Button>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <span className="text-lg">
                      Booking #{booking.id.substring(0, 8)}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Created on{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-bold text-xl text-blue-600">
                    ${booking.totalPrice?.toFixed(2) || "8.00"}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5">
              <Tabs defaultValue="flight" className="w-full">
                <TabsList className="w-full grid grid-cols-3 mb-5">
                  <TabsTrigger value="flight">Flight Details</TabsTrigger>
                  <TabsTrigger value="passengers">Passengers</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                {/* Flight Details Tab */}
                <TabsContent value="flight">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Plane className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          {booking.flightType === "oneWay"
                            ? "One Way Flight"
                            : "Round Trip Flight"}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-5">
                        <div className="flex-1">
                          <p className="text-xs text-blue-600 font-medium mb-1">
                            FROM
                          </p>
                          <p className="font-bold text-gray-800">
                            {booking.departureCity.label}
                          </p>
                          {booking.departureCity.country && (
                            <p className="text-sm text-gray-500">
                              {booking.departureCity.country}
                            </p>
                          )}
                        </div>

                        <div className="hidden sm:block">
                          <div className="relative w-32 flex items-center">
                            <div className="h-px w-full bg-blue-200"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                animate={{
                                  x: ["-30%", "30%"],
                                  opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                <Plane className="h-4 w-4 text-blue-500" />
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-xs text-blue-600 font-medium mb-1">
                            TO
                          </p>
                          <p className="font-bold text-gray-800">
                            {booking.destinationCity.label}
                          </p>
                          {booking.destinationCity.country && (
                            <p className="text-sm text-gray-500">
                              {booking.destinationCity.country}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-xs text-gray-500">Departure</p>
                            <p className="font-medium">
                              {formatDate(booking.departureDate)}
                            </p>
                          </div>
                        </div>

                        {booking.returnDate && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-500">Return</p>
                              <p className="font-medium">
                                {formatDate(booking.returnDate)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Passengers Tab */}
                <TabsContent value="passengers">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {!booking.passengers || booking.passengers.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                        <User className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500">
                          No passenger information available
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {booking.passengers.map((passenger, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                              y: -3,
                              transition: { duration: 0.2 },
                            }}
                          >
                            <Card className="border border-gray-200 h-full overflow-hidden">
                              <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="bg-blue-100 p-1.5 rounded-full">
                                    <User className="h-4 w-4 text-blue-600" />
                                  </div>
                                  <p className="font-medium">
                                    Passenger {index + 1}
                                  </p>
                                </div>

                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                  {passenger.name}
                                </p>

                                <div className="flex items-center text-sm text-gray-600">
                                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                                  <span>
                                    Birth Date:{" "}
                                    {new Date(
                                      passenger.birthDate,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Email</p>
                        <p className="font-medium">{booking.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <Phone className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                        <p className="font-medium">
                          {booking.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <p className="text-xs text-amber-700 font-medium mb-1">
                          Special Notes
                        </p>
                        <p className="text-gray-700">{booking.notes}</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-between border-t p-4 bg-gray-50 gap-4">
              <p className="text-sm text-gray-600">
                {statusConfig.description}
              </p>
              <p className="text-sm font-medium text-gray-700">
                Transaction ID: {booking.transaction_id}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- Placeholder for ErrorDisplay component ---
const ErrorDisplay: React.FC<{ message: string; onBack: () => void }> = ({ message, onBack }) => {
 return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12 text-center"
    >
       <Card className="bg-red-50 border-red-200 max-w-md w-full">
         <CardHeader>
           <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-4">
             <XCircle className="h-8 w-8 text-red-600" />
           </div>
           <CardTitle className="text-red-700">Booking Not Found</CardTitle>
         </CardHeader>
         <CardContent>
           <p className="text-red-600 mb-4">{message}</p>
           <Button variant="outline" onClick={onBack}>
             <ArrowLeft className="mr-2 h-4 w-4" /> Try Again
           </Button>
         </CardContent>
       </Card>
    </motion.div>
 );
};


// Main container component
export default function ViewBookingContainer() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleSearch = async (code: string) => {
    setIsSearching(true);
    setError(null);
    setBooking(null);
    setShowDetails(false);

    try {
      const result = await findBookingAction(code);
      if (result.success && result.data) {
        setBooking(result.data);
        setShowDetails(true);
      } else {
        setError(result.error || "Booking not found or an error occurred.");
      }
    } catch (err) {
      setError("An unexpected error occurred while searching for the booking.");
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBack = () => {
    setShowDetails(false);
    setError(null);
    setBooking(null);
  };

  return (
    <AnimatePresence mode="wait">
      {showDetails && booking ? (
        <BookingDetails key="details" booking={booking} onBack={handleBack} />
      ) : error ? (
         <ErrorDisplay key="error" message={error} onBack={handleBack} />
      ) : (
        <FullScreenLookupForm
          key="search"
          onSearch={handleSearch}
          isSearching={isSearching}
        />
      )}
    </AnimatePresence>
  );
}
