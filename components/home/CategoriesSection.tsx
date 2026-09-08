"use client";

import {
  Coins,
  Car,
  Package,
  Sparkle,
  Briefcase,
  UsersThree,
  ArrowRight,
} from "@phosphor-icons/react";

export default function CategoriesSection() {
  const dealTypes = [
    {
      title: "Cryptocurrency",
      icon: Coins,
      description: "BTC, ETH, SOL, USDT and more, held until both sides confirm the trade.",
      details: ["Multi-sig cold vault custody", "Instant on-chain verification", "Zero chargeback or reversal risk"],
    },
    {
      title: "Vehicles",
      icon: Car,
      description: "Cars, motorcycles, boats: payment held until the vehicle is inspected.",
      details: ["Title and documentation check", "Physical inspection period", "Safe high-ticket vehicle purchase"],
    },
    {
      title: "General merchandise",
      icon: Package,
      description: "Electronics, equipment, and goods of any size, anywhere in the world.",
      details: ["Hardware & GPU servers", "Industrial machinery & tools", "Verified tracking milestones"],
    },
    {
      title: "Jewelry & luxury goods",
      icon: Sparkle,
      description: "High-value items verified before release, with room for third-party appraisal.",
      details: ["Luxury timepieces & watches", "Certified diamonds & jewelry", "Third-party appraisal window"],
    },
    {
      title: "Services & milestones",
      icon: Briefcase,
      description: "Freelance and contract work, released in stages as each milestone is met.",
      details: ["Software engineering contracts", "Design & marketing deliverables", "Staged milestone disbursements"],
    },
    {
      title: "Business & brokered deals",
      icon: UsersThree,
      description: "Third parties can manage a transaction on behalf of either side.",
      details: ["Commission protection for brokers", "Multi-party deal management", "Automated fee deductions"],
    },
  ];

  return (
    <section id="categories" className="py-24 bg-[#080C0E] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Built for <span className="text-gradient-emerald">more than one kind of deal</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Whatever you&apos;re buying or selling, the same protection applies.
          </p>
        </div>

        {/* 6 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealTypes.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-[#0B1013] rounded-2xl p-7 border border-white/10 flex flex-col justify-between group hover:border-[#00F59B]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B] group-hover:scale-110 transition-transform">
                      <Icon weight="bold" className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-[#00F59B] transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-base text-slate-300 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {cat.details.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-base text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-[#00F59B]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <a
                    href="#signup"
                    className="w-full flex items-center justify-between text-base font-semibold text-[#00F59B] hover:text-white py-1 transition-colors group/btn cursor-pointer"
                  >
                    <span>Start escrow for {cat.title}</span>
                    <ArrowRight weight="bold" className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
