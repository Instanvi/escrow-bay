import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const cryptos = [
    { name: "USDT", file: "/tetherlogo.svg" },
    { name: "BTC", file: "/bitcoinlogo.svg" },
    { name: "ETH", file: "/ethereumlogo.svg" },
    { name: "SOL", file: "/solanalogo.svg" },
    { name: "USDC", file: "/usdclogo.svg" },
  ];

  return (
    <footer className="bg-[#040709] border-t border-white/10 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-2xl font-bold tracking-tight text-white">
                Escrow<span className="text-[#00F59B]">Bay</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] ml-0.5" />
            </Link>

            <p className="text-base text-slate-300 max-w-sm leading-relaxed">
              Institutional-grade crypto escrow protocol for physical merchandise, contractor milestones, and high-value commerce. Safe settlement in Bitcoin, Ethereum, Solana, and USDT.
            </p>

            {/* Crypto Badges referencing public SVG files */}
            <div className="space-y-2 pt-2">
              <div className="text-sm text-slate-400 font-medium">
                Supported Settlement Assets
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {cryptos.map((c) => (
                  <span
                    key={c.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-200 font-medium hover:border-[#00F59B]/40 transition-colors"
                  >
                    <Image
                      src={c.file}
                      alt={c.name}
                      width={20}
                      height={20}
                      className="rounded-full w-5 h-5 object-contain"
                    />
                    <span>{c.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Escrow Solutions
            </h4>
            <ul className="space-y-2.5 text-base">
              <li>
                <a href="#categories" className="hover:text-[#00F59B] transition-colors">
                  Physical Merchandise
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#00F59B] transition-colors">
                  Freelance & Contractor Milestones
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#00F59B] transition-colors">
                  Luxury Watches & Fine Jewelry
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#00F59B] transition-colors">
                  Vehicles & Heavy Equipment
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#00F59B] transition-colors">
                  Cross-Border B2B Wholesale
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-[#00F59B] transition-colors">
                  Digital Assets & SaaS Equity
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & Protection */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Trust & Security
            </h4>
            <ul className="space-y-2.5 text-base">
              <li>
                <a href="#protection" className="hover:text-[#00F59B] transition-colors">
                  Buyer Protection Matrix
                </a>
              </li>
              <li>
                <a href="#protection" className="hover:text-[#00F59B] transition-colors">
                  Seller Chargeback Immunity
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#00F59B] transition-colors">
                  Inspection Period Protocol
                </a>
              </li>
              <li>
                <Link href="/dispute-rules" className="hover:text-[#00F59B] transition-colors">
                  Neutral Dispute Arbitration
                </Link>
              </li>
              <li>
                <a href="#security" className="hover:text-[#00F59B] transition-colors">
                  Multi-Sig Cold Storage
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#00F59B] transition-colors">
                  Fee Schedule Breakdown
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Legal & Policies
            </h4>
            <ul className="space-y-2.5 text-base">
              <li>
                <Link href="/terms" className="hover:text-[#00F59B] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#00F59B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/dispute-rules" className="hover:text-[#00F59B] transition-colors">
                  General Escrow Instructions
                </Link>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#00F59B] transition-colors">
                  FAQ & Knowledge Base
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
              100% Vault Uptime
            </span>
            <span>•</span>
            <span>Multi-Signature Escrow Infrastructure</span>
          </div>

          <div>
            &copy; {currentYear} Escrow Bay. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
