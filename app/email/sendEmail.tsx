import { Session } from "@/lib/auth.client";
import VerificationEmailTemplate from "@/mail/VerificationEmailTemplate";
import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(url: string, user: Session) {
  try {
    const html = await render(VerificationEmailTemplate({ url, name: user.name}));
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [user.email],
      subject: "Email Verification",
      html,
    });
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}