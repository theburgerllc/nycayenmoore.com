"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Cookie, Mail, Phone, Calendar, FileText, Users, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal Information: We collect personal information that you provide to us, including:",
        "• Name, email address, and phone number",
        "• Appointment preferences and service history",
        "• Payment information (processed securely by third-party providers)",
        "• Communication preferences and special requests",
        "",
        "Automatically Collected Information:",
        "• Website usage data and analytics",
        "• Device information and IP addresses",
        "• Cookies and similar tracking technologies",
        "• Location data (if you permit it)"
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "We use your information to:",
        "• Provide and improve our hair styling services",
        "• Schedule and manage appointments",
        "• Process payments and handle transactions",
        "• Send appointment reminders and confirmations",
        "• Communicate about promotions and new services",
        "• Analyze website usage and improve user experience",
        "• Comply with legal obligations",
        "",
        "We will never sell your personal information to third parties."
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Lock,
      content: [
        "We may share your information with:",
        "",
        "Service Providers:",
        "• Payment processors (Stripe) for secure transactions",
        "• Email service providers (SendGrid) for communications",
        "• Analytics providers (Google Analytics) for website insights",
        "• Booking platforms (Calendly) for appointment scheduling",
        "",
        "Legal Requirements:",
        "• When required by law or to protect our rights",
        "• To prevent fraud or illegal activities",
        "• In connection with legal proceedings",
        "",
        "We ensure all third-party providers maintain appropriate security measures."
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: Calendar,
      content: [
        "We retain your information for as long as necessary to:",
        "• Provide ongoing services and support",
        "• Comply with legal obligations",
        "• Resolve disputes and enforce agreements",
        "",
        "Specific retention periods:",
        "• Account information: Until account deletion",
        "• Service history: 3 years for business records",
        "• Payment information: As required by financial regulations",
        "• Marketing communications: Until you unsubscribe",
        "",
        "You can request deletion of your data at any time."
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: Cookie,
      content: [
        "We use cookies and similar technologies to:",
        "• Remember your preferences and settings",
        "• Analyze website traffic and user behavior",
        "• Provide personalized content and recommendations",
        "• Enable essential website functionality",
        "",
        "Types of cookies we use:",
        "• Essential cookies: Required for basic website functionality",
        "• Analytics cookies: Help us understand how you use our site",
        "• Marketing cookies: Used to show relevant advertisements",
        "",
        "You can manage cookie preferences through our cookie banner or your browser settings."
      ]
    },
    {
      id: "your-rights",
      title: "Your Rights (GDPR)",
      icon: Shield,
      content: [
        "Under GDPR, you have the right to:",
        "",
        "Access: Request a copy of your personal data",
        "Rectification: Correct inaccurate or incomplete data",
        "Erasure: Request deletion of your data ('right to be forgotten')",
        "Portability: Receive your data in a structured format",
        "Restriction: Limit how we process your data",
        "Objection: Object to processing for direct marketing",
        "",
        "To exercise these rights, contact us at hello@nycayen.com or call (555) 123-4567.",
        "",
        "We will respond to your request within 30 days."
      ]
    },
    {
      id: "security",
      title: "Data Security",
      icon: Lock,
      content: [
        "We implement appropriate security measures to protect your information:",
        "",
        "Technical Measures:",
        "• SSL encryption for data transmission",
        "• Secure servers and databases",
        "• Regular security updates and patches",
        "• Access controls and authentication",
        "",
        "Organizational Measures:",
        "• Staff training on data protection",
        "• Regular security audits and assessments",
        "• Incident response procedures",
        "• Third-party security certifications",
        "",
        "While we strive to protect your data, no method of transmission over the internet is 100% secure."
      ]
    },
    {
      id: "marketing",
      title: "Marketing Communications",
      icon: Mail,
      content: [
        "We may send you marketing communications about:",
        "• New services and special offers",
        "• Hair care tips and trends",
        "• Appointment reminders and follow-ups",
        "• Seasonal promotions and events",
        "",
        "You can opt out of marketing communications:",
        "• Click 'unsubscribe' in any marketing email",
        "• Contact us directly at hello@nycayen.com",
        "• Update your preferences in your account settings",
        "",
        "We will always respect your communication preferences."
      ]
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      icon: Users,
      content: [
        "Our website integrates with third-party services:",
        "",
        "Instagram: For displaying our portfolio and social media content",
        "Shopify: For e-commerce functionality and product sales",
        "Stripe: For secure payment processing",
        "SendGrid: For email communications",
        "Google Analytics: For website analytics and insights",
        "Calendly: For appointment scheduling",
        "",
        "These services have their own privacy policies and terms of service.",
        "We encourage you to review their policies before using these services."
      ]
    },
    {
      id: "children",
      title: "Children's Privacy",
      icon: Shield,
      content: [
        "Our services are not intended for children under 16 years of age.",
        "",
        "We do not knowingly collect personal information from children under 16.",
        "If we learn that we have collected personal information from a child under 16,",
        "we will delete that information as quickly as possible.",
        "",
        "If you believe we have collected information from a child under 16,",
        "please contact us immediately at hello@nycayen.com.",
        "",
        "Parents and guardians may schedule appointments for minors,",
        "and we will collect information only as necessary for service provision."
      ]
    },
    {
      id: "changes",
      title: "Policy Changes",
      icon: FileText,
      content: [
        "We may update this privacy policy from time to time to:",
        "• Reflect changes in our practices",
        "• Comply with new legal requirements",
        "• Improve clarity and transparency",
        "",
        "When we make significant changes:",
        "• We will notify you by email",
        "• We will post a notice on our website",
        "• We will update the 'last updated' date",
        "",
        "Continued use of our services after changes indicates acceptance of the updated policy."
      ]
    },
    {
      id: "contact",
      title: "Contact Information",
      icon: Phone,
      content: [
        "For questions about this privacy policy or our data practices, contact us:",
        "",
        "Email: hello@nycayen.com",
        "Phone: (555) 123-4567",
        "Address: 123 Beauty Street, Style City, SC 12345",
        "",
        "Data Protection Officer:",
        "Email: privacy@nycayen.com",
        "",
        "You can also contact us through our website contact form or visit our salon during business hours.",
        "",
        "We will respond to your inquiry within 2 business days."
      ]
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
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Shield className="w-10 h-10 text-primary" />
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-primary mb-6"
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              Your privacy is important to us. Learn how we protect and handle your personal information.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-1 bg-primary mx-auto mb-8"
            />
            <motion.div 
              variants={itemVariants}
              className="text-sm text-muted-foreground"
            >
              Last updated: March 1, 2024
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-card border border-border rounded-lg p-8 mb-12"
            >
              <h2 className="text-2xl font-playfair font-bold text-primary mb-6">
                Overview
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  At Nycayen Hair Salon, we are committed to protecting your privacy and ensuring the security 
                  of your personal information. This privacy policy explains how we collect, use, and protect 
                  your data when you visit our website or use our services.
                </p>
                <p>
                  We comply with the General Data Protection Regulation (GDPR) and other applicable privacy laws. 
                  This policy applies to all personal information we collect through our website, in-person 
                  services, and communications.
                </p>
                <p>
                  By using our services, you agree to the collection and use of information in accordance 
                  with this policy. If you have any questions, please contact us at hello@nycayen.com.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-lg p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-playfair font-bold text-primary">
                      {section.title}
                    </h2>
                  </div>
                  
                  <div className="space-y-3 text-muted-foreground leading-relaxed">
                    {section.content.map((paragraph, pIndex) => (
                      <div key={pIndex}>
                        {paragraph === "" ? (
                          <div className="h-4"></div>
                        ) : paragraph.startsWith("•") ? (
                          <div className="ml-4 flex items-start gap-2">
                            <span className="text-primary mt-2">•</span>
                            <span>{paragraph.substring(2)}</span>
                          </div>
                        ) : paragraph.endsWith(":") ? (
                          <h3 className="font-semibold text-primary mt-4 mb-2">
                            {paragraph}
                          </h3>
                        ) : (
                          <p>{paragraph}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
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
              className="text-3xl font-playfair font-bold text-primary mb-8 text-center"
            >
              Quick Links
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-playfair font-bold text-primary">
                      Data Request
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Request a copy of your personal data or ask for its deletion.
                  </p>
                  <a
                    href="mailto:hello@nycayen.com?subject=Data Request"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Contact Us →
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Cookie className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-playfair font-bold text-primary">
                      Cookie Settings
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Manage your cookie preferences and tracking settings.
                  </p>
                  <button
                    onClick={() => {
                      // This would trigger the cookie banner
                      window.location.reload();
                    }}
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Manage Cookies →
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-playfair font-bold text-primary">
                      Terms of Service
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Read our terms and conditions for using our services.
                  </p>
                  <a
                    href="/terms"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Read Terms →
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Phone className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-playfair font-bold text-primary">
                      Contact Support
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Have questions about our privacy practices? Get in touch.
                  </p>
                  <a
                    href="/contact"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Contact Us →
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="bg-primary/10 border border-primary/20 rounded-lg p-8"
            >
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-playfair font-bold text-primary mb-4">
                Your Privacy Matters
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We are committed to protecting your privacy and being transparent about our data practices. 
                If you have any questions or concerns, please don&apos;t hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-primary text-dark px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="/booking"
                  className="border border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/10 transition-colors"
                >
                  Book Appointment
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}