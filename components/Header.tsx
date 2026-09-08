"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  List as MenuIcon,
  X as XIcon,
  User,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check user session
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("escrow_user");
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch {
          setCurrentUser(null);
        }
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#06090B]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl font-bold tracking-tight text-white">
              Escrow<span className="text-[#00F59B]">Bay</span>
            </span>
          </Link>

          {/* Centered Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a
              href="/#how-it-works"
              className="text-base font-semibold text-slate-200 hover:text-[#00F59B] transition-colors"
            >
              How It Works
            </a>
            <a
              href="/#calculator"
              className="text-base font-semibold text-slate-200 hover:text-[#00F59B] transition-colors"
            >
              Fee Calculator
            </a>
            <a
              href="/#faq"
              className="text-base font-semibold text-slate-200 hover:text-[#00F59B] transition-colors"
            >
              FAQ
            </a>
            {currentUser && (
              <Link
                href="/dashboard"
                className="text-base font-semibold text-emerald-400 hover:text-[#00F59B] transition-colors flex items-center gap-1.5"
              >
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          {/* Action CTAs: Log in and Sign up / User Profile */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <Button asChild className="px-4 py-2 text-sm font-bold rounded-xl bg-emerald-950 border border-emerald-500/40 text-[#00F59B] hover:bg-emerald-900">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <User weight="bold" className="w-4 h-4 text-[#00F59B]" />
                  <span>@{currentUser.username}</span>
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" className="px-4 py-2.5 text-base font-semibold text-slate-200 hover:text-white">
                  <Link href="/login">Log in</Link>
                </Button>

                <Button asChild className="px-5 py-2.5 text-base font-bold rounded-xl">
                  <Link href="/signup">
                    <span>Sign up</span>
                    <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            {currentUser ? (
              <Button asChild size="sm" className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-950 border border-emerald-500/40 text-[#00F59B] sm:hidden">
                <Link href="/dashboard">@{currentUser.username}</Link>
              </Button>
            ) : (
              <Button asChild size="sm" className="px-4 py-2 text-base font-bold rounded-xl sm:hidden">
                <Link href="/signup">Sign up</Link>
              </Button>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <XIcon weight="bold" className="w-6 h-6" />
              ) : (
                <MenuIcon weight="bold" className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 bg-[#06090B]/98 backdrop-blur-2xl border-t border-white/10 p-6 overflow-y-auto z-50 animate-fade-in flex flex-col justify-between">
          <div className="space-y-3">
            
            {currentUser && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-4 text-lg font-bold text-[#00F59B] bg-emerald-950/40 border border-emerald-500/30 rounded-lg transition-colors"
              >
                Escrow Dashboard (@{currentUser.username})
              </Link>
            )}

            <a
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              How It Works
            </a>

            <a
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Fee Calculator
            </a>

            <a
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              FAQ
            </a>

            <Link
              href="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Terms of Service
            </Link>

            <Link
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/dispute-rules"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Dispute Rules
            </Link>

          </div>

          {/* Bottom Mobile Action Buttons */}
          <div className="pt-6 space-y-3">
            {currentUser ? (
              <Button asChild size="lg" className="w-full h-14 text-base font-bold rounded-xl">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Go to Escrow Dashboard</span>
                  <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="w-full h-14 text-base font-bold rounded-xl">
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Sign up</span>
                    <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
                  </Link>
                </Button>

                <Button asChild variant="secondary" size="lg" className="w-full h-14 text-base font-semibold rounded-xl">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                </Button>
              </>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
