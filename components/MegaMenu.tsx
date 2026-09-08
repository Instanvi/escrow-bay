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
  ArrowRight,
  Clock,
  Lightning,
  UsersThree,
  BuildingOffice,
  Code,
  Question,
  FileText,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface MegaMenuProps {
  activeTab: "consumer" | "broker" | "business" | "developer" | "help" | null;
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

  const developerItems = [
    {
      title: "Multi-Chain Multi-Sig Vaults",
      desc: "Threshold signature smart contracts across Bitcoin, Ethereum, Solana, and USDT.",
      icon: Lock,
      href: "#security",
    },
    {
      title: "Instant On-Chain Settlement",
      desc: "Sub-second verification and cryptographic proofs with zero chargeback risk.",
      icon: Lightning,
      href: "#security",
    },
    {
      title: "API & Webhook Integration",
      desc: "Programmatically generate escrow deals, track funding, and listen for milestone approvals.",
      icon: Code,
      href: "#security",
    },
    {
      title: "Cold-Storage Segregation",
      desc: "Air-gapped offline key management with public on-chain verifiable reserves.",
      icon: ShieldCheck,
      href: "#security",
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
        <div className="w-[740px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-12 gap-6">
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

          <div className="col-span-4 p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-[#00F59B]">
                Safe Handover
              </span>
              <h4 className="text-base font-bold text-white mt-1.5">
                Buyer Inspection Guarantee
              </h4>
              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                Funds stay locked until you test and approve physical goods.
              </p>
            </div>
            <Button asChild className="w-full py-2.5 text-base font-bold rounded-lg">
              <a href="#how-it-works" onClick={onClose}>
                <span>Learn How</span>
                <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* 2. Broker Mega Menu */}
      {activeTab === "broker" && (
        <div className="w-[740px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-12 gap-6">
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

          <div className="col-span-4 p-5 rounded-xl bg-blue-950/50 border border-blue-500/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
                Broker Commission
              </span>
              <h4 className="text-base font-bold text-white mt-1.5">
                Protected Payouts
              </h4>
              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                Your commission is deducted and sent directly to your wallet upon deal closing.
              </p>
            </div>
            <Button asChild variant="secondary" className="w-full py-2.5 text-base font-bold rounded-lg">
              <a href="#calculator" onClick={onClose}>
                <span>Calculate Split</span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* 3. Business Mega Menu */}
      {activeTab === "business" && (
        <div className="w-[740px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-12 gap-6">
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

          <div className="col-span-4 p-5 rounded-xl bg-amber-950/50 border border-amber-500/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-amber-400">
                High Volume
              </span>
              <h4 className="text-base font-bold text-white mt-1.5">
                Enterprise Tier Rates
              </h4>
              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                Transactions over $100k qualify for custom low escrow fee rates starting at 0.85%.
              </p>
            </div>
            <Button asChild variant="secondary" className="w-full py-2.5 text-base font-bold rounded-lg">
              <a href="#calculator" onClick={onClose}>
                <span>View Rates</span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* 4. Developer Mega Menu */}
      {activeTab === "developer" && (
        <div className="w-[740px] p-6 bg-[#0B1013] rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-12 gap-6">
          <div className="col-span-8 grid grid-cols-2 gap-4">
            {developerItems.map((item) => {
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

          <div className="col-span-4 p-5 rounded-xl bg-purple-950/50 border border-purple-500/30 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-purple-400">
                Multi-Chain Engine
              </span>
              <h4 className="text-base font-bold text-white mt-1.5">
                Programmable Trust
              </h4>
              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                Multi-sig vault smart contracts for Bitcoin, Ethereum, Solana, and USDT.
              </p>
            </div>
            <Button asChild variant="secondary" className="w-full py-2.5 text-base font-bold rounded-lg">
              <a href="#security" onClick={onClose}>
                <span>Security Arch</span>
                <ArrowRight weight="bold" className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      )}

      {/* 5. Help Mega Menu */}
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
