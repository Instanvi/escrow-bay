"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Lock,
  ArrowRight,
  CheckCircle,
  WarningCircle,
  Key,
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setErrorMessage("Please enter your username.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        `If an account exists for @${cleanUsername}, recovery instructions have been initiated. Please check your registered security contacts.`
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040907] relative overflow-hidden bg-grid-pattern selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00F59B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Persistent Global Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-lg w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 sm:pb-24 relative z-10 flex items-center justify-center">
        <div className="w-full bg-[#091510] rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          <div className="text-center space-y-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] flex items-center justify-center mx-auto mb-4">
              <Key weight="bold" className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Reset Password</h2>
            <p className="text-sm text-slate-400">
              Enter your username to begin the secure account recovery process.
            </p>
          </div>

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-[#00F59B]/50 flex items-start gap-3 animate-fade-in">
              <CheckCircle weight="bold" className="w-5 h-5 text-[#00F59B] shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-200 font-medium">
                {successMessage}
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-500/50 flex items-start gap-3 animate-fade-in">
              <WarningCircle weight="bold" className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="text-sm text-red-200 font-medium">
                {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Your Username
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User weight="bold" className="w-5 h-5" />
                </div>
                <Input
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Satoshi99"
                  className="pl-12 pr-4 h-13 bg-[#040806] border-white/15 focus:border-[#00F59B] text-white placeholder:text-slate-600 rounded-xl text-base"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full h-14 text-base font-bold rounded-xl shadow-lg transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 text-[#04100C]">
                  <div className="w-5 h-5 border-2 border-[#04100C] border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-[#04100C]">
                  <Lock weight="bold" className="w-4 h-4" />
                  <span>Send Recovery Instructions</span>
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </div>
              )}
            </Button>

            <div className="text-center pt-2 text-sm text-slate-400">
              <span>Remembered your password? </span>
              <Link href="/login" className="text-[#00F59B] font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </form>

        </div>
      </main>

      {/* Global Platform Footer */}
      <Footer />
    </div>
  );
}
