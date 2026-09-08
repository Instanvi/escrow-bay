"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Wallet,
  Package,
  ShieldCheck,
  CheckCircle,
  Lock,
  ArrowRight,
} from "@phosphor-icons/react";

export default function ProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Buyer and seller agree on terms",
      icon: FileText,
      summary: "Price, item or service, and delivery timeline are set before anything moves.",
      details: [
        "Pre-agreed transaction details and pricing",
        "Clear delivery and tracking guidelines",
        "Transparent inspection duration upfront",
      ],
    },
    {
      num: "02",
      title: "Buyer sends payment to Escrow Bay",
      icon: Wallet,
      summary: "Funds are held in a secured account: crypto in multi-sig vault escrow, fiat in a licensed trust account.",
      details: [
        "Direct deposit into multi-sig vault or trust account",
        "Immediate locked collateral confirmation for seller",
        "Zero risk of counterparty chargeback or recall",
      ],
    },
    {
      num: "03",
      title: "Seller delivers the goods or service",
      icon: Package,
      summary: "Shipping, handover, or milestone work proceeds once payment is confirmed as held.",
      details: [
        "Seller proceeds with 100% guaranteed payment proof",
        "Full courier tracking and milestone verification",
        "No work or shipping without locked escrow backing",
      ],
    },
    {
      num: "04",
      title: "Buyer inspects and approves",
      icon: ShieldCheck,
      summary: "A fixed inspection window gives the buyer time to confirm everything matches what was agreed.",
      details: [
        "Dedicated inspection window (e.g. 1 to 14 days)",
        "Inspect merchandise condition or verify deliverable",
        "Option to accept or initiate mediation if discrepancies occur",
      ],
    },
    {
      num: "05",
      title: "Escrow Bay releases payment",
      icon: CheckCircle,
      summary: "Once approved, funds are released to the seller in the same asset with no delay.",
      details: [
        "Instant on-chain or bank wire disbursement",
        "Low transparent escrow fee deduction",
        "Final cryptographic transaction record",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#070D12] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            One path, <span className="text-gradient-emerald">five checkpoints</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Every transaction on Escrow Bay follows the same sequence, whether you are settling in stablecoin or shipping a classic car.
          </p>
        </div>

        {/* Real Photo Workflow Banner */}
        <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src="/handshake.jpg"
            alt="Escrow Bay Transaction Workflow"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D12]/95 via-[#070D12]/75 to-transparent" />
          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between max-w-2xl">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Cryptographically Secured from Agreement to Final Release
              </h3>
              <p className="text-base text-slate-300 leading-relaxed hidden sm:block">
                Funds remain locked in multi-sig smart vaults (or licensed trust accounts for USD) while goods are shipped and inspected. Both parties remain 100% protected at every milestone.
              </p>
            </div>
            <div className="flex items-center gap-6 pt-2 text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F59B]" /> 1 to 14 Day Inspection
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F59B]" /> Multi-Sig Vaults
              </span>
            </div>
          </div>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? "border-[#00F59B]/60 bg-[#0E1A22] shadow-xl shadow-[#00F59B]/10"
                    : "bg-[#0A131A] border border-white/10 hover:border-white/20 hover:bg-[#0D1820]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#00F59B]">
                      {step.num}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-[#00F59B] text-[#04100C]"
                          : "bg-white/5 text-slate-300"
                      }`}
                    >
                      <Icon weight="bold" className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-base text-slate-300 leading-relaxed">
                    {step.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Step Detailed Focus Card */}
        <div className="rounded-2xl p-6 sm:p-8 border border-emerald-500/25 bg-[#0A141B] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <h4 className="text-xl font-bold text-white">
                Checkpoint {steps[activeStep].num}: {steps[activeStep].title}
              </h4>
              <p className="text-base text-slate-300 leading-relaxed">
                {steps[activeStep].summary}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {steps[activeStep].details.map((detail) => (
                  <div key={detail} className="flex items-start gap-2.5 text-base text-slate-200 bg-[#070E14] p-3.5 rounded-xl border border-white/10">
                    <span className="text-[#00F59B] font-bold text-base">✓</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#070E14] rounded-xl border border-emerald-500/20 text-center space-y-2">
              <Lock weight="bold" className="w-8 h-8 text-[#00F59B]" />
              <div className="text-base font-bold text-white">Escrow Bay Smart Protocol</div>
              <p className="text-base text-slate-400">
                Segregated custodial holding with automated release triggers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
