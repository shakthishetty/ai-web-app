type FormType = "signIn" | "signUp" | "forgotPassword" | "resetPassword";

interface NotionMagicLinkEmailProps {
  name: string;
  url: string;
}

interface FormData {
    name: string;
    email: string;
    password: string;
}