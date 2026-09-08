"use client";

import Image from "next/image";
import {
  Coins,
  Car,
  Package,
  Sparkle,
  Briefcase,
  UsersThree,
  ArrowRight,
  Check,
} from "@phosphor-icons/react";

export default function CategoriesSection() {
  const dealTypes = [
    {
      title: "Cryptocurrency & Digital Assets",
      icon: Coins,
      image: "/crypto.jpg",
      description: "BTC, ETH, SOL, USDT and more, held until both sides confirm the trade on-chain.",
      details: [
        "Multi-sig cold vault custody",
        "Instant on-chain verification",
        "Zero chargeback or reversal risk",
      ],
    },
    {
      title: "Vehicles & Classic Cars",
      icon: Car,
      image: "/vehicles.jpg",
      description: "Cars, motorcycles, and boats: payment held until the vehicle title and condition are inspected.",
      details: [
        "Title & documentation verification",
        "Physical inspection test window",
        "High-ticket safe handover",
      ],
    },
    {
      title: "General Merchandise & Electronics",
      icon: Package,
      image: "/merchandise.jpg",
      description: "Computing hardware, GPU clusters, mobile phones, and equipment shipped anywhere globally.",
      details: [
        "Hardware & GPU server escrow",
        "Industrial machinery & tooling",
        "Courier delivery verification",
      ],
    },
    {
      title: "Jewelry & Luxury Timepieces",
      icon: Sparkle,
      image: "/luxury.webp",
      description: "High-value luxury watches, diamonds, and collectibles verified before release.",
      details: [
        "Luxury watch & jewelry escrow",
        "Certified diamond authentication",
        "Third-party appraisal window",
      ],
    },
    {
      title: "Milestone & Freelance Services",
      icon: Briefcase,
      image: "/services.jpg",
      description: "Custom software development, design contracts, and consulting released in staged milestones.",
      details: [
        "Software engineering retainers",
        "Design & deliverable verification",
        "Staged milestone releases",
      ],
    },
    {
      title: "Business & Brokered Transactions",
      icon: UsersThree,
      image: "/broker.jpg",
      description: "Intermediaries and brokers manage 3-party transactions with automated commission payouts.",
      details: [
        "Commission protection for brokers",
        "3-party structured agreements",
        "Automated commission deduction",
      ],
    },
  ];

  return (
    <section id="categories" className="py-24 bg-[#05100B] relative border-t border-emerald-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Built for <span className="text-gradient-emerald">more than one kind of deal</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Whatever you are buying or selling, the same institutional protection applies.
          </p>
        </div>

        {/* 6 Category Photo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealTypes.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="bg-[#091510] rounded-2xl border border-white/10 hover:border-[#00F59B]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-[0_10px_30px_rgba(0,245,155,0.08)]"
              >
                <div>
                  {/* Card Image Header with Gradient Overlay */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#040A07]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091510] via-[#091510]/60 to-transparent" />
                    
                    {/* Floating Icon Over Image */}
                    <div className="absolute bottom-3 left-6 p-2.5 rounded-xl bg-[#05100B]/90 backdrop-blur-md border border-emerald-500/30 text-[#00F59B] shadow-lg">
                      <Icon weight="bold" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 pt-3 space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00F59B] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-base text-slate-300 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-white/10">
                      {cat.details.map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-base text-slate-300">
                          <div className="p-1 rounded-md bg-emerald-950/80 text-[#00F59B] shrink-0">
                            <Check weight="bold" className="w-3.5 h-3.5" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-2">
                  <a
                    href="#signup"
                    className="w-full flex items-center justify-between text-base font-semibold text-[#00F59B] hover:text-white py-2.5 border-t border-white/10 transition-colors group/btn cursor-pointer"
                  >
                    <span>Start escrow for this category</span>
                    <ArrowRight weight="bold" className="w-5 h-5 transform group-hover/btn:translate-x-1.5 transition-transform" />
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
