import { Session } from "@/lib/auth.client";
import ResetPassword from "@/mail/ResetPassword";
import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendResetPasswordEmail(url: string, user: Session, token: string) {
  try {
    // Always use the frontend reset password page, not the API route
    // url should be something like http://localhost:3000/reset-password
    const resetUrl = `${url}/reset-password?token=${token}`;
    const html = await render(ResetPassword({ url: resetUrl, user }));
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [user.email],
      subject: "Reset Your Password",
      html,
    });
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}