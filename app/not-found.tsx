"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Home, Calendar, Scissors, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const popularPages = [
    {
      title: "About Us",
      description: "Learn about our mission and team",
      href: "/about",
      icon: Scissors
    },
    {
      title: "Our Services",
      description: "Explore our hair styling services",
      href: "/services",
      icon: Scissors
    },
    {
      title: "Portfolio",
      description: "View our client transformations",
      href: "/portfolio",
      icon: Scissors
    },
    {
      title: "Book Appointment",
      description: "Schedule your next visit",
      href: "/booking",
      icon: Calendar
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      href: "/contact",
      icon: Phone
    },
    {
      title: "Shop",
      description: "Browse hair care products",
      href: "/shop",
      icon: Scissors
    }
  ];

  const helpfulLinks = [
    {
      title: "Call Us",
      description: "(555) 123-4567",
      href: "tel:+15551234567",
      icon: Phone
    },
    {
      title: "Email Us",
      description: "hello@nycayen.com",
      href: "mailto:hello@nycayen.com",
      icon: Mail
    },
    {
      title: "Book Online",
      description: "Schedule appointment",
      href: "/booking",
      icon: Calendar
    }
  ];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to services page with search query
      window.location.href = `/services?search=${encodeURIComponent(searchTerm)}`;
    }
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
            <motion.div
              variants={itemVariants}
              className="text-8xl md:text-9xl font-playfair font-bold text-primary/20 mb-4"
            >
              404
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-primary mb-6"
            >
              Page Not Found
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Oops! The page you&apos;re looking for seems to have gotten a new style. 
              Let&apos;s help you find what you need.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-2xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-6 text-center"
            >
              Search Our Site
            </motion.h2>
            
            <motion.form 
              variants={itemVariants}
              onSubmit={handleSearch}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for services, about us, contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-32 py-4 bg-card border border-border rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-dark px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Popular Pages */}
      <section className="py-16 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-12 text-center"
            >
              Popular Pages
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularPages.map((page, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group"
                >
                  <Link href={page.href} className="block">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <page.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-playfair font-bold text-primary group-hover:text-primary/80 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {page.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-dark">
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
              Need Help?
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {helpfulLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <a
                    href={link.href}
                    className="block bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <link.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {link.description}
                    </p>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-playfair font-bold text-primary mb-6">
                  Visit Our Salon
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-primary">Address:</strong><br />
                    123 Beauty Street<br />
                    Style City, SC 12345
                  </p>
                  <p>
                    <strong className="text-primary">Phone:</strong><br />
                    <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                      (555) 123-4567
                    </a>
                  </p>
                  <p>
                    <strong className="text-primary">Email:</strong><br />
                    <a href="mailto:hello@nycayen.com" className="hover:text-primary transition-colors">
                      hello@nycayen.com
                    </a>
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-playfair font-bold text-primary mb-6">
                  Business Hours
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Wednesday</span>
                    <span>9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thursday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="bg-primary/10 border border-primary/20 rounded-lg p-8"
            >
              <Scissors className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                Ready for a New Look?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don&apos;t let a wrong turn stop you from looking amazing. Book your appointment today 
                and let us transform your hair into a work of art.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="bg-primary text-dark px-8 py-4 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book Appointment
                </Link>
                <Link
                  href="/"
                  className="border border-primary text-primary px-8 py-4 rounded-lg font-medium hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}