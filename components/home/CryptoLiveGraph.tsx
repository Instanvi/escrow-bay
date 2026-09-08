"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendUp,
  TrendDown,
  ArrowRight,
  ShieldCheck,
  ArrowsClockwise,
  ChartLineUp,
  Lightning,
  Coins,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  currentPrice: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  marketCap: string;
  historicalBase: number[];
}

const DEFAULT_CRYPTOS: Record<string, CryptoData> = {
  BTC: {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    icon: "/bitcoinlogo.svg",
    currentPrice: 91420.5,
    change24h: 3.42,
    high24h: 92800.0,
    low24h: 88950.0,
    volume24h: "$38.4B",
    marketCap: "$1.80T",
    historicalBase: [
      88400, 88900, 88600, 89300, 89100, 90200, 89800, 90700, 90400, 91100,
      90800, 91650, 91200, 91900, 91420,
    ],
  },
  ETH: {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    icon: "/ethereumlogo.svg",
    currentPrice: 3410.8,
    change24h: 2.15,
    high24h: 3490.0,
    low24h: 3310.0,
    volume24h: "$19.2B",
    marketCap: "$410.2B",
    historicalBase: [
      3310, 3340, 3325, 3360, 3350, 3390, 3375, 3420, 3395, 3430, 3410, 3445,
      3420, 3450, 3410,
    ],
  },
  SOL: {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    icon: "/solanalogo.svg",
    currentPrice: 198.4,
    change24h: 5.68,
    high24h: 204.5,
    low24h: 186.2,
    volume24h: "$7.8B",
    marketCap: "$94.1B",
    historicalBase: [
      186, 188, 187, 191, 190, 194, 193, 197, 195, 201, 198, 203, 199, 202,
      198.4,
    ],
  },
  USDT: {
    id: "tether",
    symbol: "USDT",
    name: "Tether USD",
    icon: "/tetherlogo.svg",
    currentPrice: 1.0,
    change24h: 0.02,
    high24h: 1.001,
    low24h: 0.999,
    volume24h: "$54.6B",
    marketCap: "$118.5B",
    historicalBase: [
      0.9998, 1.0001, 0.9999, 1.0002, 1.0, 0.9998, 1.0001, 1.0, 0.9999,
      1.0002, 1.0, 1.0001, 0.9998, 1.0, 1.0,
    ],
  },
};

