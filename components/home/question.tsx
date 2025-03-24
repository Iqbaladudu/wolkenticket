"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How do I book a flight with WolkenTicket?",
    answer:
      "Simply search for your flight, choose your dates, and confirm your booking—all in minutes! Our intuitive platform guides you every step of the way.",
  },
  {
    question: "Is my reservation verified instantly?",
    answer:
      "Yes! Once you complete the booking process, your reservation is verified instantly, and you’ll receive a confirmation email with all the details.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Absolutely. You can manage your booking through our portal. Cancellation and modification policies depend on the airline, but we’ll assist you throughout.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, bank transfers, and select digital wallets for a seamless payment experience.",
  },
];

export default function QnA() {
  return (
    <section className="py-20 bg-white text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 opacity-15"
          animate={{ y: [0, -15, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <HelpCircle className="h-10 w-10 text-blue-300" />
        </motion.div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full filter blur-[100px] opacity-10" />
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Frequently Asked Questions
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="flex items-center justify-between px-6 py-4 text-left text-gray-800 hover:bg-blue-50">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      <HelpCircle className="h-5 w-5 text-blue-500" />
                    </motion.div>
                    <span className="text-lg font-semibold">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 bg-white">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* Call to action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Still Have Questions? Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
