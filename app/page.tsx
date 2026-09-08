import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProcessSteps from "@/components/home/ProcessSteps";
import FeeCalculator from "@/components/home/FeeCalculator";
import CategoriesSection from "@/components/home/CategoriesSection";
import DualProtectionSection from "@/components/home/DualProtectionSection";
import CryptoSecuritySection from "@/components/home/CryptoSecuritySection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06090B] text-slate-100 selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
      {/* Persistent Navigation Header */}
      <Header />

      {/* Main Landing Sections */}
      <main className="flex-1">
        <HeroSection />
        <ProcessSteps />
        <FeeCalculator />
        <CategoriesSection />
        <DualProtectionSection />
        <CryptoSecuritySection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
