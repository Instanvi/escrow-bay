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
      q: "How does the Inspection Period work for physical merchandise?",
      a: "When creating an escrow deal, both parties agree on an Inspection Period (typically 3 to 14 days). Once the courier tracking confirms delivery, the inspection countdown begins. The buyer inspects the goods. If fully satisfied, the buyer clicks 'Approve' to disburse crypto immediately. If the inspection timer expires without a dispute, funds are disbursed automatically to the seller.",
    },
    {
      q: "What happens if a seller does not ship or sends incorrect items?",
      a: "If a seller fails to provide valid shipment tracking within the agreed dispatch window, or if the delivered goods do not match the agreed specifications, the buyer can click 'Open Dispute' within the inspection window. Funds stay 100% frozen in multi-sig custody while our neutral arbitration team investigates. If returned, the buyer receives a full refund of their crypto deposit.",
    },
    {
      q: "Which cryptocurrencies and networks are supported?",
      a: "Escrow Bay natively supports Tether (USDT on TRC-20, ERC-20, and Solana), USD Coin (USDC), Bitcoin (BTC), Ethereum (ETH), and Solana (SOL). You can fund and settle in whichever asset best suits your deal.",
    },
    {
      q: "Can the buyer and seller split the escrow transaction fee?",
      a: "Yes. During deal setup, you can configure fee allocation as Buyer Pays 100%, Seller Pays 100%, or 50/50 Equal Split. The exact calculation is displayed transparently upfront with zero hidden charges.",
    },
    {
      q: "Why is Escrow Bay better than direct wallet transfers or credit card payments?",
      a: "Direct wallet transfers leave buyers completely vulnerable to scams: once sent, crypto cannot be recovered. Conversely, credit cards and PayPal leave sellers vulnerable to fraudulent chargebacks months later. Escrow Bay eliminates both risks: the buyer knows funds won't leave until inspected, and the seller knows 100% of the collateral is locked upfront.",
    },
    {
      q: "How are contractor milestone services managed?",
      a: "For freelance work, software engineering, or consulting, you can split the deal into staged milestones (e.g. 30% Wireframes, 40% Development, 30% Final Deployment). The buyer funds the full contract upfront, and releases crypto milestone-by-milestone upon deliverable verification.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#06090B] relative border-t border-white/10">
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
              className="bg-[#0B1013] rounded-2xl border border-white/10 px-6 overflow-hidden transition-colors"
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
