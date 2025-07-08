"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ExternalLink } from "lucide-react";

interface BookingWidgetProps {
  preselectedService?: string;
  className?: string;
}

export function BookingWidget({ preselectedService, className = "" }: BookingWidgetProps) {
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);
  const [showFallbackForm, setShowFallbackForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preselectedService || "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_CALENDLY_URL;
    if (url) {
      setCalendlyUrl(url);
    } else {
      setShowFallbackForm(true);
    }
  }, []);

  const services = [
    "Signature Hair Cut & Style",
    "Color Transformation",
    "Keratin Hair Treatment",
    "Special Event Styling",
    "Balayage & Highlights",
    "Hair Extensions",
    "Consultation",
    "Other",
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "booking",
          ...formData,
        }),
      });

      if (response.ok) {
        alert("Booking request submitted successfully! We'll contact you soon to confirm your appointment.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: preselectedService || "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
      } else {
        alert("There was an error submitting your booking request. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("There was an error submitting your booking request. Please try again or call us directly.");
    }
  };

  const openCalendly = () => {
    if (calendlyUrl) {
      window.open(calendlyUrl, "_blank", "width=800,height=700");
    }
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-4">
          Book Your Appointment
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ready to transform your look? Schedule your personalized consultation and styling session with our expert team.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Booking Options */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Calendly Integration */}
          {calendlyUrl && !showFallbackForm && (
            <div className="card p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-accent">
                  Quick Online Booking
                </h4>
                <p className="text-muted-foreground">
                  Book instantly using our online calendar. Choose your preferred date and time.
                </p>
                <button
                  onClick={openCalendly}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Open Booking Calendar</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Fallback Contact Options */}
          <div className="card p-6">
            <h4 className="text-xl font-semibold text-accent mb-4">
              Other Ways to Book
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-accent">Call Us</p>
                  <a
                    href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567"}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1 (555) 123-4567"}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-medium text-accent">Email Us</p>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@nycayen.com"}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@nycayen.com"}
                  </a>
                </div>
              </div>

              <button
                onClick={() => setShowFallbackForm(true)}
                className="btn-outline w-full flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Fill Out Booking Form</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`card p-6 ${showFallbackForm ? "" : "lg:order-first"}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h4 className="text-xl font-semibold text-accent">
                Booking Request Form
              </h4>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-accent mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-accent mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-accent mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-accent mb-2">
                Desired Service *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-accent mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-accent mb-2">
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-accent mb-2">
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Tell us about your hair goals, any concerns, or special requests..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Submit Booking Request</span>
            </button>

            <p className="text-sm text-muted-foreground text-center">
              We'll contact you within 24 hours to confirm your appointment details.
            </p>
          </form>
        </motion.div>
      </div>

      {/* Business Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <div className="card p-6 max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-accent mb-4 flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Business Hours</span>
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="text-accent">9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="text-accent">9:00 AM - 6:00 PM</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-accent">10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Holidays</span>
                <span className="text-accent">By Appointment</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}