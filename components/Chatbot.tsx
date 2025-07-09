"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Bot
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: string[];
}


export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatbotEnabled = process.env.NEXT_PUBLIC_CHATBOT_ENABLED === 'true';

  // Initial greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: "Hi! I'm Nycayen's virtual assistant. I'm here to help you with booking appointments, learning about our services, or answering any questions you might have. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: [
          "Book an appointment",
          "View services",
          "Contact information",
          "Business hours"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Actually need the full messages array to trigger properly

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Show unread indicator
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'bot') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(content.trim().toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies,
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay for realism
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const generateBotResponse = (userInput: string): { content: string; quickReplies?: string[] } => {
    // Simple keyword-based responses
    if (userInput.includes('book') || userInput.includes('appointment') || userInput.includes('schedule')) {
      return {
        content: "I'd be happy to help you book an appointment! You can book online through our booking system or call us directly. What type of service are you interested in?",
        quickReplies: [
          "Hair cutting & styling",
          "Hair coloring",
          "Special events",
          "Call to book"
        ]
      };
    }

    if (userInput.includes('service') || userInput.includes('price') || userInput.includes('cost')) {
      return {
        content: "We offer a variety of hair services including cuts, coloring, treatments, and special event styling. Our services start at $85 for cuts and $150 for color services. Would you like to know more about any specific service?",
        quickReplies: [
          "Hair cutting services",
          "Color services",
          "Hair treatments",
          "View all services"
        ]
      };
    }

    if (userInput.includes('hour') || userInput.includes('open') || userInput.includes('time')) {
      return {
        content: "Our business hours are:\n\n• Monday - Friday: 9:00 AM - 7:00 PM\n• Saturday: 9:00 AM - 6:00 PM\n• Sunday: 10:00 AM - 5:00 PM\n• Holidays: By Appointment\n\nWould you like to book an appointment?",
        quickReplies: [
          "Book now",
          "Call us",
          "More information"
        ]
      };
    }

    if (userInput.includes('contact') || userInput.includes('phone') || userInput.includes('address') || userInput.includes('location')) {
      return {
        content: "Here's how you can reach us:\n\n📞 Phone: " + (process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1 (555) 123-4567") + "\n📧 Email: " + (process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "info@nycayen.com") + "\n📍 Address: " + (process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "123 Beauty Street, City, State 12345") + "\n\nHow else can I help you?",
        quickReplies: [
          "Book appointment",
          "View services",
          "Visit our portfolio"
        ]
      };
    }

    if (userInput.includes('hair cutting') || userInput.includes('cut') || userInput.includes('styling')) {
      return {
        content: "Our signature hair cutting and styling service includes a personal consultation, professional wash & condition, precision cutting, and custom styling. Prices start at $85. Would you like to book a consultation?",
        quickReplies: [
          "Book consultation",
          "Learn more",
          "Other services"
        ]
      };
    }

    if (userInput.includes('color') || userInput.includes('balayage') || userInput.includes('highlight')) {
      return {
        content: "We specialize in color transformations including balayage, highlights, full color, and color corrections. Our expert colorists create stunning, natural-looking results. Color services start at $150. Interested in a color consultation?",
        quickReplies: [
          "Book color consultation",
          "View color portfolio",
          "Price information"
        ]
      };
    }

    if (userInput.includes('special') || userInput.includes('wedding') || userInput.includes('event') || userInput.includes('prom')) {
      return {
        content: "We love creating glamorous looks for special occasions! Our special event styling includes weddings, proms, parties, and other celebrations. Services start at $120 and include a trial run. Ready to look stunning for your special day?",
        quickReplies: [
          "Book trial session",
          "Wedding services",
          "View special event portfolio"
        ]
      };
    }

    if (userInput.includes('call') || userInput.includes('phone')) {
      return {
        content: "You can call us at " + (process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+1 (555) 123-4567") + ". We're available during our business hours Monday through Sunday. Our team will be happy to help you book an appointment or answer any questions!",
        quickReplies: [
          "Business hours",
          "Book online instead",
          "More questions"
        ]
      };
    }

    if (userInput.includes('thanks') || userInput.includes('thank you')) {
      return {
        content: "You're very welcome! I'm here whenever you need help. Is there anything else you'd like to know about our services?",
        quickReplies: [
          "View services",
          "Book appointment",
          "Contact information"
        ]
      };
    }

    // Default response
    return {
      content: "I'd be happy to help! I can assist you with booking appointments, learning about our services, getting contact information, or answering questions about our hours. What would you like to know?",
      quickReplies: [
        "Book an appointment",
        "View services", 
        "Contact information",
        "Business hours"
      ]
    };
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  if (!chatbotEnabled) {
    return null;
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 rounded-full shadow-lg flex items-center justify-center text-primary-foreground z-40 transition-all duration-200 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6" />
              {unreadCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-96 bg-dark/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-accent">Nycayen Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/10 text-accent'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <span className="text-xs opacity-75 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Quick Replies */}
                    {message.quickReplies && message.sender === 'bot' && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left text-xs p-2 bg-primary/20 hover:bg-primary/30 rounded text-accent transition-colors"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex space-x-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 bg-dark/50 border border-primary/20 rounded-lg text-accent placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-primary hover:bg-primary/90 disabled:bg-primary/50 rounded-lg flex items-center justify-center text-primary-foreground transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}