"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle,
  AlertCircle,
  Instagram,
  Facebook,
  Twitter,
  Calendar,
  Star,
  Users,
  Award
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.enum(["general", "booking", "services", "products", "complaint", "compliment"]),
  preferredContact: z.enum(["email", "phone", "text"]),
  consent: z.boolean().refine(val => val === true, "You must agree to our privacy policy")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: "general",
      preferredContact: "email"
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const inquiryType = watch("inquiryType");

  const businessInfo = {
    name: "Nycayen Hair Salon",
    address: "123 Beauty Street, Style City, SC 12345",
    phone: "(555) 123-4567",
    email: "hello@nycayen.com",
    hours: {
      "Monday": "9:00 AM - 7:00 PM",
      "Tuesday": "9:00 AM - 7:00 PM", 
      "Wednesday": "9:00 AM - 7:00 PM",
      "Thursday": "9:00 AM - 8:00 PM",
      "Friday": "9:00 AM - 8:00 PM",
      "Saturday": "8:00 AM - 6:00 PM",
      "Sunday": "10:00 AM - 5:00 PM"
    },
    socialMedia: {
      instagram: "https://instagram.com/nycayenmoore",
      facebook: "https://facebook.com/nycayenmoore",
      twitter: "https://twitter.com/nycayenmoore"
    }
  };

  const faqs = [
    {
      question: "How far in advance should I book my appointment?",
      answer: "We recommend booking 2-3 weeks in advance, especially for weekend appointments and special events. However, we often have same-day availability for certain services."
    },
    {
      question: "What should I bring to my appointment?",
      answer: "Just bring yourself! We provide all the necessary tools and products. If you have specific products you'd like us to use, feel free to bring them along."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We require 24-hour notice for cancellations. Same-day cancellations may be subject to a fee. We understand emergencies happen, so please call us to discuss your situation."
    },
    {
      question: "Do you offer consultations?",
      answer: "Yes! We offer complimentary consultations for all new clients and major changes. This helps us understand your hair goals and create the perfect plan for you."
    },
    {
      question: "What hair care products do you recommend?",
      answer: "We carry and recommend professional-grade products that we use in our salon. Our stylists will provide personalized product recommendations based on your hair type and needs."
    },
    {
      question: "Do you offer wedding and special event services?",
      answer: "Absolutely! We specialize in bridal hair and special event styling. We offer trials, day-of services, and can accommodate bridal parties. Book well in advance for peak wedding season."
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Award, value: "5+", label: "Years Experience" }
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
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
              Contact Us
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              We'd love to hear from you. Get in touch with us today.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-8"
              >
                Send us a Message
              </motion.h2>

              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/20 border border-green-500/50 rounded-lg p-4 mb-6 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400">Message sent successfully! We'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400">Error sending message. Please try again or call us directly.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Name *
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

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
                </motion.div>

                <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
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

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      {...register("inquiryType")}
                      className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent focus:outline-none focus:border-primary"
                    >
                      <option value="general">General Question</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="services">Service Information</option>
                      <option value="products">Product Question</option>
                      <option value="complaint">Complaint</option>
                      <option value="compliment">Compliment</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Subject *
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
                    placeholder={
                      inquiryType === "booking" ? "Appointment Request" :
                      inquiryType === "services" ? "Service Question" :
                      "Message subject"
                    }
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full px-4 py-3 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary resize-none"
                    placeholder={
                      inquiryType === "booking" ? "Please let us know your preferred dates, times, and services..." :
                      inquiryType === "services" ? "What would you like to know about our services?" :
                      "Your message..."
                    }
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        {...register("preferredContact")}
                        type="radio"
                        value="email"
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-accent">Email</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        {...register("preferredContact")}
                        type="radio"
                        value="phone"
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-accent">Phone Call</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        {...register("preferredContact")}
                        type="radio"
                        value="text"
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-accent">Text</span>
                    </label>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="flex items-start gap-3">
                    <input
                      {...register("consent")}
                      type="checkbox"
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to the <a href="/privacy-policy" className="text-primary hover:underline">privacy policy</a> and consent to being contacted about my inquiry.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-red-400 text-sm mt-1">{errors.consent.message}</p>
                  )}
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-dark px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>

            {/* Business Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-8">
                  Visit Our Salon
                </h2>
                
                <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-primary mb-1">Address</h3>
                      <p className="text-muted-foreground">{businessInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-primary mb-1">Phone</h3>
                      <a href={`tel:${businessInfo.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-primary mb-1">Email</h3>
                      <a href={`mailto:${businessInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {businessInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium text-primary mb-3">Hours</h3>
                      <div className="space-y-1">
                        {Object.entries(businessInfo.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{day}</span>
                            <span className="text-accent">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-playfair font-bold text-primary mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href={businessInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
                  >
                    <Instagram className="w-6 h-6 text-primary" />
                  </a>
                  <a
                    href={businessInfo.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-primary" />
                  </a>
                  <a
                    href={businessInfo.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
                  >
                    <Twitter className="w-6 h-6 text-primary" />
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-playfair font-bold text-primary mb-2">
                    Ready to Book?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Schedule your appointment online or call us directly
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/booking"
                      className="bg-primary text-dark px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      Book Online
                    </a>
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-8 text-center"
            >
              Find Us
            </motion.h2>
            
            <motion.div 
              variants={itemVariants}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="aspect-video bg-muted/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">
                    Google Maps integration would be implemented here
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-12 text-center"
            >
              Frequently Asked Questions
            </motion.h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/10 transition-colors"
                  >
                    <span className="font-medium text-primary">{faq.question}</span>
                    <MessageCircle className={`w-5 h-5 text-primary transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}