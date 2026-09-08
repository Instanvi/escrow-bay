"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Check,
} from "@phosphor-icons/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const [role, setRole] = useState<"buying" | "selling" | "brokering">("buying");
  const [category, setCategory] = useState("General merchandise");
  const [amount, setAmount] = useState("5000");
  const [crypto, setCrypto] = useState("USDT");

  const categories = [
    "General merchandise",
    "Cryptocurrency & digital assets",
    "Vehicles (cars, boats, bikes)",
    "Jewelry & luxury goods",
    "Services & milestone contracts",
    "Business & brokered deals",
  ];

  const cryptos = [
    { code: "USDT", file: "/tetherlogo.svg", label: "Tether (USDT)" },
    { code: "USDC", file: "/usdclogo.svg", label: "USD Coin (USDC)" },
    { code: "BTC", file: "/bitcoinlogo.svg", label: "Bitcoin (BTC)" },
    { code: "ETH", file: "/ethereumlogo.svg", label: "Ethereum (ETH)" },
    { code: "SOL", file: "/solanalogo.svg", label: "Solana (SOL)" },
  ];

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "#signup";
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-grid-pattern ambient-glow-emerald">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Neither side moves <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">until both sides are sure.</span>
            </h1>

            {/* Sub-Headline */}
            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Escrow Bay holds the payment while the deal completes - crypto, vehicles, merchandise, or milestone work. Funds only move when the buyer confirms.
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>Licensed trust accounts</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>BTC, ETH, SOL, USDT + fiat</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>No chargebacks</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>Fixed inspection windows</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-7 text-base">
                <a href="#signup">
                  <Lock weight="bold" className="w-4 h-4 text-[#04100C]" />
                  <span>Start a transaction</span>
                  <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
                </a>
              </Button>

              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-6 text-base">
                <a href="#how-it-works">
                  <span>See how it works</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Quick-Start Escrow Widget */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B1013] rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-[#00F59B]">
                  <ShieldCheck weight="bold" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Create Escrow Deal</h3>
                  <p className="text-sm text-slate-400">Lock collateral & generate agreement</p>
                </div>
              </div>

              <form onSubmit={handleQuickStart} className="space-y-4">
                
                {/* 3 Roles Switcher: Buying | Selling | Brokering */}
                <div>
                  <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-[#06090B] rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setRole("buying")}
                      className={`py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all cursor-pointer ${
                        role === "buying"
                          ? "bg-[#00F59B] text-[#04100C] shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Buying
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("selling")}
                      className={`py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all cursor-pointer ${
                        role === "selling"
                          ? "bg-[#00F59B] text-[#04100C] shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Selling
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("brokering")}
                      className={`py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all cursor-pointer ${
                        role === "brokering"
                          ? "bg-[#00F59B] text-[#04100C] shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Brokering
                    </button>
                  </div>
                </div>

                {/* What are you paying for? */}
                <div>
                  <label className="block text-base font-medium text-slate-200 mb-2">
                    What are you paying for?
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select transaction category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount & Currency */}
                <div>
                  <label className="block text-base font-medium text-slate-200 mb-2">
                    Settle in
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                        $
                      </span>
                      <Input
                        type="number"
                        min="50"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="5000"
                        className="pl-8 pr-3"
                      />
                    </div>
                    <Select value={crypto} onValueChange={setCrypto}>
                      <SelectTrigger className="h-12 text-[#00F59B] font-semibold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptos.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Estimate Notice */}
                <div className="p-4 rounded-xl bg-[#06090B] border border-white/10 text-sm text-slate-300 space-y-1">
                  <div className="flex items-center justify-between font-medium">
                    <span>Estimated Escrow Fee (~1.2%):</span>
                    <span className="text-[#00F59B] font-bold text-base">
                      ${Math.max(25, (Number(amount || 0) * 0.012)).toFixed(2)} {crypto}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    *Held safely in cold custody until inspection is approved.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-base">
                  <Lock weight="bold" className="w-4 h-4 text-[#04100C]" />
                  <span>Get started</span>
                  <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
                </Button>
              </form>
            </div>
          </div>

        </div>

        {/* Live Metrics */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              $40M<span className="text-[#00F59B]">+</span>
            </div>
            <div className="text-base text-slate-400">Held and released safely</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              12,000<span className="text-[#00F59B]">+</span>
            </div>
            <div className="text-base text-slate-400">Transactions completed</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              0
            </div>
            <div className="text-base text-slate-400">Chargebacks issued</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              100<span className="text-[#00F59B]">%</span>
            </div>
            <div className="text-base text-slate-400">Multi-Sig Vault Backing</div>
          </div>
        </div>

      </div>
    </section>
  );
}
