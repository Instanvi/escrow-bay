import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06090B] text-slate-200">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-base text-slate-400">
            Last Updated: September 2026 • Escrow Bay Data Protections
          </p>
        </div>

        {/* Privacy Body */}
        <div className="space-y-8 text-base text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Information Collection</h2>
            <p>
              Escrow Bay collects only the minimum essential information required to coordinate escrow agreements, verify transaction counterparties, communicate milestone status, and disburse cryptographic assets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Blockchain & On-Chain Data</h2>
            <p>
              Public blockchain addresses and transaction hashes (TXIDs) associated with multi-sig vault deposits and disbursements are inherently public on the blockchain ledger. We do not correlate private personal data to public ledger records beyond transaction verification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Zero Selling of Personal Data</h2>
            <p>
              We never sell, rent, or monetize your personal or corporate data to third-party advertisers or data brokers. All transaction communications are strictly encrypted in transit and at rest.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Compliance & Dispute Preservation</h2>
            <p>
              In cases where formal dispute arbitration is opened, shipping manifests, tracking numbers, and deliverable records provided by counterparties are retained strictly for arbitration records and audit continuity.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-base">
          <Link href="/" className="text-[#00F59B] hover:underline flex items-center gap-1.5 font-semibold">
            ← Return to Escrow Bay Homepage
          </Link>
          <Link href="/terms" className="text-slate-300 hover:text-white flex items-center gap-1.5 font-medium">
            View Terms of Service <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  );
}
