"use client";

import { useState, useMemo } from "react";
import {
  ShieldCheck,
  ArrowRight,
  Lightning,
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

export default function FeeCalculator() {
  const [amount, setAmount] = useState<number>(12500);
  const [crypto, setCrypto] = useState("USDT");
  const [category, setCategory] = useState("General merchandise");
  const [split, setSplit] = useState<"buyer" | "split" | "seller">("split");

  const categories = [
    "Cryptocurrency",
    "Vehicles",
    "General merchandise",
    "Jewelry & luxury goods",
    "Services & milestones",
    "Business & brokered deals",
  ];

  const cryptos = ["USDT", "USDC", "BTC", "ETH", "SOL", "USD"];

  const presets = [1000, 5000, 15000, 50000, 100000, 250000];

  // Fee calculation logic
  const { feeRate, feeTotal, buyerFee, sellerFee, totalBuyerPays, netSellerReceives } = useMemo(() => {
    let rate = 0.022; // default 2.2%
    if (amount > 100000) {
      rate = 0.0085; // 0.85%
    } else if (amount > 25000) {
      rate = 0.0125; // 1.25%
    } else if (amount > 5000) {
      rate = 0.018; // 1.80%
    }

    const calculatedFee = Math.max(25, amount * rate);
    
    let buyerShare = 0;
    let sellerShare = 0;

    if (split === "buyer") {
      buyerShare = calculatedFee;
      sellerShare = 0;
    } else if (split === "seller") {
      buyerShare = 0;
      sellerShare = calculatedFee;
    } else {
      buyerShare = calculatedFee / 2;
      sellerShare = calculatedFee / 2;
    }

    return {
      feeRate: (rate * 100).toFixed(2),
      feeTotal: calculatedFee,
      buyerFee: buyerShare,
      sellerFee: sellerShare,
      totalBuyerPays: amount + buyerShare,
      netSellerReceives: amount - sellerShare,
    };
  }, [amount, split]);

  return (
    <section id="calculator" className="py-24 bg-[#07110C] relative border-t border-emerald-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Live Escrow <span className="text-gradient-emerald">Fee Calculator</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            No hidden costs, monthly subscriptions, or surprise withdrawal fees. Calculate exact costs for any crypto or merchandise transaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-[#0B1A13] rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 shadow-2xl">
            
            {/* Currency & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-slate-200 mb-2">
                  1. Settlement Currency / Asset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {cryptos.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCrypto(c)}
                      className={`py-2.5 text-base font-semibold rounded-lg border transition-all cursor-pointer ${
                        crypto === c
                          ? "bg-emerald-950/80 border-[#00F59B] text-[#00F59B] shadow-sm"
                          : "bg-[#06090B] border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-slate-200 mb-2">
                  2. Category of Goods / Service
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
            </div>

            {/* Amount Slider & Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-base font-medium text-slate-200">
                  3. Deal Value ({crypto})
                </label>
                <span className="text-base text-emerald-400 font-bold">
                  ${amount.toLocaleString()} {crypto}
                </span>
              </div>

              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                  $
                </span>
                <Input
                  type="number"
                  min="50"
                  max="5000000"
                  step="100"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(50, Number(e.target.value) || 0))}
                  className="pl-8 pr-4"
                />
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-400 font-medium">Quick Pick:</span>
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(p)}
                    className="px-3 py-1.5 rounded-lg bg-[#06090B] hover:bg-white/10 border border-white/10 text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    ${p >= 1000 ? `${p / 1000}k` : p}
                  </button>
                ))}
              </div>
            </div>

            {/* Fee Split Selector */}
            <div>
              <label className="block text-base font-medium text-slate-200 mb-2">
                4. Who Pays the Escrow Bay Fee?
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSplit("buyer")}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    split === "buyer"
                      ? "bg-emerald-950/70 border-[#00F59B] text-[#00F59B]"
                      : "bg-[#06090B] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="text-base font-bold">Buyer Pays</div>
                  <div className="text-xs text-slate-400 mt-0.5">100% of Fee</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSplit("split")}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    split === "split"
                      ? "bg-emerald-950/70 border-[#00F59B] text-[#00F59B]"
                      : "bg-[#06090B] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="text-base font-bold">50 / 50 Split</div>
                  <div className="text-xs text-slate-400 mt-0.5">Equally Shared</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSplit("seller")}
                  className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                    split === "seller"
                      ? "bg-emerald-950/70 border-[#00F59B] text-[#00F59B]"
                      : "bg-[#06090B] border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="text-base font-bold">Seller Pays</div>
                  <div className="text-xs text-slate-400 mt-0.5">100% of Fee</div>
                </button>
              </div>
            </div>

          </div>

          {/* Breakdown Card */}
          <div className="lg:col-span-5 bg-[#0A1D15] rounded-3xl p-6 sm:p-8 border border-emerald-500/40 relative overflow-hidden space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck weight="bold" className="w-5 h-5 text-[#00F59B]" />
                <h3 className="text-lg font-bold text-white">Cost Breakdown</h3>
              </div>
              <span className="text-sm font-semibold text-emerald-400">
                Tier Rate: {feeRate}%
              </span>
            </div>

            <div className="space-y-4 text-base">
              <div className="flex items-center justify-between text-slate-300">
                <span>Transaction Value:</span>
                <span className="text-white font-semibold">
                  ${amount.toLocaleString()} {crypto}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Total Escrow Bay Fee:</span>
                <span className="text-emerald-400 font-bold">
                  ${feeTotal.toFixed(2)} {crypto}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-400 pl-3 border-l-2 border-white/10 text-sm">
                <span>Buyer Fee Share:</span>
                <span className="text-slate-200 font-medium">
                  ${buyerFee.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-400 pl-3 border-l-2 border-white/10 text-sm">
                <span>Seller Fee Share:</span>
                <span className="text-slate-200 font-medium">
                  ${sellerFee.toFixed(2)}
                </span>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="p-4 rounded-xl bg-[#06090B] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-300">Total Paid by Buyer</div>
                    <div className="text-xs text-slate-500">(Includes buyer fee share)</div>
                  </div>
                  <div className="text-lg font-bold text-white">
                    ${totalBuyerPays.toFixed(2)} {crypto}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-emerald-400 font-medium">Net Received by Seller</div>
                    <div className="text-xs text-slate-400">(Disbursed after inspection)</div>
                  </div>
                  <div className="text-lg font-bold text-[#00F59B]">
                    ${netSellerReceives.toFixed(2)} {crypto}
                  </div>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="w-full h-14 text-base">
              <a href="#signup">
                <Lightning weight="bold" className="w-4 h-4 text-[#04100C]" />
                <span>Lock Deal with this Calculation</span>
                <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
              </a>
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
