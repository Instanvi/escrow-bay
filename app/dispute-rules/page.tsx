import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function DisputeRulesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06090B] text-slate-200">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Escrow Dispute & Arbitration Guidelines
          </h1>
          <p className="text-base text-slate-400">
            How Escrow Bay fairly and neutrally resolves discrepancies between Buyers and Sellers
          </p>
        </div>

        {/* Dispute Guide */}
        <div className="space-y-8 text-base text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. The Dispute Initiation Period</h2>
            <p>
              A Buyer or Seller may lodge a formal dispute at any time prior to the expiration of the agreed Inspection Window. Once a dispute is filed:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>All automated vault disbursement timers are immediately frozen.</li>
              <li>Both counterparties are notified and assigned an Escrow Bay Dispute Arbitrator.</li>
              <li>A 7-day evidence submission window opens for both parties.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Evidence Submission & Verification</h2>
            <p>
              For physical merchandise disputes, the seller must provide valid carrier tracking manifests, serial records, and dispatch receipts. The buyer must provide photographic/video evidence of damaged, counterfeit, or materially differing merchandise.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Merchandise Return Protocol</h2>
            <p>
              If the goods are determined to be defective or not as described, the arbitrator will order a return shipment. The buyer must ship the goods back to the seller with signature-required tracking. Once the seller confirms return receipt, the buyer’s crypto deposit is refunded in full.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Finality of Determination</h2>
            <p>
              Escrow Bay’s arbitration board determination is final and executed on-chain via multi-signature release keys to the rightful party without delay.
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
