"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  List as MenuIcon,
  X as XIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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
              href="#how-it-works"
              className="text-base font-semibold text-slate-200 hover:text-[#00F59B] transition-colors"
            >
              How It Works
            </a>
            <a
              href="#calculator"
              className="text-base font-semibold text-slate-200 hover:text-[#00F59B] transition-colors"
            >
              Fee Calculator
            </a>
            <a
              href="#faq"
              className="text-base font-semibold text-slate-200 hover:text-[#00F59B] transition-colors"
            >
              Help
            </a>
          </nav>

          {/* Action CTAs: Log in and Sign up */}
          <div className="hidden sm:flex items-center gap-3">
            <Button asChild variant="ghost" className="px-4 py-2.5 text-base font-semibold text-slate-200 hover:text-white">
              <a href="#login">Log in</a>
            </Button>

            <Button asChild className="px-5 py-2.5 text-base font-bold rounded-xl">
              <a href="#signup">
                <span>Sign up</span>
                <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Button asChild size="sm" className="px-4 py-2 text-base font-bold rounded-xl sm:hidden">
              <a href="#signup">Sign up</a>
            </Button>
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
            
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              How It Works
            </a>

            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Fee Calculator
            </a>

            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              FAQ
            </a>

            <a
              href="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Terms of Service
            </a>

            <a
              href="/privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Privacy Policy
            </a>

            <a
              href="/dispute-rules"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-4 text-lg font-semibold text-white hover:text-[#00F59B] hover:bg-white/5 rounded-lg transition-colors"
            >
              Dispute Rules
            </a>

          </div>

          {/* Bottom Mobile Action Buttons */}
          <div className="pt-6 space-y-3">
            <Button asChild size="lg" className="w-full h-14 text-base font-bold rounded-xl">
              <a
                href="#signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Sign up</span>
                <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
              </a>
            </Button>

            <Button asChild variant="secondary" size="lg" className="w-full h-14 text-base font-semibold rounded-xl">
              <a
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </a>
            </Button>
          </div>

        </div>
      )}
    </header>
  );
}
