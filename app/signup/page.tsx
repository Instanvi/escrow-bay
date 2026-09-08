import { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account | Escrow Bay",
  description: "Sign up for Escrow Bay to access institutional multi-sig crypto and fiat escrow protection for buying, selling, or brokering.",
};

export default function SignupPage() {
  return <AuthForm initialMode="signup" />;
}
