"use client";

import { useState, useRef, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageSquare,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import Script from 'next/script'; // Import Script for JSON-LD
import { Card, CardContent } from "../ui/card";

// Define types
interface FaqQuestion {
  question: string;
  answer: string;
  popular?: boolean;
  idx?: number; // For tracking position in original array
}

interface FaqCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  questions: FaqQuestion[];
}

interface SearchResult extends FaqQuestion {
  category: string;
  categoryLabel: string;
}

// Expanded FAQs organized by categories
const faqCategories: FaqCategory[] = [
  {
    id: "booking",
    label: "Booking",
    icon: <CheckCircle className="h-4 w-4" />,
    questions: [
      {
        question: "How do I book a flight with WolkenTicket?",
        answer:
          "Simply search for your flight, choose your dates, and confirm your booking—all in minutes! Our intuitive platform guides you every step of the way. You'll receive a confirmation email immediately after booking.",
        popular: true,
      },
      {
        question: "Is my reservation verified instantly?",
        answer:
          "Yes! Once you complete the booking process, your reservation is verified instantly with the airline, and you'll receive a confirmation email with all the details. Our verification process ensures your booking is recognized by immigration authorities for visa applications.",
        popular: true,
      },
      {
        question: "How far in advance should I book my ticket?",
        answer:
          "For optimal availability and pricing, we recommend booking at least 3-4 weeks before your intended travel date. However, our system can accommodate last-minute bookings as well, often processing them within minutes.",
      },
      {
        question: "Can I book for someone else?",
        answer:
          "Absolutely! You can book tickets for friends, family members, or colleagues. Just ensure you enter the correct passenger details during the booking process. You'll need their full name as it appears on their passport, date of birth, and contact information.",
      },
    ],
  },
  {
    id: "changes",
    label: "Changes & Cancellations",
    icon: <MessageCircle className="h-4 w-4" />,
    questions: [
      {
        question: "Can I cancel or modify my booking?",
        answer:
          "Please note that cancellations are not permitted after booking. However, modifications to your booking, such as changing the date or time of departure, are allowed. If you wish to make any changes, kindly contact us through our customer service for assistance.",
        popular: true,
      },
      {
        question: "What is your refund policy?",
        answer:
          "We do not offer refunds under any circumstances. All ticket purchases are final and non-refundable. Please ensure that you review your booking details carefully before completing your purchase, as no exceptions will be made for cancellations",
      },
      {
        question: "How do I change my travel dates?",
        answer:
          "To change your travel dates, please contact our customer service team for assistance. They will help with the process and any applicable fees or conditions. Reach us via Whatsapp or email",
      },
    ],
  },
  {
    id: "payment",
    label: "Payment & Security",
    icon: <ShieldCheck className="h-4 w-4" />,
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept credit/debit cards (Visa, Mastercard, American Express), bank transfer (manual), and PayPal for a seamless payment experience. All transactions are processed securely.",
        popular: true,
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, your payment information is secure. We use industry-standard encryption and comply with strict privacy policies to protect your data. Contact customer service for any concerns.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees! We believe in transparent pricing. The price you see during checkout includes all necessary taxes and fees.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: <MessageSquare className="h-4 w-4" />,
    questions: [
      {
        question: "How can I contact customer support?",
        answer:
          "Our customer support team is available 24/7 via live chat on our website, email at support@wolkenticket.com, or WhatsApp at +6281364791810. We typically respond to inquiries within 30 minutes to 2 hours at all times.",
      },
      {
        question: "What information do I need for visa applications?",
        answer:
          "Our flight reservations include all the information required for visa applications: complete itinerary with dates and flight numbers, PNR/booking reference, and airline confirmation. If your embassy requires any specific format or additional information, please contact our support team.",
      },
    ],
  },
];

// Process all questions for search functionality
const processQuestions = (): {
  allQuestions: SearchResult[];
  popularQuestions: SearchResult[];
} => {
  // Add index to questions for reference
  faqCategories.forEach((category) => {
    category.questions.forEach((q, idx) => {
      q.idx = idx;
    });
  });

  const allQuestions = faqCategories.flatMap((category) =>
    category.questions.map((q) => ({
      ...q,
      category: category.id,
      categoryLabel: category.label,
    })),
  );

  const popularQuestions = allQuestions.filter((q) => q.popular);

  return { allQuestions, popularQuestions };
};

