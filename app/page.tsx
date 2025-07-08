import { HeroSection } from "@/components/HeroSection";
import { InstagramCarousel } from "@/components/InstagramCarousel";
import { Testimonials } from "@/components/Testimonials";
import { ServicesList } from "@/components/ServicesList";
import { BookingWidget } from "@/components/BookingWidget";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { BlogPreview } from "@/components/BlogPreview";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Follow Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest transformations and behind-the-scenes moments from our salon
            </p>
          </div>
          <InstagramCarousel />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our range of personalized hair styling services designed to enhance your natural beauty
            </p>
          </div>
          <ServicesList />
        </div>
      </section>

      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Client Testimonials
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from our satisfied clients about their transformative experiences
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our stunning client transformations and artistic creations
            </p>
          </div>
          <PortfolioGrid limit={6} />
        </div>
      </section>

      <section className="py-20 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Ready to Transform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Book your appointment today and let us help you discover your perfect look
            </p>
          </div>
          <BookingWidget />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-dark to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest hair trends, tips, and beauty insights
            </p>
          </div>
          <BlogPreview />
        </div>
      </section>
    </div>
  );
}