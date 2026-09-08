import Image from "next/image";
import {
  ShieldCheck,
  Lock,
  Scales,
  Lightning,
} from "@phosphor-icons/react/dist/ssr";

export default function CryptoSecuritySection() {
  const supportedCoins = [
    {
      name: "Tether (USDT)",
      chains: "TRC-20 • ERC-20 • Solana",
      file: "/tetherlogo.svg",
      desc: "Instant zero-volatility dollar settlement. The gold standard for merchandise and contractor escrow.",
    },
    {
      name: "USD Coin (USDC)",
      chains: "ERC-20 • Solana • Base",
      file: "/usdclogo.svg",
      desc: "Fully backed stablecoin with audited reserves for high-value enterprise commercial deals.",
    },
    {
      name: "Bitcoin (BTC)",
      chains: "Native Bitcoin • SegWit",
      file: "/bitcoinlogo.svg",
      desc: "Store-of-value settlement for luxury automobiles, machinery, and cross-border commerce.",
    },
    {
      name: "Ethereum (ETH)",
      chains: "Mainnet • Arbitrum • Optimism",
      file: "/ethereumlogo.svg",
      desc: "Smart-contract programmable escrow for developer milestones and tech acquisitions.",
    },
    {
      name: "Solana (SOL)",
      chains: "Solana High-Speed L1",
      file: "/solanalogo.svg",
      desc: "Sub-second block confirmation with near-zero gas fees for rapid merchandise checkout.",
    },
  ];

  const securityPillars = [
    {
      title: "Multi-Signature Vaults",
      desc: "No single party or automated script can move escrow funds unilaterally. Threshold signatures require multi-party consensus.",
      icon: Lock,
    },
    {
      title: "Segregated Vault Architecture",
      desc: "Escrow funds are held in dedicated multi-sig vaults for crypto and segregated trust accounts for USD, never commingled with operating capital.",
      icon: ShieldCheck,
    },
    {
      title: "Neutral Arbitration Board",
      desc: "In rare cases of dispute, experienced neutral arbitrators inspect tracking numbers, serials, and condition reports.",
      icon: Scales,
    },
    {
      title: "Cryptographic Transparency",
      desc: "Every deposit, lock timestamp, and disbursement is verifiable on the public blockchain explorer.",
      icon: Lightning,
    },
  ];

  return (
    <section id="security" className="py-24 bg-[#04080B] relative border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Supported Crypto Assets & <span className="text-gradient-emerald">Vault Security</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Deposit and settle in top cryptocurrencies. Protected by institutional-grade multi-sig vaults, segregated trust accounts, and verifiable on-chain ledgers.
          </p>
        </div>

        {/* Supported Cryptos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {supportedCoins.map((coin) => (
            <div
              key={coin.name}
              className="bg-[#081017] rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#00F59B]/40 hover:bg-[#0C1620] transition-all duration-300 shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#04070A] border border-white/10 p-2.5 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner">
                    <Image
                      src={coin.file}
                      alt={coin.name}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain rounded-full"
                    />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{coin.name}</h3>
                <div className="text-sm font-semibold text-emerald-400 mb-2">{coin.chains}</div>
                <p className="text-sm text-slate-300 leading-relaxed">{coin.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Security Architecture Pillars */}
        <div className="bg-[#081219] rounded-3xl p-8 sm:p-12 border border-emerald-500/25 shadow-2xl">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
            <h3 className="text-2xl font-bold text-white">Zero Trust Architecture</h3>
            <p className="text-base text-slate-300">
              How Escrow Bay secures physical merchandise and contractor funds without counterparty vulnerability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="p-6 rounded-2xl bg-[#04080B] border border-white/10 space-y-3 shadow-md hover:border-emerald-500/30 transition-colors">
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] inline-block">
                    <Icon weight="bold" className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">{p.title}</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
