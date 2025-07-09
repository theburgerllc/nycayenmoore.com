# Nycayen.com - Hair Salon Website

A modern, responsive website for Nycayen Hair Salon built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

### ✨ **Complete Website**
- **About Page**: Mission, vision, values, and team information
- **Services Page**: Detailed service descriptions with pricing and filtering
- **Portfolio Page**: Client transformations with advanced filtering and modal views
- **Shop Page**: E-commerce integration with Shopify and cart functionality
- **Blog Page**: Article listing with pagination, search, and categories
- **Contact Page**: Enhanced contact form with map integration and FAQ
- **Booking Page**: Multi-step booking process with service selection
- **Privacy Policy**: GDPR-compliant privacy policy
- **Custom 404**: Branded error page with helpful navigation

### 🛠️ **Technical Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.x with strict type checking
- **Styling**: Tailwind CSS 3.x with custom Nycayen theme
- **Animations**: Framer Motion for smooth interactions
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography

### 🎨 **Design System**
- **Dark Vogue Aesthetic**: Elegant and professional design
- **Custom Brand Colors**: 
  - Primary: #BFA681 (Ambre gold)
  - Secondary: #5C5048 (Rich brown)
  - Accent: #FFF6E8 (Cream)
  - Dark: #181516 (Background)
- **Typography**: Playfair Display (headings) + Poppins (body)
- **Responsive Design**: Mobile-first approach

### 🔌 **Integrations**
- **Shopify**: E-commerce with cart management
- **Stripe**: Secure payment processing
- **SendGrid**: Email communications
- **Instagram**: Social media feed integration
- **Calendly**: Appointment scheduling
- **Google Analytics**: Website analytics (ready to configure)

### 🛡️ **Fallback Systems**
All external integrations include fallback systems with mock data, ensuring the website works perfectly even without API keys configured.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nycayenmoore.com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables (see [Environment Variables](#environment-variables) section).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_id

# Shopify Integration
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-shop.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token

# Stripe Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# SendGrid Email
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=hello@nycayen.com

# External Services
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-account
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_instagram_token
```

**Note**: The website works perfectly without these variables - fallback systems provide mock data for development and testing.

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── blog/              # Blog page
│   ├── booking/           # Booking page
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio page
│   ├── privacy-policy/    # Privacy policy page
│   ├── services/          # Services page
│   ├── shop/              # Shop page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # Custom 404 page
│   └── page.tsx           # Home page
├── components/            # Reusable React components
├── utils/                 # Utility functions & integrations
├── public/               # Static assets
└── ...config files
```

## 📄 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your site

The project includes a `vercel.json` configuration file optimized for performance and security.

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Configuration

### Tailwind Theme
Custom Nycayen brand colors and typography are configured in `tailwind.config.js`.

### Next.js Config
Image domains and experimental features are configured in `next.config.js`.

### TypeScript
Strict type checking is enabled in `tsconfig.json`.

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions

### Performance
- Static generation where possible
- Optimized images and lazy loading ready
- Minimal JavaScript bundles
- Fast page transitions

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

### SEO
- Meta tags and OpenGraph support
- Structured data ready
- Clean URLs
- Sitemap generation ready

## 🛡️ Security

- CSRF protection
- XSS prevention
- Secure headers
- Environment variable validation
- Input sanitization

## 📞 Support

For questions about this codebase, please contact:
- **Email**: developer@nycayen.com
- **Website**: [nycayen.com](https://nycayen.com)

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

**Built with ❤️ for Nycayen Hair Salon**

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>