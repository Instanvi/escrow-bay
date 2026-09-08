import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06090B] text-slate-200">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-base text-slate-400">
            Last Updated: September 2026 • Escrow Bay Protocol Guidelines
          </p>
        </div>

        {/* Legal Body */}
        <div className="space-y-8 text-base text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Overview & Platform Role</h2>
            <p>
              Escrow Bay provides neutral, multi-signature crypto escrow custody and transaction coordination for buyers and sellers of physical goods, contractor services, and digital assets. Escrow Bay is not a party to the underlying commercial contract between buyer and seller, but acts as a trusted escrow custodian adhering strictly to agreed terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Multi-Sig Vault Deposits & Collateral</h2>
            <p>
              When an escrow transaction is created, the Buyer deposits agreed crypto collateral (USDT, USDC, BTC, ETH, or SOL) into Escrow Bay’s designated multi-signature vault address. Funds remain locked in multi-signature vault custody until:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>The Buyer submits an explicit deliverable approval; or</li>
              <li>The agreed Inspection Window expires with verified courier delivery and without a filed dispute; or</li>
              <li>A formal neutral arbitration determination is executed.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Inspection Period & Fulfillment Obligations</h2>
            <p>
              The Seller is obligated to ship physical merchandise via trackable courier with signature confirmation, or deliver milestone assets according to the deal specification. The Inspection Window (1 to 14 calendar days) commences upon courier delivery confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Dispute Resolution & Neutral Arbitration</h2>
            <p>
              In the event of non-delivery, damaged goods, or defective contractor milestones, either party may file a formal dispute before the Inspection Window closes. Once a dispute is lodged, funds remain frozen in escrow while Escrow Bay’s arbitration board evaluates manifests, tracking logs, and objective evidence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Transparent Fee Schedule</h2>
            <p>
              Escrow Bay applies a transparent tiered fee (0.85% to 2.2%, minimum $25) allocated according to the deal setup (Buyer Pays, Seller Pays, or 50/50 Split). Blockchain network gas fees are separate and standard.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-base">
          <Link href="/" className="text-[#00F59B] hover:underline flex items-center gap-1.5 font-semibold">
            ← Return to Escrow Bay Homepage
          </Link>
          <Link href="/dispute-rules" className="text-slate-300 hover:text-white flex items-center gap-1.5 font-medium">
            Read Dispute Rules <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
