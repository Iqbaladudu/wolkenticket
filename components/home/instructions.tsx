"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Plane, Search } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Search Your Flight",
    description:
      "Enter your destination and travel dates to find the perfect flight.",
    icon: <Search className="h-8 w-8 text-blue-500" />,
    gradient: "from-blue-100 to-blue-200",
  },
  {
    title: "Choose Your Date",
    description: "Pick a date that suits your schedule from our calendar.",
    icon: <Calendar className="h-8 w-8 text-purple-500" />,
    gradient: "from-purple-100 to-purple-200",
  },
  {
    title: "Confirm Booking",
    description: "Review your details and secure your reservation instantly.",
    icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    gradient: "from-green-100 to-green-200",
  },
];

export default function BookingInstructions() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-20 opacity-10"
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Plane className="h-16 w-16 text-blue-300" />
        </motion.div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-[128px] opacity-20" />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-gray-900 text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          How to Book with WolkenTicket
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.3,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card
                className={`bg-gradient-to-br ${step.gradient} border-none shadow-md transform transition-all duration-300 hover:shadow-xl`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {index + 1}. {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Start Booking Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
