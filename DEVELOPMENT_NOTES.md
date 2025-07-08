# Development Notes - Nycayen.com

## 🏗️ Architecture Overview

### Technology Stack
- **Framework:** Next.js 15.3.5 (App Router)
- **Language:** TypeScript 5.7.2
- **Styling:** Tailwind CSS 3.4.13 + Custom theme
- **Animations:** Framer Motion 11.14.4
- **Icons:** Lucide React 0.462.0
- **Forms:** React Hook Form 7.53.2 + Zod 3.23.8

### Project Structure
```
/app                 # Next.js App Router pages
  /api              # API routes
  /[pages]          # Individual page directories
  globals.css       # Global styles
  layout.tsx        # Root layout
  page.tsx          # Home page

/components         # Reusable React components
  *.tsx             # All 11 core components

/utils              # Utility functions & integrations
  analytics.ts      # Google Analytics client
  sendgrid.ts       # Email service client
  shopify.ts        # E-commerce client
  stripe.ts         # Payment processing client

/public/images      # Static assets (placeholder structure)
```

---

## 🎨 Design System

### Color Palette (Nycayen Brand)
```css
--primary: #BFA681      /* Ambre gold - main brand color */
--secondary: #5C5048    /* Rich brown - secondary actions */
--accent: #FFF6E8       /* Cream - text on dark backgrounds */
--dark: #181516         /* Main background */
```

