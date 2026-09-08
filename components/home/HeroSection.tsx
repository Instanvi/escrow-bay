"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Check,
  UsersThree,
  Coins,
  Scales,
  Clock,
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
  const [brokerFeePercent, setBrokerFeePercent] = useState("5");

  const categories = [
    "General merchandise & electronics",
    "Cryptocurrency & digital assets",
    "Vehicles & classic cars",
    "Jewelry & luxury timepieces",
    "Services & milestone contracts",
    "Business & brokered deals",
  ];

  const cryptos = [
    { code: "USDT", file: "/tetherlogo.svg", label: "Tether (USDT)" },
    { code: "USDC", file: "/usdclogo.svg", label: "USD Coin (USDC)" },
    { code: "BTC", file: "/bitcoinlogo.svg", label: "Bitcoin (BTC)" },
    { code: "ETH", file: "/ethereumlogo.svg", label: "Ethereum (ETH)" },
    { code: "SOL", file: "/solanalogo.svg", label: "Solana (SOL)" },
    { code: "USD", file: "/globe.svg", label: "US Dollar (USD)" },
  ];

  const formatAmount = (val: number, asset: string) => {
    const formatted = val.toLocaleString(undefined, {
      minimumFractionDigits: asset === "BTC" || asset === "ETH" ? 4 : 2,
      maximumFractionDigits: asset === "BTC" || asset === "ETH" ? 6 : 2,
    });
    return asset === "USD" ? `$${formatted} USD` : `${formatted} ${asset}`;
  };

  const parsedAmount = Math.max(0, Number(amount) || 0);
  const estimatedEscrowFee = Math.max(25, parsedAmount * 0.012);
  const brokerCommission = (parsedAmount * (Number(brokerFeePercent) || 0)) / 100;

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/signup";
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#040907] bg-grid-pattern ambient-glow-emerald">
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

            {/* Accurate Feature Checkpoints (Custody Split Clearly Explained) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>Multi-sig custody for crypto</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>Licensed trust accounts for USD</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>Zero chargebacks or reversals</span>
              </div>
              <div className="flex items-center gap-3 text-base text-slate-200">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-[#00F59B]">
                  <Check weight="bold" className="w-4 h-4" />
                </div>
                <span>Fixed 1 to 14-day inspection windows</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-7 text-base">
                <Link href="/signup">
                  <Lock weight="bold" className="w-4 h-4 text-[#04100C]" />
                  <span>Start a transaction</span>
                  <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
                </Link>
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
            <div className="bg-[#091510] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-5">
                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-[#00F59B]">
                  <ShieldCheck weight="bold" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {role === "brokering" ? "Coordinate 3-Party Deal" : "Create Escrow Agreement"}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {role === "brokering"
                      ? "Lock buyer deposit & guarantee commission"
                      : "Lock collateral & generate agreement"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleQuickStart} className="space-y-4">
                
                {/* 3 Roles Switcher: Buying | Selling | Brokering */}
                <div>
                  <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#06090B] rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setRole("buying")}
                      className={`py-2.5 text-sm sm:text-base font-semibold rounded-lg transition-all cursor-pointer ${
                        role === "buying"
                          ? "bg-[#00F59B] text-[#04100C] shadow-md font-bold"
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
                          ? "bg-[#00F59B] text-[#04100C] shadow-md font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Selling
                    </button>
                  </div>
                </div>

                {/* What are you paying for? */}
                <div>
                  <label className="block text-base font-medium text-slate-200 mb-2">
                    {role === "brokering" ? "Brokered transaction category" : "What are you paying for?"}
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

                {/* Amount & Currency with exact prefix rendering */}
                <div>
                  <label className="block text-base font-medium text-slate-200 mb-2">
                    Deal value & settlement asset
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 relative">
                      {crypto === "USD" ? (
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base font-semibold">
                          $
                        </span>
                      ) : (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          {crypto}
                        </span>
                      )}
                      <Input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="5000"
                        className={crypto === "USD" ? "pl-8 pr-3" : "pl-16 pr-3"}
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

                {/* Downstream Branching for Brokering Role */}
                {role === "brokering" && (
                  <div className="p-4 rounded-xl bg-[#060E0A] border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                        <UsersThree weight="bold" className="w-4 h-4 text-[#00F59B]" />
                        <span>Broker Commission Fee</span>
                      </label>
                      <span className="text-sm font-bold text-[#00F59B]">
                        {brokerFeePercent}% ({formatAmount(brokerCommission, crypto)})
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {["2.5", "5", "7.5", "10"].map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          onClick={() => setBrokerFeePercent(pct)}
                          className={`py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            brokerFeePercent === pct
                              ? "bg-emerald-950 border-[#00F59B] text-[#00F59B]"
                              : "bg-[#040806] border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      *Commission is automatically deducted upon buyer release and sent directly to your payout wallet.
                    </p>
                  </div>
                )}

                {/* Estimate Notice with Clean Currency Rendering */}
                <div className="p-4 rounded-xl bg-[#06090B] border border-white/10 text-sm text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between font-medium">
                    <span>Estimated Escrow Bay Fee (~1.2%):</span>
                    <span className="text-[#00F59B] font-bold text-base">
                      {formatAmount(estimatedEscrowFee, crypto)}
                    </span>
                  </div>
                  {role === "brokering" && (
                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-white/5">
                      <span>Your Guaranteed Broker Payout:</span>
                      <span className="text-white font-bold">
                        {formatAmount(brokerCommission, crypto)}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-slate-400">
                    *Locked securely in {crypto === "USD" ? "licensed trust account" : "multi-sig vault escrow"} until inspection approval.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-base">
                  <Lock weight="bold" className="w-4 h-4 text-[#04100C]" />
                  <span>{role === "brokering" ? "Start 3-party broker deal" : "Get started"}</span>
                  <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
                </Button>
              </form>
            </div>
          </div>

        </div>

        {/* Verifiable Operational Commitments (Replaced fabricated metrics) */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-5 rounded-2xl bg-[#091510] border border-white/10 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] w-fit">
              <ShieldCheck weight="bold" className="w-5 h-5" />
            </div>
            <div className="text-base font-bold text-white">Multi-Sig Vault Custody</div>
            <div className="text-sm text-slate-400 leading-relaxed">
              Multi-signature threshold keys govern all crypto escrow releases.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#091510] border border-white/10 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] w-fit">
              <Coins weight="bold" className="w-5 h-5" />
            </div>
            <div className="text-base font-bold text-white">Licensed Fiat Trust</div>
            <div className="text-sm text-slate-400 leading-relaxed">
              USD bank deposits are held in dedicated, regulated escrow accounts.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#091510] border border-white/10 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] w-fit">
              <Clock weight="bold" className="w-5 h-5" />
            </div>
            <div className="text-base font-bold text-white">Fixed Inspection Window</div>
            <div className="text-sm text-slate-400 leading-relaxed">
              1 to 14-day guaranteed inspection periods protect buyers before payout.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#091510] border border-white/10 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] w-fit">
              <Scales weight="bold" className="w-5 h-5" />
            </div>
            <div className="text-base font-bold text-white">Impartial Human Arbitration</div>
            <div className="text-sm text-slate-400 leading-relaxed">
              Expert case managers evaluate serials and tracking in disputes.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
