import {
  Lock,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#05110B] via-[#081912] to-[#040806] relative border-t border-emerald-500/20 overflow-hidden">
      {/* Background glow halos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00F59B]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0B1E15]/90 backdrop-blur-xl rounded-3xl p-8 sm:p-14 border border-emerald-500/40 text-center space-y-6 relative overflow-hidden shadow-[0_20px_60px_rgba(0,245,155,0.12)]">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to Secure Your Next <br />
            <span className="text-gradient-emerald">High-Value Deal</span> with Escrow Bay?
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are buying a luxury timepiece, ordering bulk wholesale inventory, or hiring a contractor for technical milestones, Escrow Bay guarantees safety for both parties.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-xl">
              <a href="#signup">
                <Lock weight="bold" className="w-4 h-4 text-[#04100C]" />
                <span>Start an Escrow Transaction</span>
                <ArrowRight weight="bold" className="w-4 h-4 text-[#04100C]" />
              </a>
            </Button>

            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto h-14 px-7 text-base">
              <a href="#calculator">
                <span>Calculate Transaction Fees</span>
              </a>
            </Button>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle weight="bold" className="w-4 h-4 text-[#00F59B]" /> No Monthly Commitments
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle weight="bold" className="w-4 h-4 text-[#00F59B]" /> Multi-Sig Vault Escrow
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle weight="bold" className="w-4 h-4 text-[#00F59B]" /> Impartial Human Arbitration
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
