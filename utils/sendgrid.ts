export interface EmailTemplate {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, any>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

class SendGridClient {
  private apiKey: string | undefined;
  private fromEmail: string | undefined;
  private isConfigured: boolean;

  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY;
    this.fromEmail = process.env.SENDGRID_FROM_EMAIL;
    this.isConfigured = !!(this.apiKey && this.fromEmail);
  }

  public get configured(): boolean {
    return this.isConfigured;
  }

  public async sendEmail(template: EmailTemplate): Promise<EmailResponse> {
    if (!this.isConfigured) {
      console.warn('SendGrid not configured - simulating email send');
      return {
        success: true,
        message: 'Email simulated (SendGrid not configured)',
        messageId: 'mock_message_id',
      };
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(template),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send email');
      }

      return {
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send email',
      };
    }
  }

  public async sendContactForm(data: ContactFormData): Promise<EmailResponse> {
    const template: EmailTemplate = {
      to: this.fromEmail || 'noreply@nycayen.com',
      from: this.fromEmail || 'noreply@nycayen.com',
      subject: `New Contact Form Submission from ${data.name}`,
      html: this.generateContactFormHTML(data),
      text: this.generateContactFormText(data),
    };

    return this.sendEmail(template);
  }

  public async sendBookingConfirmation(data: ContactFormData): Promise<EmailResponse> {
    const template: EmailTemplate = {
      to: data.email,
      from: this.fromEmail || 'noreply@nycayen.com',
      subject: 'Booking Confirmation - Nycayen',
      html: this.generateBookingConfirmationHTML(data),
      text: this.generateBookingConfirmationText(data),
    };

    return this.sendEmail(template);
  }

  public async sendWelcomeEmail(email: string, name: string): Promise<EmailResponse> {
    const template: EmailTemplate = {
      to: email,
      from: this.fromEmail || 'noreply@nycayen.com',
      subject: 'Welcome to Nycayen - The Art of Hair',
      html: this.generateWelcomeHTML(name),
      text: this.generateWelcomeText(name),
    };

    return this.sendEmail(template);
  }

  private generateContactFormHTML(data: ContactFormData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #BFA681; text-align: center;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #5C5048; margin-bottom: 15px;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
          ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ''}
          ${data.preferredTime ? `<p><strong>Preferred Time:</strong> ${data.preferredTime}</p>` : ''}
        </div>
        
        <div style="background-color: #FFF6E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #5C5048; margin-bottom: 15px;">Message</h3>
          <p style="line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from the contact form on nycayen.com
          </p>
        </div>
      </div>
    `;
  }

  private generateContactFormText(data: ContactFormData): string {
    return `
New Contact Form Submission

Contact Information:
Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.service ? `Service: ${data.service}` : ''}
${data.preferredDate ? `Preferred Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Preferred Time: ${data.preferredTime}` : ''}

Message:
${data.message}

This email was sent from the contact form on nycayen.com
    `.trim();
  }

  private generateBookingConfirmationHTML(data: ContactFormData): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #BFA681; font-size: 28px; margin-bottom: 10px;">Nycayen</h1>
          <p style="color: #5C5048; font-size: 16px;">The Art of Hair</p>
        </div>
        
        <h2 style="color: #BFA681; text-align: center;">Booking Confirmation</h2>
        
        <p>Dear ${data.name},</p>
        
        <p>Thank you for your interest in our services! We have received your booking request and will contact you shortly to confirm your appointment.</p>
        
        <div style="background-color: #FFF6E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #5C5048; margin-bottom: 15px;">Your Request Details</h3>
          ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
          ${data.preferredDate ? `<p><strong>Preferred Date:</strong> ${data.preferredDate}</p>` : ''}
          ${data.preferredTime ? `<p><strong>Preferred Time:</strong> ${data.preferredTime}</p>` : ''}
          <p><strong>Message:</strong> ${data.message}</p>
        </div>
        
        <p>Our team will review your request and get back to you within 24 hours to confirm your appointment details.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #5C5048; font-style: italic;">
            "Empower Through Beauty—Boosting Confidence via Personalized Hair Styling"
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Follow us on Instagram: @nycayenmoore
          </p>
        </div>
      </div>
    `;
  }

  private generateBookingConfirmationText(data: ContactFormData): string {
    return `
Nycayen - The Art of Hair
Booking Confirmation

Dear ${data.name},

Thank you for your interest in our services! We have received your booking request and will contact you shortly to confirm your appointment.

Your Request Details:
${data.service ? `Service: ${data.service}` : ''}
${data.preferredDate ? `Preferred Date: ${data.preferredDate}` : ''}
${data.preferredTime ? `Preferred Time: ${data.preferredTime}` : ''}
Message: ${data.message}

Our team will review your request and get back to you within 24 hours to confirm your appointment details.

"Empower Through Beauty—Boosting Confidence via Personalized Hair Styling"

Follow us on Instagram: @nycayenmoore
    `.trim();
  }

  private generateWelcomeHTML(name: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #BFA681; font-size: 28px; margin-bottom: 10px;">Welcome to Nycayen</h1>
          <p style="color: #5C5048; font-size: 16px;">The Art of Hair</p>
        </div>
        
        <p>Dear ${name},</p>
        
        <p>Welcome to the Nycayen family! We're thrilled to have you join our community of beauty enthusiasts.</p>
        
        <div style="background-color: #FFF6E8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #5C5048; margin-bottom: 15px;">What's Next?</h3>
          <ul style="color: #5C5048; line-height: 1.6;">
            <li>Explore our range of personalized hair styling services</li>
            <li>Book your first appointment at your convenience</li>
            <li>Follow us on Instagram @nycayenmoore for daily inspiration</li>
            <li>Stay updated with the latest hair trends and tips</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #5C5048; font-style: italic; font-size: 18px;">
            "Empower Through Beauty—Boosting Confidence via Personalized Hair Styling"
          </p>
        </div>
        
        <p>We can't wait to help you discover your perfect look and boost your confidence through the art of hair.</p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            You're receiving this email because you subscribed to our newsletter or created an account on nycayen.com
          </p>
        </div>
      </div>
    `;
  }

  private generateWelcomeText(name: string): string {
    return `
Welcome to Nycayen - The Art of Hair

Dear ${name},

Welcome to the Nycayen family! We're thrilled to have you join our community of beauty enthusiasts.

What's Next?
- Explore our range of personalized hair styling services
- Book your first appointment at your convenience
- Follow us on Instagram @nycayenmoore for daily inspiration
- Stay updated with the latest hair trends and tips

"Empower Through Beauty—Boosting Confidence via Personalized Hair Styling"

We can't wait to help you discover your perfect look and boost your confidence through the art of hair.

You're receiving this email because you subscribed to our newsletter or created an account on nycayen.com
    `.trim();
  }
}

export const sendgridClient = new SendGridClient();