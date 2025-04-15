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

// Search form component with simplified animations
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
      className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-50 to-transparent opacity-70"></div>

      <div className="w-full max-w-md mx-auto text-center mb-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center mb-5">
            <div className="bg-blue-100 p-3 rounded-full">
              <TicketIcon className="h-7 w-7 text-blue-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Find Your Booking
          </h1>

          <p className="text-gray-600 mb-8">
            Enter your booking reference or transaction ID
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md border border-gray-100 p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="bookingCode"
                className="block text-sm font-medium text-gray-700 mb-2 text-left"
              >
                Booking ID or Transaction ID
              </label>
              <div className="relative">
                <Input
                  id="bookingCode"
                  placeholder="e.g., 123abc456def or TX1234567"
                  value={bookingCode}
                  onChange={(e) => setBookingCode(e.target.value)}
                  className="pl-10 h-12 text-base border-gray-200 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-left">
                Found in your confirmation email
              </p>
            </div>

            <Button
              type="submit"
              disabled={!bookingCode.trim() || isSearching}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base rounded-md transition-colors duration-300"
            >
              {isSearching ? (
                <motion.div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mr-2"
                  >
                    <Clock className="h-5 w-5" />
                  </motion.div>
                  Searching...
                </motion.div>
              ) : (
                "Find My Booking"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Simplified Booking Detail View with elegant animations
const BookingDetailView: React.FC<{
  booking: Booking;
  onBackToSearch: () => void;
}> = ({ booking, onBackToSearch }) => {
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
          onClick={onBackToSearch}
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

// Simplified no results view
const NoResultsView: React.FC<{
  searchCode: string;
  onBackToSearch: () => void;
}> = ({ searchCode, onBackToSearch }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full mx-auto text-center"
      >
        <Card className="shadow-md border-gray-100">
          <CardContent className="p-6 pt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-red-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5"
            >
              <AlertCircle className="h-8 w-8 text-red-600" />
            </motion.div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Booking Found
            </h3>

            <p className="text-gray-600 mb-5">
              We couldn&apos;t find any bookings matching &quot
              <span className="font-medium text-gray-800">{searchCode}</span>
              &quot;
            </p>

            <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200 mb-5">
              <p className="text-sm text-gray-600 mb-2">Please check that:</p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>You&apos;ve entered the correct ID</li>
                <li>Check your email for the reference number</li>
                <li>New bookings may take a moment to appear</li>
              </ul>
            </div>

            <Button
              onClick={onBackToSearch}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Try Another Search
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Main container component
const ViewBookingContainer: React.FC = () => {
  const [searchCode, setSearchCode] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [viewState, setViewState] = useState<
    "search" | "result" | "no-results"
  >("search");

  // Handle search submission
  const handleSearch = async (code: string) => {
    setIsSearching(true);
    setSearchCode(code);

    try {
      const result = await findBookingAction(code);
      if (result.totalDocs < 1) {
        setViewState("no-results");
      } else {
        setBooking(result.docs[0]);
        setViewState("result");
      }
    } catch (error) {
      setViewState("no-results");
    } finally {
      setIsSearching(false);
    }
  };

  // Back to search
  const handleBackToSearch = () => {
    setViewState("search");
    setBooking(null);
    setSearchCode("");
  };

  return (
    <div className="bg-white min-h-screen">
      <AnimatePresence mode="wait">
        {viewState === "search" && (
          <FullScreenLookupForm
            key="search-form"
            onSearch={handleSearch}
            isSearching={isSearching}
          />
        )}

        {viewState === "result" && booking && (
          <BookingDetailView
            key="booking-detail"
            booking={booking}
            onBackToSearch={handleBackToSearch}
          />
        )}

        {viewState === "no-results" && (
          <NoResultsView
            key="no-results"
            searchCode={searchCode}
            onBackToSearch={handleBackToSearch}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewBookingContainer;
