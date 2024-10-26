import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID!;

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber } = await request.json();
    
        // Validate phone number
        if (!phoneNumber) {
          return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }
    
        // Send OTP using Twilio Verify service
        const verification = await client.verify.v2.services(serviceId).verifications.create({
          to: phoneNumber,
          channel: "sms", // or "call" for voice verification
        });
        if (verification.status === "pending") {
            return NextResponse.json({ sent: true }, { status: 200 });
          } else {
            return NextResponse.json({ sent: false }, { status: 500 });
          }
      } catch (error:any) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ error: "Failed to send OTP", details: error.message }, { status: 500 });
      }
}