const { allQuestions, popularQuestions } = processQuestions();

// Function to generate JSON-LD schema
const generateFaqSchema = (categories: FaqCategory[]) => {
  const mainEntity = categories.flatMap(category =>
    category.questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
};


export default function QnA() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("booking");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Generate JSON-LD schema data
  const faqSchema = useMemo(() => generateFaqSchema(faqCategories), [faqCategories]);


  // Filter logic
  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const lowerSearchTerm = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    faqCategories.forEach((category) => {
      category.questions.forEach((q, index) => {
        if (
          q.question.toLowerCase().includes(lowerSearchTerm) ||
          q.answer.toLowerCase().includes(lowerSearchTerm)
        ) {
          results.push({
            ...q,
            category: category.id,
            categoryLabel: category.label,
            idx: index, // Keep original index if needed
          });
        }
      });
    });
    return results;
  }, [searchTerm, faqCategories]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <>
      {/* Add JSON-LD Schema */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section // Use section tag
        id="faq" // Add ID for internal linking
        className="py-24 bg-white relative overflow-hidden"
        ref={sectionRef}
        aria-labelledby="faq-heading" // Add aria-label
      >
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full filter blur-[100px] opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-100/30 to-transparent rounded-full filter blur-[100px] opacity-30"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full mb-4 shadow-sm"
            >
              <HelpCircle className="h-3.5 w-3.5 text-blue-600 mr-1" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-700">
                Need Help?
              </span>
            </motion.div>

            <motion.h2 // Use h2 for section heading
              id="faq-heading" // ID for aria-labelledby
              className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Find answers to common questions about booking, payments, and our
              services.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            className="mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                aria-label="Search frequently asked questions"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Tabs and Accordion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {searchTerm.trim() ? (
                // Search Results View
                <motion.div
                  key="search-results"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Results for &quot;{searchTerm}&quot;</h3>
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q, index) => (
                      <motion.div key={`search-${index}`} variants={itemVariants}>
                        <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <Badge variant="secondary">{q.categoryLabel}</Badge>
                            </div>
                            <h4 className="font-medium text-gray-800 mb-1">{q.question}</h4>
                            <p className="text-sm text-gray-600">{q.answer}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  ) : (
                    <motion.p variants={itemVariants} className="text-gray-500 text-center py-8">
                      No questions found matching your search. Try different keywords or browse the categories below.
                    </motion.p>
                  )}
                </motion.div>
              ) : (
                // Tabbed View
                <motion.div
                  key="tabs-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                      {faqCategories.map((category) => (
                        <TabsTrigger
                          key={category.id}
                          value={category.id}
                          className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:shadow-none flex items-center gap-2"
                        >
                          {category.icon}
                          {category.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {faqCategories.map((category) => (
                      <TabsContent key={category.id} value={category.id} className="mt-0">
                        <Accordion type="single" collapsible className="w-full space-y-3">
                          {category.questions.map((q, index) => (
                            <AccordionItem
                              key={`${category.id}-${index}`}
                              value={`item-${index}`}
                              className="border border-gray-100 rounded-lg bg-white shadow-sm data-[state=open]:shadow-md transition-shadow"
                            >
                              <AccordionTrigger className="px-4 py-3 text-left font-medium hover:no-underline">
                                {q.question}
                                {q.popular && (
                                  <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">Popular</Badge>
                                )}
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4 pt-0 text-gray-600">
                                {q.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </TabsContent>
                    ))}
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Support Section */}
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Can&apos;t find an answer?</h3>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Our support team is ready to help you 24/7. Reach out via email or phone for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild className="group bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300">
                <a href="/contact">
                  Contact Support <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
              </Button>
              <div className="flex items-center gap-4 text-sm text-gray-700">
                <a href="mailto:support@wolkenticket.com" className="flex items-center gap-1 hover:text-blue-600">
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email Us
                </a>
                <a href="tel:+6281364791810" className="flex items-center gap-1 hover:text-blue-600">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
