"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/navbar";
import Footer from "@/components/ui/footer";
import DynamicContactForm from "@/components/contact/dynamicContactForm";

export default function Page() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 70,
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Reset form after submission
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <section
        className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900 relative overflow-hidden"
        ref={sectionRef}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full filter blur-[80px] md:blur-[100px] opacity-30" />
          <div className="absolute -bottom-20 -left-20 w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-gradient-to-r from-amber-100/30 to-blue-100/30 rounded-full filter blur-[80px] md:blur-[100px] opacity-30" />
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full mb-4 sm:mb-6 shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-700">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Contact Us
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have questions or need assistance? Our team is here to help you
              with any inquiries about bookings, payments, or travel plans.
            </motion.p>
          </div>

          {/* Contact Information and Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="bg-white shadow-lg border-none rounded-xl overflow-hidden h-full">
                <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Reach Out to Us
                    </h3>
                    <p className="text-gray-600">
                      We’re available 24/7 to assist with your travel needs.
                      Contact us through any of the methods below.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Email</h4>
                        <p className="text-gray-600">
                          <a
                            href="mailto:support@wolkenticket.com"
                            className="hover:text-blue-600 transition-colors"
                          >
                            support@wolkenticket.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Phone</h4>
                        <p className="text-gray-600">
                          <a
                            href="tel:+18001234567"
                            className="hover:text-blue-600 transition-colors"
                          >
                            +6281364791810
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Badge className="bg-blue-100 text-blue-700">
                      24/7 Support Available
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <DynamicContactForm variants={itemVariants} />
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
