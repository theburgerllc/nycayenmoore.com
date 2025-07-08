declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer: Record<string, any>[];
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class AnalyticsClient {
  private trackingId: string | undefined;
  private isConfigured: boolean;
  private isDevelopment: boolean;

  constructor() {
    this.trackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
    this.isConfigured = !!this.trackingId;
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  public get configured(): boolean {
    return this.isConfigured;
  }

  public initialize(): void {
    if (!this.isConfigured || this.isDevelopment) {
      console.log('Analytics not configured or in development mode');
      return;
    }

    // Initialize Google Analytics
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.trackingId!, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  public trackPageView(url: string, title?: string): void {
    if (!this.isConfigured || this.isDevelopment) {
      console.log('Analytics page view:', { url, title });
      return;
    }

    window.gtag('config', this.trackingId!, {
      page_title: title || document.title,
      page_location: url,
    });
  }

  public trackEvent(event: AnalyticsEvent): void {
    if (!this.isConfigured || this.isDevelopment) {
      console.log('Analytics event:', event);
      return;
    }

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });
  }

  public trackBooking(service: string, value?: number): void {
    this.trackEvent({
      action: 'booking_initiated',
      category: 'engagement',
      label: service,
      value,
      custom_parameters: {
        service_type: service,
        currency: 'USD',
      },
    });
  }

  public trackPurchase(productId: string, value: number, currency: string = 'USD'): void {
    this.trackEvent({
      action: 'purchase',
      category: 'ecommerce',
      label: productId,
      value,
      custom_parameters: {
        currency,
        transaction_id: Date.now().toString(),
      },
    });
  }

  public trackFormSubmission(formName: string): void {
    this.trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
      custom_parameters: {
        form_name: formName,
      },
    });
  }

  public trackSocialInteraction(network: string, action: string): void {
    this.trackEvent({
      action: 'social_interaction',
      category: 'social',
      label: network,
      custom_parameters: {
        social_network: network,
        social_action: action,
      },
    });
  }

  public trackVideoPlay(videoTitle: string, duration?: number): void {
    this.trackEvent({
      action: 'video_play',
      category: 'engagement',
      label: videoTitle,
      value: duration,
      custom_parameters: {
        video_title: videoTitle,
        video_duration: duration,
      },
    });
  }

  public trackSearch(searchTerm: string): void {
    this.trackEvent({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
      custom_parameters: {
        search_term: searchTerm,
      },
    });
  }

  public trackOutboundLink(url: string, linkText?: string): void {
    this.trackEvent({
      action: 'click',
      category: 'outbound_link',
      label: url,
      custom_parameters: {
        outbound_url: url,
        link_text: linkText,
      },
    });
  }

  public trackFileDownload(fileName: string, fileType: string): void {
    this.trackEvent({
      action: 'file_download',
      category: 'engagement',
      label: fileName,
      custom_parameters: {
        file_name: fileName,
        file_type: fileType,
      },
    });
  }

  public setUserProperties(properties: Record<string, any>): void {
    if (!this.isConfigured || this.isDevelopment) {
      console.log('Analytics user properties:', properties);
      return;
    }

    window.gtag('set', this.trackingId!, properties);
  }

  public getTrackingId(): string | undefined {
    return this.trackingId;
  }
}

export const analyticsClient = new AnalyticsClient();