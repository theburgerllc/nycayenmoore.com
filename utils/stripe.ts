export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
}

export interface StripeCheckoutSession {
  id: string;
  url: string;
  status: string;
}

class StripeClient {
  private publishableKey: string | undefined;
  private secretKey: string | undefined;
  private isConfigured: boolean;

  constructor() {
    this.publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    this.secretKey = process.env.STRIPE_SECRET_KEY;
    this.isConfigured = !!(this.publishableKey && this.secretKey);
  }

  public get configured(): boolean {
    return this.isConfigured;
  }

  public async createCheckoutSession(
    items: { priceId: string; quantity: number }[],
    options: {
      successUrl: string;
      cancelUrl: string;
      customerEmail?: string;
      mode?: 'payment' | 'subscription';
    }
  ): Promise<StripeCheckoutSession | null> {
    if (!this.isConfigured) {
      console.warn('Stripe not configured - returning mock checkout session');
      return {
        id: 'mock_session_id',
        url: '/shop?checkout=mock',
        status: 'open',
      };
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          ...options,
        }),
      });

      if (!response.ok) {
        throw new Error(`Stripe API error: ${response.status}`);
      }

      const session = await response.json();
      return {
        id: session.id,
        url: session.url,
        status: session.status,
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return null;
    }
  }

  public async retrieveCheckoutSession(sessionId: string): Promise<StripeCheckoutSession | null> {
    if (!this.isConfigured) {
      return null;
    }

    try {
      const response = await fetch(`/api/stripe/checkout/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Stripe API error: ${response.status}`);
      }

      const session = await response.json();
      return {
        id: session.id,
        url: session.url,
        status: session.status,
      };
    } catch (error) {
      console.error('Error retrieving checkout session:', error);
      return null;
    }
  }

  public async createCustomerPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<{ url: string } | null> {
    if (!this.isConfigured) {
      return null;
    }

    try {
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`Stripe API error: ${response.status}`);
      }

      const session = await response.json();
      return { url: session.url };
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      return null;
    }
  }

  public getPublishableKey(): string | undefined {
    return this.publishableKey;
  }

  public formatPrice(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount / 100);
  }
}

export const stripeClient = new StripeClient();