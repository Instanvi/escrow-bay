import { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Log In | Escrow Bay",
  description: "Sign in to your Escrow Bay account to manage active escrows, release milestone payments, and track secure transactions.",
};

export default function LoginPage() {
  return <AuthForm initialMode="login" />;
}
