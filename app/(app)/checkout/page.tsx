"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Plane, User, Users } from "lucide-react";
import { motion } from "framer-motion";

// Sample airport data (replace with API in production)
const airports = [
  { code: "CGK", city: "Jakarta" },
  { code: "SIN", city: "Singapore" },
  { code: "JFK", city: "New York" },
  { code: "LAX", city: "Los Angeles" },
  { code: "LHR", city: "London" },
  { code: "NRT", city: "Tokyo" },
];

export default function BookingFormPage() {
  const [formData, setFormData] = useState({
    departureCity: "",
    destinationCity: "",
    departureDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    // Add logic to process the booking (e.g., API call)
  };

  return (
    <section className="min-h-screen bg-white text-gray-900 flex items-center justify-center py-12 relative overflow-hidden">
      {/* Background decorative element */}
      <motion.div
        className="absolute top-10 left-10 opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plane className="h-12 w-12 text-blue-300" />
      </motion.div>

      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Book Your Dummy Ticket
        </motion.h1>

        {/* Booking Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 border border-gray-100"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Travel Details Section */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Travel Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <label
                htmlFor="departureCity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Departure City
              </label>
              <div className="relative">
                <Input
                  id="departureCity"
                  list="departureAirports"
                  placeholder="e.g., CGK - Jakarta"
                  value={formData.departureCity}
                  onChange={(e) =>
                    setFormData({ ...formData, departureCity: e.target.value })
                  }
                  className="pl-10"
                  required
                />
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <datalist id="departureAirports">
                  {airports.map((airport) => (
                    <option
                      key={airport.code}
                      value={`${airport.code} - ${airport.city}`}
                    />
                  ))}
                </datalist>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label
                htmlFor="destinationCity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Destination City
              </label>
              <div className="relative">
                <Input
                  id="destinationCity"
                  list="destinationAirports"
                  placeholder="e.g., SIN - Singapore"
                  value={formData.destinationCity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      destinationCity: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                />
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <datalist id="destinationAirports">
                  {airports.map((airport) => (
                    <option
                      key={airport.code}
                      value={`${airport.code} - ${airport.city}`}
                    />
                  ))}
                </datalist>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label
                htmlFor="departureDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Departure Date
              </label>
              <div className="relative">
                <Input
                  id="departureDate"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) =>
                    setFormData({ ...formData, departureDate: e.target.value })
                  }
                  className="pl-10"
                  required
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passengers
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div className="relative">
                  <Input
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={(e) =>
                      setFormData({ ...formData, adults: e.target.value })
                    }
                    placeholder="Adults"
                    className="pl-8"
                    required
                  />
                  <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={(e) =>
                      setFormData({ ...formData, children: e.target.value })
                    }
                    placeholder="Children"
                    className="pl-8"
                  />
                  <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    value={formData.infants}
                    onChange={(e) =>
                      setFormData({ ...formData, infants: e.target.value })
                    }
                    placeholder="Infants"
                    className="pl-8"
                  />
                  <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Personal Information Section */}
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="e.g., John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-10"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="e.g., +62 123 456 7890"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Button
              type="submit"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Book Now
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
