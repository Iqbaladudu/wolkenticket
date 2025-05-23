"use client";

import React, { useRef, useState } from "react"; // Import useState
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Calendar,
  CheckCircle,
  Plane,
  CreditCard,
  Mail,
  ArrowRight,
  Clock,
  ChevronRight,
  Settings2,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "search",
    title: "Find Your Destination",
    description: "Where Are You Applying for a Visa? ✈️",
    detailedDescription:
      "Select your departure and destination airports on our checkout page.",
    icon: <Search className="h-6 w-6 text-blue-600" aria-hidden="true" />, // Add aria-hidden
    gradient: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    accent: "bg-blue-600",
    time: "~2 mins",
    tip: "Verify Your Chosen Airports Before Proceeding",
  },
  {
    id: "date",
    title: "Choose Your Date",
    description: "Pick a date that suits your schedule from our calendar.",
    detailedDescription:
      "Select a suitable date and ensure you choose the correct date.",
    icon: <Calendar className="h-6 w-6 text-purple-600" aria-hidden="true" />, // Add aria-hidden
    gradient: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    accent: "bg-purple-600",
    time: "~1 min",
    tip: "Double-Check for Accuracy",
  },
  {
    id: "confirm",
    title: "Confirm Booking",
    description: "Review your details and secure your reservation instantly.",
    detailedDescription:
      "Double-check all information, customize any add-ons you might need, and finalize your reservation with our secure payment system.",
    icon: <CheckCircle className="h-6 w-6 text-emerald-600" aria-hidden="true" />, // Add aria-hidden
    gradient: "from-emerald-50 to-emerald-100",
    border: "border-emerald-200",
    accent: "bg-emerald-600",
    time: "~3 mins",
    tip: "Save your details for faster checkout next time",
  },
  {
    id: "receive",
    title: "Receive Your Ticket",
    description:
      "Get your verified flight reservation delivered to your email.",
    detailedDescription:
      "Within minutes, you'll receive a fully verified flight reservation in your inbox, ready to use for visa applications or travel planning.",
    icon: <Mail className="h-6 w-6 text-amber-600" aria-hidden="true" />, // Add aria-hidden
    gradient: "from-amber-50 to-amber-100",
    border: "border-amber-200",
    accent: "bg-amber-600",
    time: "Instant",
    tip: "Add our email to your contacts to avoid spam filters",
  },
];

export default function BookingInstructions() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedTab, setSelectedTab] = useState("search"); // Use useState

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const flowLineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
    },
  };

  const planeVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: "100%",
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        delay: 1,
        repeat: Infinity,
        repeatDelay: 5,
      },
    },
  };

  return (
    <section // Use section tag
      id="how-it-works" // Add ID for internal linking
      className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      ref={sectionRef}
      aria-labelledby="booking-instructions-heading" // Add aria-label
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-20 right-0 w-full h-32 flex items-center"
        >
          <motion.div
            variants={planeVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative z-10"
          >
            <Plane className="h-16 w-16 text-blue-500 transform -rotate-12" />
          </motion.div>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-full absolute"
            variants={flowLineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
        </motion.div>

        {/* Gradient orbs */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full filter blur-[100px] opacity-50" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-gradient-to-r from-emerald-100/40 to-blue-100/40 rounded-full filter blur-[100px] opacity-40" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-1 bg-white px-3 py-1 rounded-full mb-4 shadow-sm"
          >
            <Settings2 className="h-3.5 w-3.5 text-blue-600 mr-1 animate-spin-slow" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-800">
              Simple Process
            </span>
          </motion.div>

          <motion.h2 // Use h2 for section heading
            id="booking-instructions-heading" // ID for aria-labelledby
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            How to Book with WolkenTicket
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get your verified flight reservation in just a few simple steps. Our
            streamlined process ensures a hassle-free booking experience.
          </motion.p>
        </div>

        {/* Steps timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          {/* Process timeline visualization */}
          <div className="hidden md:flex justify-between items-center max-w-4xl mx-auto mb-12 px-8 relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 transform -translate-y-1/2"></div>

            {steps.map((step, i) => (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${step.accent} text-white shadow-md`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedTab(step.id)}
                >
                  {i + 1}
                </motion.div>
                <motion.span
                  className="text-xs font-medium mt-2 text-gray-700 whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2 }}
                >
                  {step.title}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Tabbed content for detailed view */}
          <Tabs
            defaultValue="search"
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="max-w-5xl mx-auto"
          >
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-8"> {/* Adjusted grid-cols for better small screen */}
              {steps.map((step) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-none flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2" // Adjusted padding and layout
                >
                  <span className="flex items-center">
                    {step.icon}
                  </span>
                  <span className="text-xs sm:text-sm">{step.title}</span> {/* Adjusted text size */}
                </TabsTrigger>
              ))}
            </TabsList>

            {steps.map((step) => (
              <TabsContent key={step.id} value={step.id} className="mt-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`border ${step.border} bg-gradient-to-br ${step.gradient} overflow-hidden`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>

                      <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          {/* Use h3 for step titles */}
                          <CardTitle as="h3" className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <div
                              className={`p-3 rounded-lg bg-white shadow-sm`}
                            >
                              {step.icon}
                            </div>
                            {step.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="bg-white/70 text-gray-700 font-normal gap-1 self-start sm:self-center" // Adjust alignment
                          >
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {step.time}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pb-8">
                        <p className="text-lg text-gray-700 mb-4">
                          {step.detailedDescription}
                        </p>

                        <div className="flex items-start gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-100">
                          <div className="bg-amber-50 p-1.5 rounded-full text-amber-600">
                             {/* Add an icon for the tip, e.g., Lightbulb */}
                             {/* <Lightbulb className="h-4 w-4" /> */}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Tip:</p>
                            <p className="text-sm text-gray-600">{step.tip}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white p-8 rounded-xl shadow-sm max-w-3xl mx-auto border border-gray-100">
             {/* Use h3 for subsection heading */}
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">
              Book your verified flight reservation in minutes and receive your
              ticket instantly.
            </p>
            <Button asChild className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300">
              {/* Link to checkout */}
              <a href="/checkout">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
