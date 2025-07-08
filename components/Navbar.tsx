"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark/95 backdrop-blur-md shadow-xl border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-playfair font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <span>Nycayen</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-accent hover:text-primary"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="tel:+1-555-123-4567"
              className="flex items-center space-x-2 text-accent hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Call Now</span>
            </Link>
            <Link
              href="/booking"
              className="btn-primary flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-accent hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-dark/95 backdrop-blur-md border-t border-primary/20"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors py-2 ${
                      isActive(item.href)
                        ? "text-primary border-l-2 border-primary pl-4"
                        : "text-accent hover:text-primary hover:pl-4"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-4 mt-4 border-t border-primary/20 space-y-3">
                  <Link
                    href="tel:+1-555-123-4567"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 text-accent hover:text-primary transition-colors py-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-lg font-medium">Call Now</span>
                  </Link>
                  <Link
                    href="/booking"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}