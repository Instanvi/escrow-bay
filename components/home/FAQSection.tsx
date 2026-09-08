"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      q: "How does Escrow Bay protect both buyers and sellers?",
      a: "Escrow Bay holds funds in secure multi-signature custody until both parties fulfill their obligations. Buyers are protected because sellers can't access funds until delivery is confirmed and inspected. Sellers are protected because funds are locked upfront—no chargebacks or payment reversals after delivery.",
    },
    {
      q: "How does the Inspection Period work?",
      a: "When creating an escrow transaction, both parties agree on an Inspection Period (typically 3-14 days). Once delivery is confirmed, the buyer has this time to inspect the goods or services. If satisfied, they approve the release. If there's an issue, they can open a dispute. If no action is taken, funds automatically release to the seller after the inspection period expires.",
    },
    {
      q: "Which cryptocurrencies are supported?",
      a: "Escrow Bay supports Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Tether (USDT on multiple networks), and USD Coin (USDC). You can fund and settle transactions in whichever cryptocurrency best suits your needs.",
    },
    {
      q: "What are the transaction fees?",
      a: "Escrow Bay charges a transparent service fee based on the transaction amount (typically 1-3%). There are no hidden costs. During setup, you can configure who pays: buyer, seller, or split 50/50. Use our fee calculator to see exact costs before creating a transaction.",
    },
    {
      q: "What happens if there's a dispute?",
      a: "If either party opens a dispute, funds remain frozen in multi-sig custody. Our neutral arbitration team reviews all evidence—tracking numbers, photos, communications, and contract terms. Once a decision is made, funds are released accordingly. Our dispute resolution typically takes 3-7 business days.",
    },
    {
      q: "How do milestone payments work for services?",
      a: "For freelance work or long-term projects, you can split the contract into milestones (e.g., 30% Design, 40% Development, 30% Launch). The buyer funds the full amount upfront. As each milestone is completed and verified, the corresponding portion is released to the seller.",
    },
    {
      q: "Is my crypto safe in escrow?",
      a: "Yes. All funds are held in institutional-grade multi-signature wallets requiring multiple approvals for any movement. We never have unilateral control of your assets. Your crypto remains secure until transaction completion or dispute resolution.",
    },
    {
      q: "How long does a typical transaction take?",
      a: "Transaction timing depends on your agreement. Physical goods typically take 3-14 days (shipping + inspection period). Digital deliverables can be completed in hours or days. Service milestones follow your project timeline. The escrow process itself is instant once both parties fulfill their obligations.",
    },
    {
      q: "Can I cancel a transaction after funding?",
      a: "Yes, but both parties must agree. If the seller hasn't shipped or started work, cancellation with full refund is straightforward. If work has begun or goods are in transit, cancellation terms depend on your agreement and may require dispute resolution.",
    },
    {
      q: "Do I need an account to use Escrow Bay?",
      a: "Yes. Both buyers and sellers need to create an account for identity verification and transaction history. Account creation is quick and helps ensure secure, traceable transactions that protect all parties involved.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#070C10] relative border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked <span className="text-gradient-emerald">Questions</span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Everything you need to know about setting up, funding, and safely completing escrow transactions on Escrow Bay.
          </p>
        </div>

        {/* Shadcn Accordion */}
        <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={faq.q}
              value={`item-${idx}`}
              className="bg-[#0B141B] rounded-2xl border border-white/10 px-6 overflow-hidden transition-all duration-200 hover:border-emerald-500/30 shadow-lg"
            >
              <AccordionTrigger className="text-base sm:text-lg font-bold text-white hover:text-[#00F59B] py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-slate-300 leading-relaxed pt-1 pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}