### Typography
- **Headings:** Playfair Display (Google Fonts)
- **Body:** Poppins (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700

### Custom CSS Classes
```css
.btn-primary         /* Primary button styling */
.btn-secondary       /* Secondary button styling */
.btn-outline         /* Outline button styling */
.gradient-text       /* Gradient text effect */
.hero-bg            /* Hero section background */
.card               /* Card component base */
```

---

## 🧩 Component Architecture

### Component Naming Convention
- PascalCase for component names
- Descriptive, business-focused names
- No generic names (avoid Button, Card, etc.)

### Component Pattern
```typescript
interface ComponentProps {
  // Props with descriptive names
  // Optional props with default values
  // Conditional rendering props
}

export function ComponentName({ prop1, prop2 = defaultValue }: ComponentProps) {
  // State management
  // Effect hooks
  // Event handlers
  // Render logic with animations
}
```

### Key Components

#### 1. Navbar.tsx
- Sticky navigation with scroll effects
- Mobile hamburger menu with animations
- Active link highlighting with motion layout
- CTA buttons (call, booking)

#### 2. HeroSection.tsx
- Framer Motion staggered animations
- Instagram video placeholder integration
- Responsive grid layout
- Floating animated elements

#### 3. InstagramCarousel.tsx
- Real Instagram Basic Display API integration
- Fallback mock data system
- Swiper-like navigation
- Engagement metrics display

#### 4. Testimonials.tsx
- Auto-playing carousel (5s intervals)
- Pause on hover functionality
- Star rating system
- Client avatar generation

#### 5. ServicesList.tsx
- Category filtering system
- Service cards with pricing
- Booking CTAs with pre-filled service
- Feature lists and duration display

#### 6. BookingWidget.tsx
- Calendly popup integration
- Fallback contact form
- Business hours display
- Form validation with Zod

#### 7. PortfolioGrid.tsx
- Masonry/grid view toggle
- Category and search filtering
- Modal detail views
- Before/after image support

#### 8. BlogPreview.tsx
- Featured post highlighting
- Engagement metrics (views, comments)
- Tag system
- Grid/list layout options

#### 9. CookieBanner.tsx
- GDPR compliant
- Granular cookie preferences
- Local storage management
- Analytics consent integration

#### 10. Chatbot.tsx
- NLP-based response system
- Quick reply buttons
- Typing indicators
- Unread message counter

#### 11. Footer.tsx
- Multi-column responsive layout
- Social media integration
- Newsletter signup form
- Business contact information

---

## 🔌 Integration Systems

### Fallback Architecture
All external integrations have fallback systems that provide mock data when API keys are not configured, ensuring the site works in any environment.

### Shopify Integration (`utils/shopify.ts`)
```typescript
class ShopifyClient {
  public get configured(): boolean // Check if API keys exist
  public async getProducts(): Promise<ShopifyProduct[]> // With fallback
  public async createCart(): Promise<ShopifyCart | null> // With fallback
  public async addToCart(): Promise<ShopifyCart | null> // With fallback
}
```

### Stripe Integration (`utils/stripe.ts`)
```typescript
class StripeClient {
  public get configured(): boolean // Check if API keys exist
  public async createCheckoutSession(): Promise<StripeCheckoutSession | null>
  public formatPrice(amount: number, currency: string): string
}
```

### SendGrid Integration (`utils/sendgrid.ts`)
```typescript
class SendGridClient {
  public get configured(): boolean // Check if API keys exist
  public async sendContactForm(data: ContactFormData): Promise<EmailResponse>
  public async sendBookingConfirmation(data: ContactFormData): Promise<EmailResponse>
  public async sendWelcomeEmail(email: string, name: string): Promise<EmailResponse>
}
```

### Analytics Integration (`utils/analytics.ts`)
```typescript
class AnalyticsClient {
  public get configured(): boolean // Check if tracking ID exists
  public initialize(): void // Initialize GA4
  public trackPageView(url: string, title?: string): void
  public trackEvent(event: AnalyticsEvent): void
  public trackBooking(service: string, value?: number): void
}
```

---

## 🛠️ Development Patterns

### State Management
- React useState for component-level state
- No global state management (Redux/Zustand) implemented yet
- LocalStorage for user preferences (cookies, chat history)

### Error Handling
- Try-catch blocks in all async operations
- Graceful fallbacks to mock data
- User-friendly error messages
- Console logging for debugging

### Performance Optimizations
- Dynamic imports for large components
- Image optimization ready (Next.js Image component)
- Lazy loading for off-screen content
- Memoization for expensive calculations

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management in modals

---

## 🔧 Configuration Files

### next.config.js
- Image domain allowlists (Instagram, Shopify)
- External package configuration
- Experimental features (optimizeCss)

### tailwind.config.js
- Custom color palette
- Font family configuration
- Animation utilities
- Plugin integrations

### tsconfig.json
- Strict TypeScript configuration
- Path aliases (@/* for root imports)
- Next.js specific settings

---

## 🚨 Important Notes for Next Session

### Component Dependencies
- All components use Framer Motion for animations
- Lucide React for consistent iconography
- Tailwind classes for styling (avoid inline styles)

### API Route Structure
- Follow Next.js 15 App Router conventions
- Use NextRequest/NextResponse types
- Implement proper error handling
- Return consistent JSON responses

### Environment Variables
- All external service credentials in .env.example
- Use NEXT_PUBLIC_ prefix for client-side variables
- Implement feature flags for integrations

### Code Style
- Use TypeScript interfaces for all props
- Prefer const assertions over enums
- Use optional chaining (?.) extensively
- Destructure props in function parameters

### Testing Considerations
- Components designed for easy testing
- Props interfaces make mocking simple
- Fallback systems allow testing without external services
- Clear component boundaries for unit testing

---

## 🐛 Known Technical Debt

### Immediate Fixes Needed
1. **ESLint Configuration** - Update to Next.js 15 format
2. **Build Warnings** - critters module issue needs resolution
3. **Type Definitions** - Some `any` types need proper interfaces

### Future Improvements
1. **Component Library** - Integrate shadcn/ui for enhanced components
2. **State Management** - Consider Zustand for complex state
3. **Image Assets** - Replace placeholder images with real assets
4. **CMS Integration** - Consider Sanity/Strapi for content management
5. **Testing** - Comprehensive test suite implementation

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Production build
npm run start           # Start production server
npm run type-check      # TypeScript check without emit
npm run lint            # ESLint check

# Git workflow
git status              # Check current changes
git add .              # Stage all changes  
git commit -m "message" # Commit with message
git push               # Push to remote

# Component Development
# Use this pattern for new components:
# 1. Create in /components/ComponentName.tsx
# 2. Import in page where needed
# 3. Add to exports if reusable
# 4. Update TypeScript types
# 5. Test responsive design
```

This architecture provides a solid foundation for continued development while maintaining code quality and scalability.