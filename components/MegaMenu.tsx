"use client";

import {
  Package,
  Briefcase,
  Sparkle,
  Globe,
  Coins,
  ShieldCheck,
  Scales,
  Lock,
  Calculator,
  Clock,
  UsersThree,
  BuildingOffice,
  Question,
  FileText,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface MegaMenuProps {
  activeTab: "consumer" | "broker" | "business" | "help" | null;
  onClose: () => void;
}

export default function MegaMenu({ activeTab, onClose }: MegaMenuProps) {
  if (!activeTab) return null;

  const consumerItems = [
    {
      title: "Vehicles & Classic Cars",
      desc: "Buy and sell collector automobiles, exotic sports cars, and motorbikes with verified title transfer.",
      icon: ShieldCheck,
      href: "#categories",
    },
    {
      title: "General Merchandise & Electronics",
      desc: "High-end computing hardware, GPU clusters, smartphones, and camera equipment.",
      icon: Package,
      href: "#categories",
    },
    {
      title: "Luxury Watches & Fine Jewelry",
      desc: "Authenticated timepieces, diamonds, fine art, and rare collectibles with 3 to 14 day inspection.",
      icon: Sparkle,
      href: "#categories",
    },
    {
      title: "Milestone & Freelance Services",
      desc: "Custom software development, design contracts, and consulting with staged milestone releases.",
      icon: Briefcase,
      href: "#categories",
    },
  ];

  const brokerItems = [
    {
      title: "3-Party Broker Escrow",
      desc: "Safeguard high-value deals with separate accounts for Buyer, Seller, and Intermediary Broker.",
      icon: UsersThree,
      href: "#protection",
    },
    {
      title: "Automated Commission Payout",
      desc: "Your broker fee is locked upfront and disbursed automatically upon transaction completion.",
      icon: Coins,
      href: "#calculator",
    },
    {
      title: "Deal Coordination Dashboard",
      desc: "Monitor deposit confirmations, carrier tracking logs, and inspection timers in real time.",
      icon: Clock,
      href: "#how-it-works",
    },
    {
      title: "Circumvention Protection",
      desc: "Eliminate the risk of counterparties completing deals outside your brokerage agreement.",
      icon: Lock,
      href: "#protection",
    },
  ];

  const businessItems = [
    {
      title: "B2B Wholesale & Supply Chain",
      desc: "International bulk container shipments, raw materials, and commodities settled in stablecoins.",
      icon: Globe,
      href: "#categories",
    },
    {
      title: "Commercial Machinery & Tooling",
      desc: "Heavy industrial equipment, factory production machinery, and commercial vehicles.",
      icon: BuildingOffice,
      href: "#categories",
    },
    {
      title: "Enterprise Milestone Retainers",
      desc: "Phased payments for large technical integrations and corporate service deliverables.",
      icon: Briefcase,
      href: "#categories",
    },
    {
      title: "Digital Assets, Codebases & SaaS",
      desc: "Safe acquisition of software repositories, domains, web platforms, and digital IP rights.",
      icon: Coins,
      href: "#categories",
    },
  ];

  const helpItems = [
    {
      title: "Live Fee Calculator",
      desc: "Calculate exact tiered escrow rates with Buyer, Seller, or 50/50 fee split options.",
      icon: Calculator,
      href: "#calculator",
    },
    {
      title: "Inspection Period Guidelines",
      desc: "How delivery tracking verification and buyer test windows protect against fraud.",
      icon: Clock,
      href: "#how-it-works",
    },
    {
      title: "Dispute & Neutral Arbitration",
      desc: "Impartial evidence evaluation, return shipping rules, and dispute resolution guidelines.",
      icon: Scales,
      href: "/dispute-rules",
    },
    {
      title: "Terms of Service",
      desc: "Comprehensive legal agreement governing escrow custody, deposits, and releases.",
      icon: FileText,
      href: "/terms",
    },
    {
      title: "Privacy Policy",
      desc: "Our commitment to data protection, non-disclosure, and encrypted communications.",
      icon: ShieldCheck,
      href: "/privacy",
    },
    {
      title: "Frequently Asked Questions",
      desc: "Answers to common questions regarding crypto deposits, fees, and timelines.",
      icon: Question,
      href: "#faq",
    },
  ];

  return (
    <div className="absolute top-full left-0 mt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
      {/* 1. Consumer Mega Menu */}
      {activeTab === "consumer" && (
        <div className="w-[700px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-4">
          <div className="col-span-8 grid grid-cols-2 gap-4">
            {consumerItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/20 text-[#00F59B] shrink-0 group-hover:scale-105 transition-transform">
                    <Icon weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white group-hover:text-[#00F59B] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed mt-1">
                      {item.desc}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Broker Mega Menu */}
      {activeTab === "broker" && (
        <div className="w-[700px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-4">
          <div className="col-span-8 grid grid-cols-2 gap-4">
            {brokerItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/20 text-[#00F59B] shrink-0 group-hover:scale-105 transition-transform">
                    <Icon weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white group-hover:text-[#00F59B] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed mt-1">
                      {item.desc}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Business Mega Menu */}
      {activeTab === "business" && (
        <div className="w-[700px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-4">
          <div className="col-span-8 grid grid-cols-2 gap-4">
            {businessItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/20 text-[#00F59B] shrink-0 group-hover:scale-105 transition-transform">
                    <Icon weight="bold" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white group-hover:text-[#00F59B] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-400 leading-relaxed mt-1">
                      {item.desc}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Help Mega Menu */}
      {activeTab === "help" && (
        <div className="w-[700px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-2 gap-4">
          {helpItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                onClick={onClose}
                className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/20 text-[#00F59B] shrink-0 group-hover:scale-105 transition-transform">
                  <Icon weight="bold" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-white group-hover:text-[#00F59B] transition-colors">
                    {item.title}
                  </div>
                  <div className="text-sm text-slate-400 leading-relaxed mt-1">
                    {item.desc}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
