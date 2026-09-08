"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CaretDown,
  ArrowRight,
  List as MenuIcon,
  X as XIcon,
} from "@phosphor-icons/react";
import MegaMenu from "@/components/MegaMenu";
import { Button } from "@/components/ui/button";

type TabType = "consumer" | "broker" | "business" | "developer" | "help" | null;

export default function Header() {
  const [activeTab, setActiveTab] = useState<TabType>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveAccordion, setMobileActiveAccordion] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (tab: "consumer" | "broker" | "business" | "developer" | "help") => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveTab(tab);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveTab(null);
    }, 200);
  };

  const mobileNavLinks = {
    consumer: [
      { title: "Vehicles & Classic Cars", href: "#categories" },
      { title: "General Merchandise & Electronics", href: "#categories" },
      { title: "Luxury Watches & Fine Jewelry", href: "#categories" },
      { title: "Milestone & Freelance Services", href: "#categories" },
    ],
    broker: [
      { title: "3-Party Broker Escrow", href: "#protection" },
      { title: "Automated Commission Payout", href: "#calculator" },
      { title: "Deal Coordination Dashboard", href: "#how-it-works" },
      { title: "Circumvention Protection", href: "#protection" },
    ],
    business: [
      { title: "B2B Wholesale & Supply Chain", href: "#categories" },
      { title: "Commercial Machinery & Tooling", href: "#categories" },
      { title: "Enterprise Milestone Retainers", href: "#categories" },
      { title: "Digital Assets, Codebases & SaaS", href: "#categories" },
    ],
    developer: [
      { title: "Multi-Chain Multi-Sig Vaults", href: "#security" },
      { title: "Instant On-Chain Settlement", href: "#security" },
      { title: "API & Webhook Integration", href: "#security" },
      { title: "Cold-Storage Segregation", href: "#security" },
    ],
    help: [
      { title: "Live Fee Calculator", href: "#calculator" },
      { title: "Inspection Period Guidelines", href: "#how-it-works" },
      { title: "Dispute & Neutral Arbitration", href: "/dispute-rules" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Frequently Asked Questions", href: "#faq" },
    ],
  };

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
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-2xl font-bold tracking-tight text-white">
                Escrow<span className="text-[#00F59B]">Bay</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] ml-0.5 animate-pulse" />
            </Link>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              
              {/* Consumer Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("consumer")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-base font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === "consumer"
                      ? "text-[#00F59B] bg-white/5"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Consumer</span>
                  <CaretDown
                    weight="bold"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === "consumer" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Broker Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("broker")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-base font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === "broker"
                      ? "text-[#00F59B] bg-white/5"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Broker</span>
                  <CaretDown
                    weight="bold"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === "broker" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Business Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("business")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-base font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === "business"
                      ? "text-[#00F59B] bg-white/5"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Business</span>
                  <CaretDown
                    weight="bold"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === "business" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Developer Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("developer")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-base font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === "developer"
                      ? "text-[#00F59B] bg-white/5"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Developer</span>
                  <CaretDown
                    weight="bold"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === "developer" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Help Tab */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("help")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-base font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeTab === "help"
                      ? "text-[#00F59B] bg-white/5"
                      : "text-slate-200 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Help</span>
                  <CaretDown
                    weight="bold"
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === "help" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                    }`}
                  />
                </button>
              </div>

              {/* Standalone Solid Mega Menu Popup Container */}
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <MegaMenu activeTab={activeTab} onClose={() => setActiveTab(null)} />
              </div>

            </nav>
          </div>

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
          <div className="space-y-4">
            
            {/* 1. Consumer Accordion */}
            <div className="border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() =>
                  setMobileActiveAccordion(
                    mobileActiveAccordion === "consumer" ? null : "consumer"
                  )
                }
                className="w-full flex items-center justify-between text-left py-2 text-base font-bold text-white cursor-pointer"
              >
                <span>Consumer Services</span>
                <CaretDown
                  weight="bold"
                  className={`w-4 h-4 transition-transform ${
                    mobileActiveAccordion === "consumer" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                  }`}
                />
              </button>
              {mobileActiveAccordion === "consumer" && (
                <div className="space-y-2 pt-2 pl-2">
                  {mobileNavLinks.consumer.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 text-base text-slate-300 hover:text-[#00F59B]"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Broker Accordion */}
            <div className="border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() =>
                  setMobileActiveAccordion(
                    mobileActiveAccordion === "broker" ? null : "broker"
                  )
                }
                className="w-full flex items-center justify-between text-left py-2 text-base font-bold text-white cursor-pointer"
              >
                <span>Brokerage Solutions</span>
                <CaretDown
                  weight="bold"
                  className={`w-4 h-4 transition-transform ${
                    mobileActiveAccordion === "broker" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                  }`}
                />
              </button>
              {mobileActiveAccordion === "broker" && (
                <div className="space-y-2 pt-2 pl-2">
                  {mobileNavLinks.broker.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 text-base text-slate-300 hover:text-[#00F59B]"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Business Accordion */}
            <div className="border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() =>
                  setMobileActiveAccordion(
                    mobileActiveAccordion === "business" ? null : "business"
                  )
                }
                className="w-full flex items-center justify-between text-left py-2 text-base font-bold text-white cursor-pointer"
              >
                <span>Business & Wholesale</span>
                <CaretDown
                  weight="bold"
                  className={`w-4 h-4 transition-transform ${
                    mobileActiveAccordion === "business" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                  }`}
                />
              </button>
              {mobileActiveAccordion === "business" && (
                <div className="space-y-2 pt-2 pl-2">
                  {mobileNavLinks.business.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 text-base text-slate-300 hover:text-[#00F59B]"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Developer Accordion */}
            <div className="border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() =>
                  setMobileActiveAccordion(
                    mobileActiveAccordion === "developer" ? null : "developer"
                  )
                }
                className="w-full flex items-center justify-between text-left py-2 text-base font-bold text-white cursor-pointer"
              >
                <span>Developer Security</span>
                <CaretDown
                  weight="bold"
                  className={`w-4 h-4 transition-transform ${
                    mobileActiveAccordion === "developer" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                  }`}
                />
              </button>
              {mobileActiveAccordion === "developer" && (
                <div className="space-y-2 pt-2 pl-2">
                  {mobileNavLinks.developer.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 text-base text-slate-300 hover:text-[#00F59B]"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Help Accordion */}
            <div className="border-b border-white/10 pb-3">
              <button
                type="button"
                onClick={() =>
                  setMobileActiveAccordion(
                    mobileActiveAccordion === "help" ? null : "help"
                  )
                }
                className="w-full flex items-center justify-between text-left py-2 text-base font-bold text-white cursor-pointer"
              >
                <span>Help & Guides</span>
                <CaretDown
                  weight="bold"
                  className={`w-4 h-4 transition-transform ${
                    mobileActiveAccordion === "help" ? "rotate-180 text-[#00F59B]" : "text-slate-400"
                  }`}
                />
              </button>
              {mobileActiveAccordion === "help" && (
                <div className="space-y-2 pt-2 pl-2">
                  {mobileNavLinks.help.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block p-2 text-base text-slate-300 hover:text-[#00F59B]"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

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
