import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID!;

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    // Extract phone number and OTP code from the request body
    const { phoneNumber, otp } = await request.json();

    // Validate input
    if (!phoneNumber || !otp) {
      return NextResponse.json({ error: "Phone number and OTP are required" }, { status: 400 });
    }

    // Verify the OTP using Twilio Verify service
    const verificationCheck = await client.verify.v2.services(serviceId).verificationChecks.create({
      to: phoneNumber,
      code: otp,
    });

    // Check if the verification was successful
    if (verificationCheck.status === "approved") {
      return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
  } catch (error:any) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "Failed to verify OTP", details: error.message }, { status: 500 });
  }
}
