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
        
        {/* Centered Content */}
        <div className="flex flex-col items-center text-center space-y-8 pb-12 border-b border-white/10">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl font-bold tracking-tight text-white">
              Escrow<span className="text-[#00F59B]">Bay</span>
            </span>
          </Link>

          {/* Description */}
          <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
            Institutional-grade crypto escrow protocol for physical merchandise, contractor milestones, and high-value commerce. Safe settlement in Bitcoin, Ethereum, Solana, and USDT.
          </p>

          {/* Centered Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base">
            <a href="#how-it-works" className="hover:text-[#00F59B] transition-colors">
              How It Works
            </a>
            <a href="#categories" className="hover:text-[#00F59B] transition-colors">
              Categories
            </a>
            <a href="#protection" className="hover:text-[#00F59B] transition-colors">
              Protection
            </a>
            <Link href="/terms" className="hover:text-[#00F59B] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#00F59B] transition-colors">
              Privacy
            </Link>
            <a href="#faq" className="hover:text-[#00F59B] transition-colors">
              FAQ
            </a>
          </nav>

          {/* Crypto Badges */}
          <div className="space-y-3 pt-2">
            <div className="text-sm text-slate-400 font-medium">
              Supported Settlement Assets
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
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