export default function CryptoLiveGraph() {
  const [selectedSymbol, setSelectedSymbol] = useState<"BTC" | "ETH" | "SOL" | "USDT">("BTC");
  const [timeframe, setTimeframe] = useState<"24H" | "7D" | "1M" | "1Y">("24H");
  const [cryptoState, setCryptoState] = useState<Record<string, CryptoData>>(DEFAULT_CRYPTOS);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("Just now");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch live market data from public crypto APIs
  const fetchLiveData = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true",
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        setCryptoState((prev) => ({
          ...prev,
          BTC: {
            ...prev.BTC,
            currentPrice: data.bitcoin?.usd ?? prev.BTC.currentPrice,
            change24h: Number(data.bitcoin?.usd_24h_change?.toFixed(2)) || prev.BTC.change24h,
            volume24h: data.bitcoin?.usd_24h_vol
              ? `$${(data.bitcoin.usd_24h_vol / 1e9).toFixed(1)}B`
              : prev.BTC.volume24h,
            marketCap: data.bitcoin?.usd_market_cap
              ? `$${(data.bitcoin.usd_market_cap / 1e12).toFixed(2)}T`
              : prev.BTC.marketCap,
          },
          ETH: {
            ...prev.ETH,
            currentPrice: data.ethereum?.usd ?? prev.ETH.currentPrice,
            change24h: Number(data.ethereum?.usd_24h_change?.toFixed(2)) || prev.ETH.change24h,
            volume24h: data.ethereum?.usd_24h_vol
              ? `$${(data.ethereum.usd_24h_vol / 1e9).toFixed(1)}B`
              : prev.ETH.volume24h,
            marketCap: data.ethereum?.usd_market_cap
              ? `$${(data.ethereum.usd_market_cap / 1e9).toFixed(1)}B`
              : prev.ETH.marketCap,
          },
          SOL: {
            ...prev.SOL,
            currentPrice: data.solana?.usd ?? prev.SOL.currentPrice,
            change24h: Number(data.solana?.usd_24h_change?.toFixed(2)) || prev.SOL.change24h,
            volume24h: data.solana?.usd_24h_vol
              ? `$${(data.solana.usd_24h_vol / 1e9).toFixed(1)}B`
              : prev.SOL.volume24h,
            marketCap: data.solana?.usd_market_cap
              ? `$${(data.solana.usd_market_cap / 1e9).toFixed(1)}B`
              : prev.SOL.marketCap,
          },
          USDT: {
            ...prev.USDT,
            currentPrice: data.tether?.usd ?? prev.USDT.currentPrice,
            change24h: Number(data.tether?.usd_24h_change?.toFixed(2)) || prev.USDT.change24h,
          },
        }));
        setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      }
    } catch (err) {
      // Fallback gracefully without breaking UI
      console.warn("Live API fetch fallback active:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 45000); // refresh every 45s
    return () => clearInterval(interval);
  }, []);

  const currentCoin = cryptoState[selectedSymbol];

  // Generate synthetic price points for the selected timeframe
  const points = useMemo(() => {
    const base = currentCoin.historicalBase;
    const factor = timeframe === "24H" ? 1 : timeframe === "7D" ? 1.04 : timeframe === "1M" ? 1.12 : 1.25;
    
    // 24 points for the SVG curve
    const interpolated: number[] = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const idx = Math.floor((i / (count - 1)) * (base.length - 1));
      const val = base[idx] * (1 + (Math.sin(i * 0.7) * 0.012 * (timeframe === "24H" ? 1 : 2)));
      interpolated.push(val);
    }
    // ensure last point matches current price
    interpolated[interpolated.length - 1] = currentCoin.currentPrice;
    return interpolated;
  }, [currentCoin, timeframe]);

  // Compute SVG Polyline / Path
  const { pathData, areaData, minVal, maxVal, coordinates } = useMemo(() => {
    const min = Math.min(...points) * 0.995;
    const max = Math.max(...points) * 1.005;
    const range = max - min || 1;

    const width = 800;
    const height = 300;
    const padding = 20;

    const coords = points.map((val, idx) => {
      const x = padding + (idx / (points.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return { x, y, val };
    });

    // Create SVG smooth path
    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      const midX = (prev.x + curr.x) / 2;
      d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    const area = `${d} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

    return {
      pathData: d,
      areaData: area,
      minVal: min,
      maxVal: max,
      coordinates: coords,
    };
  }, [points]);

  const isPositive = currentCoin.change24h >= 0;
  const activeHoverPoint = hoveredIndex !== null ? coordinates[hoveredIndex] : null;

  return (
    <section className="py-20 bg-[#04080B] relative border-t border-emerald-500/15 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00F59B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[#00F59B] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
              <span>Live Escrow Settlement Rates</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Real-Time Crypto <span className="text-gradient-emerald">Market & Vault Feed</span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Lock collateral at exact market prices. Multi-signature smart contracts protect both parties from price volatility during active escrow deals.
            </p>
          </div>

          {/* Live Status & Manual Refresh */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="text-xs text-slate-400">
              Updated: <span className="text-slate-200 font-mono">{lastUpdated}</span>
            </div>
            <button
              type="button"
              onClick={fetchLiveData}
              disabled={isUpdating}
              className="p-2 rounded-xl bg-[#091510] border border-white/10 text-slate-300 hover:text-[#00F59B] hover:border-emerald-500/40 transition-all cursor-pointer"
              title="Refresh live rates"
            >
              <ArrowsClockwise weight="bold" className={`w-4 h-4 ${isUpdating ? "animate-spin text-[#00F59B]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Main Graph Card */}
        <div className="bg-[#07100B] rounded-3xl border border-emerald-500/25 p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          
          {/* Top Bar: Coin Selector Tabs & Timeframes */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            
            {/* Coin Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(["BTC", "ETH", "SOL", "USDT"] as const).map((sym) => {
                const coin = cryptoState[sym];
                const active = selectedSymbol === sym;
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => {
                      setSelectedSymbol(sym);
                      setHoveredIndex(null);
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? "bg-[#091F15] border-[#00F59B] text-white shadow-[0_0_20px_rgba(0,245,155,0.15)] font-bold"
                        : "bg-[#050B08] border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    <Image
                      src={coin.icon}
                      alt={coin.name}
                      width={22}
                      height={22}
                      className="w-5.5 h-5.5 rounded-full object-contain"
                    />
                    <span className="text-sm font-semibold">{coin.symbol}</span>
                    <span
                      className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                        coin.change24h >= 0
                          ? "bg-emerald-950/80 text-[#00F59B]"
                          : "bg-red-950/80 text-red-400"
                      }`}
                    >
                      {coin.change24h >= 0 ? "+" : ""}
                      {coin.change24h}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-[#040806] rounded-xl border border-white/10 self-end lg:self-auto">
              {(["24H", "7D", "1M", "1Y"] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => {
                    setTimeframe(tf);
                    setHoveredIndex(null);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    timeframe === tf
                      ? "bg-[#00F59B] text-[#04100C] font-bold shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

          </div>

          {/* Current Price & 24h Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10">
            <div>
              <div className="text-xs text-slate-400 mb-1">Live Market Price</div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                ${currentCoin.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${isPositive ? "text-[#00F59B]" : "text-red-400"}`}>
                {isPositive ? <TrendUp weight="bold" className="w-4 h-4" /> : <TrendDown weight="bold" className="w-4 h-4" />}
                <span>{isPositive ? "+" : ""}{currentCoin.change24h}% in {timeframe}</span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">24h High / Low</div>
              <div className="text-sm font-semibold text-slate-200">
                ${currentCoin.high24h.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Low: ${currentCoin.low24h.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">24h Trading Volume</div>
              <div className="text-sm font-semibold text-slate-200">
                {currentCoin.volume24h}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Market Cap: {currentCoin.marketCap}
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-400 mb-1">Escrow Collateral Speed</div>
              <div className="text-sm font-semibold text-[#00F59B] flex items-center gap-1.5">
                <Lightning weight="bold" className="w-4 h-4" />
                <span>Instant Multi-Sig Lock</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                0% Liquidation / Slippage
              </div>
            </div>
          </div>

          {/* Interactive SVG Chart Canvas */}
          <div
            ref={containerRef}
            className="relative w-full h-[280px] sm:h-[320px] mt-4 select-none cursor-crosshair"
            onMouseMove={(e) => {
              if (!containerRef.current) return;
              const rect = containerRef.current.getBoundingClientRect();
              const relativeX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, relativeX / rect.width));
              const index = Math.round(ratio * (coordinates.length - 1));
              setHoveredIndex(index);
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <svg
              viewBox="0 0 800 300"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00F59B" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#00F59B" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#00F59B" stopOpacity="0.00" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Horizontal grid lines */}
              <line x1="0" y1="75" x2="800" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="225" x2="800" y2="225" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

              {/* Area fill */}
              <path d={areaData} fill="url(#chartGradient)" />

              {/* Smooth line */}
              <path
                d={pathData}
                fill="none"
                stroke="#00F59B"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
              />

              {/* Hover Crosshair & Indicator */}
              {activeHoverPoint && (
                <>
                  <line
                    x1={activeHoverPoint.x}
                    y1="0"
                    x2={activeHoverPoint.x}
                    y2="300"
                    stroke="rgba(0,245,155,0.6)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <circle
                    cx={activeHoverPoint.x}
                    cy={activeHoverPoint.y}
                    r="6"
                    fill="#00F59B"
                    stroke="#04100C"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                </>
              )}
            </svg>

            {/* Floating Tooltip */}
            {activeHoverPoint && (
              <div
                className="absolute top-2 p-2.5 rounded-xl bg-[#05100B]/95 border border-[#00F59B]/60 text-white shadow-xl pointer-events-none transform -translate-x-1/2 backdrop-blur-md z-20 text-xs"
                style={{
                  left: `${(activeHoverPoint.x / 800) * 100}%`,
                }}
              >
                <div className="text-slate-400 font-mono text-[10px]">Escrow Index Price</div>
                <div className="text-sm font-bold text-[#00F59B]">
                  ${activeHoverPoint.val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Escrow Settlement CTA Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B]">
                <ShieldCheck weight="bold" className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-white">Need to lock {currentCoin.symbol} in escrow?</span>
                <p className="text-xs text-slate-400">Lock collateral with threshold multi-sig signatures and zero volatility exposure.</p>
              </div>
            </div>

            <Button asChild className="w-full sm:w-auto h-12 px-6 font-bold text-sm rounded-xl">
              <Link href="/signup">
                <span>Start {currentCoin.symbol} Escrow</span>
                <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
              </Link>
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
