import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Chatbot } from "@/components/Chatbot";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nycayen | The Art of Hair - Empower Through Beauty",
    template: "%s | Nycayen",
  },
  description: "Empower Through Beauty—Boosting Confidence via Personalized Hair Styling. Transforming lives by enhancing natural beauty and building confidence through the art of hair.",
  keywords: ["hair styling", "beauty", "confidence", "personalized", "salon", "hair transformation"],
  authors: [{ name: "Nycayen" }],
  creator: "Nycayen",
  metadataBase: new URL("https://nycayen.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nycayen.com",
    title: "Nycayen | The Art of Hair - Empower Through Beauty",
    description: "Empower Through Beauty—Boosting Confidence via Personalized Hair Styling",
    siteName: "Nycayen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nycayen | The Art of Hair - Empower Through Beauty",
    description: "Empower Through Beauty—Boosting Confidence via Personalized Hair Styling",
    creator: "@nycayenmoore",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${poppins.variable} min-h-screen bg-dark text-accent font-poppins antialiased`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Chatbot />
      </body>
    </html>
  );
}