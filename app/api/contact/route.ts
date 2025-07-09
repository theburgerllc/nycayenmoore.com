import { NextRequest, NextResponse } from "next/server";
import { sendgridClient } from "@/utils/sendgrid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name, email, phone, service, preferredDate, preferredTime, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const contactData = {
      name,
      email,
      phone,
      service,
      preferredDate,
      preferredTime,
      message,
    };

    let response;
    
    if (type === "booking") {
      // Send booking confirmation to client and notification to business
      const [clientResponse, businessResponse] = await Promise.all([
        sendgridClient.sendBookingConfirmation(contactData),
        sendgridClient.sendContactForm(contactData),
      ]);

      response = clientResponse.success && businessResponse.success 
        ? { success: true, message: "Booking request submitted successfully" }
        : { success: false, message: "Failed to send booking confirmation" };
    } else {
      // Regular contact form
      response = await sendgridClient.sendContactForm(contactData);
    }

    if (response.success) {
      return NextResponse.json({
        message: response.message,
        messageId: response.messageId,
      });
    } else {
      return NextResponse.json(
        { error: response.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}