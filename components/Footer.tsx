import Link from "next/link";
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, Calendar } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Hair Cutting & Styling", href: "/services#cutting" },
    { name: "Hair Coloring", href: "/services#coloring" },
    { name: "Hair Treatments", href: "/services#treatments" },
    { name: "Special Occasions", href: "/services#special" },
    { name: "Consultations", href: "/services#consultation" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Book Appointment", href: "/booking" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/privacy-policy#cookies" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/nycayenmoore",
      icon: Instagram,
    },
    {
      name: "Facebook",
      href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/nycayen",
      icon: Facebook,
    },
    {
      name: "Twitter",
      href: process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/nycayen",
      icon: Twitter,
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-dark to-muted/20 border-t border-primary/20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-playfair font-bold text-primary mb-2">
                Nycayen
              </h3>
              <p className="text-sm text-primary/80 font-medium mb-4">
                The Art of Hair
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Empower Through Beauty—Boosting Confidence via Personalized Hair Styling.
                Transforming lives by enhancing natural beauty and building confidence.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary hover:text-accent transition-all duration-200 hover:scale-110"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-accent mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-accent mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-accent mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "123 Beauty Street, City, State 12345"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <Link
                  href={`tel:${process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1-555-123-4567"}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1 (555) 123-4567"}
                </Link>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <Link
                  href={`mailto:${process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@nycayen.com"}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@nycayen.com"}
                </Link>
              </div>
              
              <div className="pt-4">
                <Link
                  href="/booking"
                  className="btn-primary w-full flex items-center justify-center space-x-2 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary/5 rounded-xl p-8 mb-12">
          <div className="text-center">
            <h4 className="text-xl font-playfair font-bold text-primary mb-2">
              Stay Beautiful
            </h4>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest hair trends, tips, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/20 bg-dark/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Nycayen. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}