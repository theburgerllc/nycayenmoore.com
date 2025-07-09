"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Calendar, 
  Clock, 
  User, 
  DollarSign,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Scissors,
  Palette,
  Sparkles,
  Heart,
  Crown,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  stylist: z.string().optional(),
  specialRequests: z.string().optional(),
  isNewClient: z.boolean(),
  consent: z.boolean().refine(val => val === true, "You must agree to our terms")
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface Service {
  id: string;
  name: string;
  description: string;
  price: { min: number; max?: number };
  duration: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
}

interface Stylist {
  id: string;
  name: string;
  title: string;
  experience: string;
  specialties: string[];
  image: string;
  rating: number;
  available: boolean;
}

export default function BookingPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      services: [],
      isNewClient: true
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setValue("services", selectedServices);
  }, [selectedServices, setValue]);

  useEffect(() => {
    setValue("stylist", selectedStylist);
  }, [selectedStylist, setValue]);

  const services: Service[] = [
    {
      id: "haircut-styling",
      name: "Haircut & Styling",
      description: "Professional cut and style tailored to your face shape",
      price: { min: 85, max: 150 },
      duration: "60-90 min",
      category: "styling",
      icon: Scissors,
      popular: true
    },
    {
      id: "color-highlights",
      name: "Color & Highlights",
      description: "Full color services including highlights and lowlights",
      price: { min: 120, max: 300 },
      duration: "2-4 hours",
      category: "coloring",
      icon: Palette,
      popular: true
    },
    {
      id: "balayage",
      name: "Balayage",
      description: "Hand-painted highlights for a natural, sun-kissed look",
      price: { min: 180, max: 280 },
      duration: "3-4 hours",
      category: "coloring",
      icon: Sparkles
    },
    {
      id: "deep-conditioning",
      name: "Deep Conditioning",
      description: "Intensive treatment to restore moisture and shine",
      price: { min: 45, max: 85 },
      duration: "45-60 min",
      category: "treatments",
      icon: Heart
    },
    {
      id: "wedding-special",
      name: "Wedding & Events",
      description: "Bridal and special occasion styling",
      price: { min: 150, max: 400 },
      duration: "1-3 hours",
      category: "special",
      icon: Crown,
      popular: true
    }
  ];

  const stylists: Stylist[] = [
    {
      id: "nycayen",
      name: "Nycayen Moore",
      title: "Master Stylist & Owner",
      experience: "5+ years",
      specialties: ["Balayage", "Color Correction", "Bridal Styling"],
      image: "/images/stylists/nycayen.jpg",
      rating: 4.9,
      available: true
    },
    {
      id: "assistant",
      name: "Any Available Stylist",
      title: "Professional Stylist",
      experience: "All levels",
      specialties: ["All Services"],
      image: "/images/stylists/team.jpg",
      rating: 4.8,
      available: true
    }
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
    "6:00 PM", "6:30 PM", "7:00 PM"
  ];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setValue("preferredDate", date);
    // Simulate loading available slots
    const mockSlots = timeSlots.filter(() => Math.random() > 0.3);
    setAvailableSlots(mockSlots);
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getTotalPrice = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service?.price.min || 0);
    }, 0);
  };

  const getTotalDuration = () => {
    const durations = selectedServices.map(serviceId => {
      const service = services.find(s => s.id === serviceId);
      return service?.duration || "0 min";
    });
    return durations.join(", ");
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          subject: "Booking Request",
          message: `Booking request for ${data.services.join(", ")} on ${data.preferredDate} at ${data.preferredTime}`,
          inquiryType: "booking"
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setCurrentStep(1);
        setSelectedServices([]);
        setSelectedStylist("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary mb-6"
            >
              Book Your Appointment
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Schedule your transformation with our expert stylists
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step <= currentStep ? "bg-primary text-dark" : "bg-muted text-muted-foreground"
                    }`}>
                      {step < currentStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-full h-1 mx-4 ${
                        step < currentStep ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className={`text-sm ${currentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                  Choose Services
                </div>
                <div className={`text-sm ${currentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                  Select Stylist
                </div>
                <div className={`text-sm ${currentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                  Pick Date & Time
                </div>
                <div className={`text-sm ${currentStep >= 4 ? "text-primary" : "text-muted-foreground"}`}>
                  Your Details
                </div>
              </div>
            </motion.div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-playfair font-bold text-primary mb-8 text-center">
                      Choose Your Services
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className={`border border-border rounded-lg p-6 cursor-pointer transition-all ${
                            selectedServices.includes(service.id)
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <service.icon className="w-8 h-8 text-primary flex-shrink-0" />
                            <div className="flex items-center gap-2">
                              {service.popular && (
                                <span className="bg-primary text-dark text-xs px-2 py-1 rounded-full font-medium">
                                  Popular
                                </span>
                              )}
                              <div className={`w-5 h-5 rounded border-2 transition-all ${
                                selectedServices.includes(service.id)
                                  ? "border-primary bg-primary"
                                  : "border-muted"
                              }`}>
                                {selectedServices.includes(service.id) && (
                                  <Check className="w-3 h-3 text-dark m-0.5" />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-playfair font-bold text-primary mb-2">
                            {service.name}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm mb-4">
                            {service.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1 text-primary">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-medium">
                                ${service.price.min}{service.price.max && `-$${service.price.max}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{service.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedServices.length > 0 && (
                      <div className="bg-card border border-border rounded-lg p-6">
                        <h3 className="font-playfair font-bold text-primary mb-4">
                          Selected Services Summary
                        </h3>
                        <div className="space-y-2 mb-4">
                          {selectedServices.map(serviceId => {
                            const service = services.find(s => s.id === serviceId);
                            return (
                              <div key={serviceId} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{service?.name}</span>
                                <span className="text-primary">${service?.price.min}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="border-t border-border pt-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total (starting from):</span>
                            <span className="text-xl font-bold text-primary">${getTotalPrice()}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Duration: {getTotalDuration()}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Stylist Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-playfair font-bold text-primary mb-8 text-center">
                      Choose Your Stylist
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {stylists.map((stylist) => (
                        <div
                          key={stylist.id}
                          className={`border border-border rounded-lg p-6 cursor-pointer transition-all ${
                            selectedStylist === stylist.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedStylist(stylist.id)}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                              <User className="w-8 h-8 text-muted-foreground" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-playfair font-bold text-primary">
                                  {stylist.name}
                                </h3>
                                <div className={`w-5 h-5 rounded border-2 transition-all ${
                                  selectedStylist === stylist.id
                                    ? "border-primary bg-primary"
                                    : "border-muted"
                                }`}>
                                  {selectedStylist === stylist.id && (
                                    <Check className="w-3 h-3 text-dark m-0.5" />
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-muted-foreground text-sm mb-2">
                                {stylist.title}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm mb-3">
                                <span className="text-muted-foreground">
                                  {stylist.experience}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-primary fill-primary" />
                                  <span className="text-primary">{stylist.rating}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {stylist.specialties.slice(0, 2).map((specialty) => (
                                  <span
                                    key={specialty}
                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                                {stylist.specialties.length > 2 && (
                                  <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-full">
                                    +{stylist.specialties.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Date & Time Selection */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-playfair font-bold text-primary mb-8 text-center">
                      Pick Date & Time
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-playfair font-bold text-primary mb-4">
                          Select Date
                        </h3>
                        <input
                          type="date"
                          {...register("preferredDate")}
                          onChange={(e) => handleDateChange(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent focus:outline-none focus:border-primary"
                        />
                        {errors.preferredDate && (
                          <p className="text-red-400 text-sm mt-1">{errors.preferredDate.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-playfair font-bold text-primary mb-4">
                          Available Times
                        </h3>
                        {selectedDate ? (
                          <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                            {availableSlots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setValue("preferredTime", time)}
                                className={`p-3 text-sm rounded-lg transition-all ${
                                  watch("preferredTime") === time
                                    ? "bg-primary text-dark"
                                    : "bg-card border border-border text-muted-foreground hover:border-primary/50"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-sm">
                            Please select a date first
                          </p>
                        )}
                        {errors.preferredTime && (
                          <p className="text-red-400 text-sm mt-1">{errors.preferredTime.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Personal Details */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h2 className="text-3xl font-playfair font-bold text-primary mb-8 text-center">
                      Your Details
                    </h2>
                    
                    {submitStatus === "success" && (
                      <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-400">Booking request sent successfully! We&apos;ll contact you soon to confirm.</span>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-400">Error sending booking request. Please try again or call us directly.</span>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          First Name *
                        </label>
                        <input
                          {...register("firstName")}
                          type="text"
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
                          placeholder="First name"
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Last Name *
                        </label>
                        <input
                          {...register("lastName")}
                          type="text"
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Email *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
                          placeholder="your@email.com"
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Phone *
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Special Requests
                      </label>
                      <textarea
                        {...register("specialRequests")}
                        rows={4}
                        className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                        placeholder="Any special requests or notes about your appointment..."
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        {...register("isNewClient")}
                        type="checkbox"
                        className="text-primary focus:ring-primary"
                      />
                      <label className="text-sm text-muted-foreground">
                        I am a new client
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        {...register("consent")}
                        type="checkbox"
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <label className="text-sm text-muted-foreground">
                        I agree to the <a href="/privacy-policy" className="text-primary hover:underline">terms and conditions</a> and consent to being contacted about my booking.
                      </label>
                    </div>
                    {errors.consent && (
                      <p className="text-red-400 text-sm mt-1">{errors.consent.message}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-card text-primary hover:bg-primary/10"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && selectedServices.length === 0) ||
                      (currentStep === 2 && !selectedStylist)
                    }
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      (currentStep === 1 && selectedServices.length === 0) ||
                      (currentStep === 2 && !selectedStylist)
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-dark hover:bg-primary/90"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-dark rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                    {isSubmitting ? "Submitting..." : "Book Appointment"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}