"use client";

import {
  ShieldCheck,
  Lock,
  Check,
  CheckCircle,
  Lightning,
  UserCheck,
  Clock,
  Scales,
  Vault,
} from "@phosphor-icons/react";

export default function DualProtectionSection() {
  const safeguards = [
    {
      title: "Segregated holding",
      desc: "Funds sit apart from operating accounts and are never lent, staked, or used.",
      icon: Vault,
    },
    {
      title: "Identity verification",
      desc: "Both parties confirm identity before an escrow account is opened.",
      icon: UserCheck,
    },
    {
      title: "Fixed inspection windows",
      desc: "Buyers get a set number of days to confirm before funds can release.",
      icon: Clock,
    },
    {
      title: "Human dispute review",
      desc: "Disagreements go to a case manager, not an automated rule.",
      icon: Scales,
    },
  ];

  const buyerProtections = [
    {
      title: "Funds Remain In Locked Vault",
      desc: "Your crypto never transfers to the seller until you receive, inspect, and approve the merchandise.",
    },
    {
      title: "1 to 14-Day Inspection Window",
      desc: "Ample guaranteed time to test electronics, authenticate watches, or inspect contractor deliverables.",
    },
    {
      title: "100% Refund Protection",
      desc: "If the seller fails to dispatch, sends incorrect goods, or misses milestones, your deposit is safely refunded.",
    },
    {
      title: "Verified Tracking & Proof",
      desc: "Inspection countdown only initiates once verified courier delivery confirmation is recorded.",
    },
  ];

  const sellerProtections = [
    {
      title: "100% Upfront Locked Collateral",
      desc: "Never ship high-ticket items or work for free. Escrow Bay confirms funds are fully locked before you start.",
    },
    {
      title: "Zero Chargeback / Reversal Fraud",
      desc: "Eliminates fraudulent credit card chargebacks, fake bank recalls, and unauthorized dispute scams.",
    },
    {
      title: "Automated Inspection Release",
      desc: "If a buyer receives the item but goes silent, funds automatically disburse to your wallet after the inspection period.",
    },
    {
      title: "Neutral Human Arbitration",
      desc: "Experienced escrow specialists review shipping manifests, serial numbers, and delivery logs in disputes.",
    },
  ];

  return (
    <section id="protection" className="py-24 bg-[#06090B] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Money doesn&apos;t move <span className="text-gradient-emerald">on trust alone</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Every safeguard exists because someone, somewhere, tried to skip a step.
          </p>
        </div>

        {/* 4 Core Safeguards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {safeguards.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#0B1013] rounded-2xl p-6 border border-white/10 hover:border-[#00F59B]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B] w-fit mb-4">
                    <Icon weight="bold" className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Buyer Column */}
          <div className="bg-[#0B1013] rounded-2xl p-7 sm:p-9 border border-emerald-500/30 relative overflow-hidden space-y-6">
            <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/40 text-[#00F59B]">
                <ShieldCheck weight="bold" className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Protection for Buyers</h3>
            </div>

            <div className="space-y-4">
              {buyerProtections.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-[#06090B] border border-white/10">
                  <div className="p-1.5 rounded-lg bg-emerald-950/80 text-[#00F59B] shrink-0 mt-0.5">
                    <Check weight="bold" className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-base text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-sm text-slate-200 flex items-center gap-3">
              <Lock weight="bold" className="w-5 h-5 text-[#00F59B] shrink-0" />
              <span>You never pay a single cent to the seller until you hold and approve the merchandise.</span>
            </div>
          </div>

          {/* Seller Column */}
          <div className="bg-[#0B1013] rounded-2xl p-7 sm:p-9 border border-white/10 relative overflow-hidden space-y-6">
            <div className="flex items-center gap-3.5 border-b border-white/10 pb-5">
              <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-[#38BDF8]">
                <Lightning weight="bold" className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Protection for Sellers</h3>
            </div>

            <div className="space-y-4">
              {sellerProtections.map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-[#06090B] border border-white/10">
                  <div className="p-1.5 rounded-lg bg-cyan-950/80 text-[#38BDF8] shrink-0 mt-0.5">
                    <Check weight="bold" className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-base text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-sm text-slate-200 flex items-center gap-3">
              <CheckCircle weight="bold" className="w-5 h-5 text-[#38BDF8] shrink-0" />
              <span>Guaranteed payout upon delivery. Fraudulent buyers can never recall or chargeback funds.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
