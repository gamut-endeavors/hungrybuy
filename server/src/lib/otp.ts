import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export async function sendUserOtp(phone: string, otp: string) {
  try {
    const message = await client.messages.create({
      body: ``,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return message.sid;
  } catch (error) {
    console.log("TWILIO_API_ERROR", error);
    throw error;
  }
}
