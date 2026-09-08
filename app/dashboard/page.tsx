"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  Car,
  Package,
  Sparkle,
  Briefcase,
  UsersThree,
  Coins,
  ArrowsClockwise,
  SignOut,
  WarningCircle,
  FileText,
  Copy,
  Check,
  Truck,
  Scales,
  QrCode,
  Lightning,
} from "@phosphor-icons/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface EscrowDeal {
  id: string;
  title: string;
  role: "Buyer" | "Seller" | "Broker";
  currency: string;
  inspectionDays: number;
  totalAmount: number;
  status: "funds_locked" | "in_inspection" | "completed" | "dispute";
  createdAt: string;
  vaultAddress: string;
  items: TransactionItem[];
  trackingNumber?: string;
  inspectionDaysLeft?: number;
  shippingSubmitted?: boolean;
}

const SAMPLE_TEST_DEALS: EscrowDeal[] = [
  {
    id: "ESC-8921",
    title: "1968 Porsche 911 Targa (Matching Numbers)",
    role: "Buyer",
    currency: "USDT",
    inspectionDays: 5,
    inspectionDaysLeft: 3,
    totalAmount: 65000,
    status: "in_inspection",
    createdAt: "2026-09-06",
    vaultAddress: "0x71C8A9b2940Ec78a94F66C239B8",
    trackingNumber: "FX-904128419",
    shippingSubmitted: true,
    items: [
      {
        id: "item-1",
        name: "1968 Porsche 911 Targa Chassis #11830294",
        category: "Vehicles & Classic Cars",
        price: 65000,
        description: "Verified classic car condition, certificate of authenticity, title transfer in escrow.",
      },
    ],
  },
  {
    id: "ESC-8914",
    title: "Enterprise GPU Compute Cluster - Milestone 2 Deliverable",
    role: "Seller",
    currency: "USDC",
    inspectionDays: 7,
    inspectionDaysLeft: 7,
    totalAmount: 18500,
    status: "funds_locked",
    createdAt: "2026-09-07",
    vaultAddress: "0x391Ebc68940Af519b78294B0998",
    shippingSubmitted: false,
    items: [
      {
        id: "item-2",
        name: "Milestone 2: Kubernetes GPU orchestration pipeline",
        category: "Milestone & Freelance Services",
        price: 18500,
        description: "Deliverable code deployed to staging cluster with benchmark reports.",
      },
    ],
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; role?: string } | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Active Deals State (Default empty for clean workspace until user creates or loads test data)
  const [deals, setDeals] = useState<EscrowDeal[]>([]);
  const [activeTab, setActiveTab] = useState<"deals" | "wizard">("deals");
  const [dealFilter, setDealFilter] = useState<"all" | "funds_locked" | "in_inspection" | "completed">("all");

  // Multi-Step Progressive Transaction Wizard (Step 1 -> Step 2 -> Step 3 -> Step 4)
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);

  // Step 1: General Terms
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [role, setRole] = useState<"Buyer" | "Seller" | "Broker">("Buyer");
  const [currency, setCurrency] = useState("USD");
  const [inspectionDays, setInspectionDays] = useState("3");

  // Step 2: Item Details
  const [itemCategory, setItemCategory] = useState("General merchandise & electronics");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [addedItems, setAddedItems] = useState<TransactionItem[]>([]);
  const [itemError, setItemError] = useState("");

  // Step 3: Vault simulation
  const [simulatedVaultAddress, setSimulatedVaultAddress] = useState("0x71C8A9b2940Ec78a94F66C239B8");
  const [isCreatingDeal, setIsCreatingDeal] = useState(false);

  // Deal interaction modals & toasts
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedDealToApprove, setSelectedDealToApprove] = useState<EscrowDeal | null>(null);
  const [trackingInputDealId, setTrackingInputDealId] = useState<string | null>(null);
  const [trackingNumberText, setTrackingNumberText] = useState("");
  const [successToast, setSuccessToast] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("escrow_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsAuthChecking(false);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("escrow_user");
      window.location.href = "/";
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Step 1 -> Step 2 validation
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setTitleTouched(true);
    if (!title.trim()) return;
    setWizardStep(2);
  };

  // Add Item in Step 2
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    setItemError("");
    if (!itemName.trim()) {
      setItemError("Please enter an item or deliverable name.");
      return;
    }
    const parsedPrice = Math.max(1, Number(itemPrice) || 0);
    if (parsedPrice <= 0) {
      setItemError("Please enter a valid price.");
      return;
    }

    const newItem: TransactionItem = {
      id: `item-${Date.now()}`,
      name: itemName.trim(),
      category: itemCategory,
      price: parsedPrice,
      description: itemDescription.trim() || "Verified deliverable under escrow terms.",
    };

    setAddedItems((prev) => [...prev, newItem]);
    setItemName("");
    setItemPrice("");
    setItemDescription("");
  };

  // Step 2 -> Step 3 validation
  const handleProceedToStep3 = () => {
    setItemError("");
    if (addedItems.length === 0 && !itemName.trim()) {
      setItemError("Please add at least one item or enter item details before proceeding.");
      return;
    }

    // Auto add if filled
    if (addedItems.length === 0 && itemName.trim()) {
      const parsedPrice = Math.max(1, Number(itemPrice) || 1000);
      setAddedItems([
        {
          id: `item-${Date.now()}`,
          name: itemName.trim(),
          category: itemCategory,
          price: parsedPrice,
          description: itemDescription.trim() || "Verified deliverable under escrow terms.",
        },
      ]);
    }

    // Generate simulated fresh multi-sig vault address
    const hex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setSimulatedVaultAddress(`0x${hex.substring(0, 4)}...${hex.substring(36)}`);
    setWizardStep(3);
  };

  // Step 3: Finalize & Create Deal -> Switch to Deals Tab
  const handleFinalizeEscrow = () => {
    setIsCreatingDeal(true);

    const totalVal = addedItems.reduce((acc, curr) => acc + curr.price, 0);

    setTimeout(() => {
      const newDeal: EscrowDeal = {
        id: `ESC-${Math.floor(1000 + Math.random() * 9000)}`,
        title: title.trim(),
        role: role,
        currency: currency,
        inspectionDays: Math.max(1, Number(inspectionDays) || 3),
        inspectionDaysLeft: Math.max(1, Number(inspectionDays) || 3),
        totalAmount: totalVal || 5000,
        status: "funds_locked",
        createdAt: new Date().toISOString().split("T")[0],
        vaultAddress: simulatedVaultAddress,
        items: addedItems,
        shippingSubmitted: false,
      };

      setDeals((prev) => [newDeal, ...prev]);
      setIsCreatingDeal(false);

      // Reset wizard
      setTitle("");
      setTitleTouched(false);
      setAddedItems([]);
      setItemName("");
      setItemPrice("");
      setItemDescription("");
      setWizardStep(1);

      // Switch to deals tab with success notification
      setActiveTab("deals");
      setSuccessToast(`Transaction "${newDeal.title}" created & locked in multi-sig vault!`);
      setTimeout(() => setSuccessToast(""), 4000);
    }, 1200);
  };

  // Submit shipping tracking #
  const handleSubmitShipping = (dealId: string) => {
    if (!trackingNumberText.trim()) return;
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? {
              ...d,
              trackingNumber: trackingNumberText.trim(),
              status: "in_inspection" as const,
              shippingSubmitted: true,
            }
          : d
      )
    );
    setTrackingInputDealId(null);
    setTrackingNumberText("");
    setSuccessToast("Shipping tracking recorded. Inspection window started!");
    setTimeout(() => setSuccessToast(""), 3500);
  };

  // Buyer approval release
  const handleApproveDeal = (dealId: string) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId ? { ...d, status: "completed" as const } : d
      )
    );
    setSelectedDealToApprove(null);
    setSuccessToast("Funds successfully disbursed from multi-sig vault to seller!");
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const handleLoadSampleDeals = () => {
    setDeals(SAMPLE_TEST_DEALS);
    setSuccessToast("Sample test scenario loaded with 2 active transactions!");
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const handleClearWorkspace = () => {
    setDeals([]);
    setSuccessToast("Workspace cleared.");
    setTimeout(() => setSuccessToast(""), 3000);
  };

  const formatAmount = (val: number, cur: string) => {
    const formatted = val.toLocaleString(undefined, {
      minimumFractionDigits: cur === "BTC" || cur === "ETH" ? 4 : 2,
      maximumFractionDigits: cur === "BTC" || cur === "ETH" ? 6 : 2,
    });
    return cur === "USD" ? `$${formatted} USD` : `${formatted} ${cur}`;
  };

  const filteredDeals = deals.filter((d) => {
    if (dealFilter === "all") return true;
    return d.status === dealFilter;
  });

  const totalVaultValue = deals.reduce((acc, curr) => acc + curr.totalAmount, 0);

  // If checking authentication
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#040907] flex items-center justify-center">
        <div className="flex items-center gap-3 text-[#00F59B] text-base font-semibold">
          <ArrowsClockwise className="w-5 h-5 animate-spin" />
          <span>Loading secure escrow workspace...</span>
        </div>
      </div>
    );
  }

  // If user is NOT logged in: Show Authentication Guard Screen (Dashboard only visible after login)
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#040907] relative overflow-hidden bg-grid-pattern selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
        <Header />
        <main className="flex-1 max-w-lg w-full mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 relative z-10 flex items-center justify-center">
          <div className="w-full bg-[#091510] rounded-3xl p-8 sm:p-10 border border-emerald-500/30 shadow-2xl text-center space-y-6 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-[#00F59B] flex items-center justify-center mx-auto shadow-lg">
              <Lock weight="bold" className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Dashboard Requires Sign In
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                The escrow dashboard is protected by cryptographic sessions. Please log in with your username or create an account to view and manage agreements.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button asChild size="lg" className="w-full h-14 text-base font-bold rounded-xl shadow-lg">
                <Link href="/login">
                  <span>Sign In with Username</span>
                  <ArrowRight weight="bold" className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full h-12 text-sm font-semibold border-white/15 text-slate-300 hover:text-white rounded-xl">
                <Link href="/signup">
                  <span>Create New Account</span>
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD WORKSPACE (Visible only after logging in)
  return (
    <div className="min-h-screen flex flex-col bg-[#040907] relative overflow-hidden bg-grid-pattern selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#00F59B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-24 relative z-10 space-y-8">
        
        {/* Success Toast */}
        {successToast && (
          <div className="p-4 rounded-2xl bg-emerald-950/90 border border-[#00F59B]/60 text-emerald-200 flex items-center justify-between shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle weight="bold" className="w-5 h-5 text-[#00F59B] shrink-0" />
              <span className="text-sm font-semibold">{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast("")}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* User Profile Overview & Balance Header */}
        <div className="bg-[#091510] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00F59B] to-[#009B62] flex items-center justify-center p-3 text-[#04100C] shadow-lg">
                <User weight="bold" className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">
                    @{user.username}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[#00F59B] text-xs font-semibold">
                    <CheckCircle weight="bold" className="w-3.5 h-3.5" /> Authenticated Session
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Multi-Sig Threshold Keys Active • 2-of-3 Hardware Quorum
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("wizard");
                  setWizardStep(1);
                }}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  activeTab === "wizard"
                    ? "bg-[#00F59B] text-[#04100C]"
                    : "bg-emerald-950/80 border border-emerald-500/40 text-[#00F59B] hover:bg-emerald-900"
                }`}
              >
                <Plus weight="bold" className="w-4 h-4" />
                <span>+ Start New Transaction</span>
              </button>

              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-white/15 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-3 h-11 text-sm font-semibold rounded-xl cursor-pointer"
              >
                <SignOut weight="bold" className="w-4 h-4 mr-1.5 text-red-400" />
                <span>Log Out</span>
              </Button>
            </div>

          </div>

          {/* Account Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#050B08] border border-white/10 space-y-1">
              <div className="text-xs text-slate-400">Total Value in Escrow</div>
              <div className="text-2xl font-bold text-white">
                {totalVaultValue > 0 ? `$${totalVaultValue.toLocaleString()} USD` : "$0.00 USD"}
              </div>
              <div className="text-xs text-[#00F59B] flex items-center gap-1 font-semibold">
                <ShieldCheck weight="bold" className="w-3.5 h-3.5" /> 100% Vault Protected
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#050B08] border border-white/10 space-y-1">
              <div className="text-xs text-slate-400">Active Deals</div>
              <div className="text-2xl font-bold text-white">
                {deals.length} {deals.length === 1 ? "Deal" : "Deals"}
              </div>
              <div className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                <Clock weight="bold" className="w-3.5 h-3.5" />{" "}
                {deals.filter((d) => d.status === "in_inspection").length} In Inspection
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#050B08] border border-white/10 space-y-1">
              <div className="text-xs text-slate-400">Settled Volume</div>
              <div className="text-2xl font-bold text-white">
                {deals.filter((d) => d.status === "completed").length > 0 ? "$14,200 USD" : "$0.00 USD"}
              </div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle weight="bold" className="w-3.5 h-3.5" /> 0 Chargebacks / Recalls
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#050B08] border border-white/10 space-y-1">
              <div className="text-xs text-slate-400">Vault Multi-Sig Engine</div>
              <div className="text-2xl font-bold text-[#00F59B]">Arbitrum / EVM / SOL</div>
              <div className="text-xs text-slate-400 font-mono">
                Institutional Segregated
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs: Active Deals vs. Create Transaction Wizard */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("deals")}
              className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "deals"
                  ? "bg-[#00F59B] text-[#04100C] shadow-md"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              Active Deals ({deals.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("wizard")}
              className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "wizard"
                  ? "bg-[#00F59B] text-[#04100C] shadow-md"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              + Create Transaction Wizard
            </button>
          </div>

          <div className="flex items-center gap-2">
            {deals.length === 0 ? (
              <button
                type="button"
                onClick={handleLoadSampleDeals}
                className="text-xs text-[#00F59B] hover:underline bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg cursor-pointer font-medium"
              >
                Load Sample Test Scenario
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClearWorkspace}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear Workspace
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: PROGRESSIVE TRANSACTION CREATION WIZARD (Dark Theme & Perfectly Styled) */}
        {activeTab === "wizard" && (
          <div className="bg-[#091510] text-white rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden animate-fade-in backdrop-blur-xl">
            
            {/* Wizard Stepper Bar */}
            <div className="mb-8 pb-6 border-b border-white/10">
              <div className="flex items-center justify-between max-w-xl mx-auto">
                
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep >= 1
                      ? "bg-[#00F59B] text-[#04100C] shadow-md"
                      : "bg-[#040806] text-slate-500 border border-white/10"
                  }`}>
                    1
                  </div>
                  <span className={`text-xs sm:text-sm font-bold ${wizardStep >= 1 ? "text-[#00F59B]" : "text-slate-400"}`}>
                    Agreement Terms
                  </span>
                </div>

                <div className={`flex-1 h-0.5 mx-3 ${wizardStep >= 2 ? "bg-[#00F59B]" : "bg-white/10"}`} />

                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep >= 2
                      ? "bg-[#00F59B] text-[#04100C] shadow-md"
                      : "bg-[#040806] text-slate-500 border border-white/10"
                  }`}>
                    2
                  </div>
                  <span className={`text-xs sm:text-sm font-bold ${wizardStep >= 2 ? "text-[#00F59B]" : "text-slate-400"}`}>
                    Item Details
                  </span>
                </div>

                <div className={`flex-1 h-0.5 mx-3 ${wizardStep >= 3 ? "bg-[#00F59B]" : "bg-white/10"}`} />

                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep >= 3
                      ? "bg-[#00F59B] text-[#04100C] shadow-md"
                      : "bg-[#040806] text-slate-500 border border-white/10"
                  }`}>
                    3
                  </div>
                  <span className={`text-xs sm:text-sm font-bold ${wizardStep >= 3 ? "text-[#00F59B]" : "text-slate-400"}`}>
                    Vault Allocation
                  </span>
                </div>

              </div>
            </div>

            {/* STEP 1: TERMS & ROLES */}
            {wizardStep === 1 && (
              <form onSubmit={handleProceedToStep2} className="space-y-6 max-w-3xl mx-auto">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">
                    Step 1: Start Transaction & General Terms
                  </h2>
                  <p className="text-sm text-slate-400">
                    Define the core parameters, participant role, settlement currency, and inspection period.
                  </p>
                </div>

                {/* Transaction Title */}
                <div>
                  <div
                    className={`relative rounded-xl border bg-[#040806] p-3 transition-colors ${
                      titleTouched && !title.trim()
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-white/15 focus-within:border-[#00F59B]"
                    }`}
                  >
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Transaction title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={() => setTitleTouched(true)}
                      placeholder="e.g. 1968 Porsche 911 Targa Purchase"
                      className="w-full text-base font-semibold text-white bg-transparent outline-none placeholder:text-slate-600 placeholder:font-normal"
                    />
                  </div>
                  {titleTouched && !title.trim() && (
                    <p className="text-xs font-semibold text-red-400 mt-1.5 pl-1">
                      Required
                    </p>
                  )}
                </div>

                {/* Row: My role | Currency | Inspection period (days) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* My role */}
                  <div className="relative rounded-xl border border-white/15 p-3 bg-[#040806]">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      My role
                    </label>
                    <Select value={role} onValueChange={(val: any) => setRole(val)}>
                      <SelectTrigger className="w-full border-0 p-0 h-8 text-base font-semibold text-white bg-transparent shadow-none focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#06090B] text-white border-white/15">
                        <SelectItem value="Buyer">Buyer</SelectItem>
                        <SelectItem value="Seller">Seller</SelectItem>
                        <SelectItem value="Broker">Broker</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Currency */}
                  <div className="relative rounded-xl border border-white/15 p-3 bg-[#040806]">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Currency
                    </label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-full border-0 p-0 h-8 text-base font-semibold text-[#00F59B] bg-transparent shadow-none focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#06090B] text-white border-white/15">
                        <SelectItem value="USD">USD (Bank Trust)</SelectItem>
                        <SelectItem value="USDT">USDT (Tether)</SelectItem>
                        <SelectItem value="USDC">USDC (USD Coin)</SelectItem>
                        <SelectItem value="BTC">BTC (Bitcoin)</SelectItem>
                        <SelectItem value="ETH">ETH (Ethereum)</SelectItem>
                        <SelectItem value="SOL">SOL (Solana)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Inspection period (days) */}
                  <div className="relative rounded-xl border border-white/15 p-3 bg-[#040806]">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Inspection period (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={inspectionDays}
                      onChange={(e) => setInspectionDays(e.target.value)}
                      className="w-full text-base font-semibold text-white bg-transparent outline-none"
                    />
                  </div>

                </div>

                <div className="flex items-center justify-end pt-4 border-t border-white/10">
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-8 bg-[#00F59B] hover:bg-[#33F7AC] text-[#04100C] font-bold rounded-xl shadow-lg cursor-pointer"
                  >
                    <span>Continue to Item Details</span>
                    <ArrowRight weight="bold" className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}

            {/* STEP 2: ITEM DETAILS & SPECIFICATIONS */}
            {wizardStep === 2 && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">
                    Step 2: Transaction Details & Item Scope
                  </h2>
                  <p className="text-sm text-slate-400">
                    Add the specific items, merchandise, vehicle specs, or milestone deliverables for &quot;{title}&quot;.
                  </p>
                </div>

                {itemError && (
                  <div className="p-3 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs font-semibold flex items-center gap-2">
                    <WarningCircle weight="bold" className="w-4 h-4 text-red-400" />
                    <span>{itemError}</span>
                  </div>
                )}

                {/* Item category */}
                <div className="rounded-xl border border-white/15 p-3 bg-[#040806]">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Item category
                  </label>
                  <Select value={itemCategory} onValueChange={setItemCategory}>
                    <SelectTrigger className="w-full border-0 p-0 h-8 text-base font-semibold text-white bg-transparent shadow-none focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#06090B] text-white border-white/15">
                      <SelectItem value="General merchandise & electronics">General merchandise & electronics</SelectItem>
                      <SelectItem value="Vehicles & classic cars">Vehicles & classic cars</SelectItem>
                      <SelectItem value="Cryptocurrency & digital assets">Cryptocurrency & digital assets</SelectItem>
                      <SelectItem value="Jewelry & luxury timepieces">Jewelry & luxury timepieces</SelectItem>
                      <SelectItem value="Milestone & freelance services">Milestone & freelance services</SelectItem>
                      <SelectItem value="Business & brokered deals">Business & brokered deals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Row: Item name & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/15 p-3 bg-[#040806]">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Item name
                    </label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g. 1968 Porsche 911 Targa"
                      className="w-full text-base font-semibold text-white bg-transparent outline-none placeholder:text-slate-600 placeholder:font-normal"
                    />
                  </div>

                  <div className="rounded-xl border border-white/15 p-3 bg-[#040806]">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Price ({currency})
                    </label>
                    <div className="relative flex items-center">
                      {currency === "USD" && (
                        <span className="text-slate-500 font-semibold mr-1">$</span>
                      )}
                      <input
                        type="number"
                        step="any"
                        min="1"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full text-base font-semibold text-white bg-transparent outline-none placeholder:text-slate-600 placeholder:font-normal"
                      />
                      {currency !== "USD" && (
                        <span className="text-emerald-400 text-xs font-bold uppercase ml-1">
                          {currency}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Item description */}
                <div className="rounded-xl border border-white/15 p-3 bg-[#040806]">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Item description
                  </label>
                  <textarea
                    rows={3}
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="Describe agreed condition, serial numbers, delivery logistics, or milestone scopes..."
                    className="w-full text-sm text-white bg-transparent outline-none placeholder:text-slate-600 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-5 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-[#00F59B] hover:bg-emerald-900 font-semibold text-sm transition-colors cursor-pointer"
                  >
                    + Add item to agreement
                  </button>

                  {addedItems.length > 0 && (
                    <span className="text-xs font-bold text-[#00F59B]">
                      {addedItems.length} item(s) added (Total: {formatAmount(addedItems.reduce((a, b) => a + b.price, 0), currency)})
                    </span>
                  )}
                </div>

                {/* Added items table */}
                {addedItems.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#040806] border border-white/10 space-y-2">
                    <div className="text-xs font-bold uppercase text-slate-400">
                      Included Items in Escrow ({addedItems.length})
                    </div>
                    {addedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
                        <div>
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="text-xs text-slate-400 ml-2">({item.category})</span>
                        </div>
                        <span className="font-bold text-[#00F59B]">
                          {formatAmount(item.price, currency)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setWizardStep(1)}
                    className="px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                    <span>Back to Terms</span>
                  </button>

                  <Button
                    type="button"
                    onClick={handleProceedToStep3}
                    size="lg"
                    className="h-12 px-8 bg-[#00F59B] hover:bg-[#33F7AC] text-[#04100C] font-bold rounded-xl shadow-lg cursor-pointer"
                  >
                    <span>Next: Review & Generate Vault</span>
                    <ArrowRight weight="bold" className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW & MULTI-SIG VAULT ALLOCATION */}
            {wizardStep === 3 && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">
                    Step 3: Multi-Sig Vault Allocation & Agreement Activation
                  </h2>
                  <p className="text-sm text-slate-400">
                    Review deal terms and deposit address before cryptographic smart contract initialization.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#040806] text-white border border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <div className="text-xs text-slate-400">Transaction Title</div>
                      <div className="text-lg font-bold text-white">{title}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Total Escrow Value</div>
                      <div className="text-xl font-bold text-[#00F59B]">
                        {formatAmount(addedItems.reduce((a, b) => a + b.price, 0), currency)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block">My Role:</span>
                      <span className="font-bold text-white">{role}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Inspection Period:</span>
                      <span className="font-bold text-white">{inspectionDays} Days</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Escrow Fee (~1.2%):</span>
                      <span className="font-bold text-[#00F59B]">
                        {formatAmount(Math.max(25, addedItems.reduce((a, b) => a + b.price, 0) * 0.012), currency)}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Custody Protocol:</span>
                      <span className="font-bold text-white">
                        {currency === "USD" ? "Licensed Bank Trust" : "Multi-Sig Smart Vault"}
                      </span>
                    </div>
                  </div>

                  {/* Vault Address Box */}
                  <div className="p-3.5 rounded-xl bg-[#060D09] border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#00F59B] flex items-center gap-1">
                        <Lock weight="bold" className="w-3.5 h-3.5" /> Allocated Smart Contract Vault Address
                      </div>
                      <div className="font-mono text-xs text-slate-200 mt-0.5">
                        {simulatedVaultAddress}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(simulatedVaultAddress, "step3-vault")}
                      className="p-2 rounded-lg bg-emerald-950/80 text-[#00F59B] hover:bg-emerald-900 transition-colors cursor-pointer"
                      title="Copy Address"
                    >
                      {copiedId === "step3-vault" ? <Check weight="bold" className="w-4 h-4" /> : <Copy weight="bold" className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setWizardStep(2)}
                    className="px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                    <span>Back to Items</span>
                  </button>

                  <Button
                    type="button"
                    onClick={handleFinalizeEscrow}
                    disabled={isCreatingDeal}
                    size="lg"
                    className="h-12 px-8 bg-[#00F59B] hover:bg-[#33F7AC] text-[#04100C] font-bold rounded-xl shadow-lg cursor-pointer"
                  >
                    {isCreatingDeal ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#04100C] border-t-transparent rounded-full animate-spin" />
                        <span>Initializing Multi-Sig Vault...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShieldCheck weight="bold" className="w-4 h-4" />
                        <span>Lock Collateral & Activate Deal</span>
                        <ArrowRight weight="bold" className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ACTIVE ESCROW AGREEMENTS & LIFECYCLE MANAGEMENT */}
        {activeTab === "deals" && (
          <div className="space-y-6">
            
            {/* If deals list is completely empty */}
            {deals.length === 0 ? (
              <div className="bg-[#091510] rounded-3xl p-12 border border-white/10 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] flex items-center justify-center mx-auto">
                  <FileText weight="bold" className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    Your Escrow Workspace is Empty
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    No active escrow transactions found. Create your first transaction to lock collateral in a dedicated multi-sig vault, or load sample test data to test the workflow.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <Button
                    onClick={() => {
                      setActiveTab("wizard");
                      setWizardStep(1);
                    }}
                    className="w-full sm:w-auto h-12 px-6 font-bold rounded-xl bg-[#00F59B] text-[#04100C] hover:bg-[#33F7AC] cursor-pointer"
                  >
                    <Plus weight="bold" className="w-4 h-4 mr-2" />
                    <span>Create Your First Transaction</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLoadSampleDeals}
                    className="w-full sm:w-auto h-12 px-6 font-semibold border-emerald-500/40 text-[#00F59B] hover:bg-emerald-950/60 rounded-xl cursor-pointer"
                  >
                    <span>Load Sample Test Deals</span>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Filter Tabs Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>Active Agreements</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B]">
                        {deals.length} Total
                      </span>
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-[#091510] rounded-xl border border-white/10 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setDealFilter("all")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        dealFilter === "all" ? "bg-[#00F59B] text-[#04100C] font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setDealFilter("funds_locked")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        dealFilter === "funds_locked" ? "bg-[#00F59B] text-[#04100C] font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Funds Locked
                    </button>
                    <button
                      type="button"
                      onClick={() => setDealFilter("in_inspection")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        dealFilter === "in_inspection" ? "bg-[#00F59B] text-[#04100C] font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      In Inspection
                    </button>
                    <button
                      type="button"
                      onClick={() => setDealFilter("completed")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        dealFilter === "completed" ? "bg-[#00F59B] text-[#04100C] font-bold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                {/* Deals Cards */}
                <div className="space-y-4">
                  {filteredDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-[#091510] rounded-2xl p-6 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-xl space-y-5"
                    >
                      {/* Top Deal Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-[#00F59B] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                              {deal.id}
                            </span>
                            <h3 className="text-lg font-bold text-white">{deal.title}</h3>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                              {deal.role}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-4 pt-1">
                            <span>Created: {deal.createdAt}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 font-mono">
                              Vault: {deal.vaultAddress}
                              <button
                                type="button"
                                onClick={() => handleCopy(deal.vaultAddress, deal.id)}
                                className="hover:text-[#00F59B] transition-colors ml-1 cursor-pointer"
                              >
                                {copiedId === deal.id ? <Check weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" /> : <Copy weight="bold" className="w-3.5 h-3.5" />}
                              </button>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-start lg:self-auto">
                          <div className="text-right">
                            <div className="text-xs text-slate-400">Escrow Value</div>
                            <div className="text-xl font-bold text-white">
                              {formatAmount(deal.totalAmount, deal.currency)}
                            </div>
                          </div>

                          <div>
                            {deal.status === "in_inspection" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-bold">
                                <Clock weight="bold" className="w-4 h-4" />
                                <span>Inspection Window (Day {deal.inspectionDaysLeft} of {deal.inspectionDays})</span>
                              </span>
                            )}
                            {deal.status === "funds_locked" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                                <ShieldCheck weight="bold" className="w-4 h-4" />
                                <span>Locked in Multi-Sig</span>
                              </span>
                            )}
                            {deal.status === "completed" && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-[#00F59B] text-xs font-bold">
                                <CheckCircle weight="bold" className="w-4 h-4" />
                                <span>Completed & Released</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Progressive Milestone Tracker Bar */}
                      <div className="p-4 rounded-xl bg-[#040806] border border-white/5 space-y-3">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Escrow Checkpoint Lifecycle
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                          
                          <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle weight="fill" className="w-4 h-4 shrink-0" />
                            <span>1. Collateral Locked</span>
                          </div>

                          <div className={`flex items-center gap-2 ${
                            deal.shippingSubmitted || deal.status === "in_inspection" || deal.status === "completed"
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}>
                            <CheckCircle weight={deal.shippingSubmitted || deal.status === "completed" ? "fill" : "bold"} className="w-4 h-4 shrink-0" />
                            <span>2. Shipment / Tracking</span>
                          </div>

                          <div className={`flex items-center gap-2 ${
                            deal.status === "in_inspection"
                              ? "text-amber-400 font-bold"
                              : deal.status === "completed"
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}>
                            <Clock weight="bold" className="w-4 h-4 shrink-0" />
                            <span>3. Inspection Window</span>
                          </div>

                          <div className={`flex items-center gap-2 ${
                            deal.status === "completed" ? "text-[#00F59B] font-bold" : "text-slate-500"
                          }`}>
                            <CheckCircle weight={deal.status === "completed" ? "fill" : "bold"} className="w-4 h-4 shrink-0" />
                            <span>4. Payout Disbursed</span>
                          </div>

                        </div>
                      </div>

                      {/* Inline Logistics & Submit Tracking input if waiting for shipment */}
                      {trackingInputDealId === deal.id && (
                        <div className="p-4 rounded-xl bg-[#05110B] border border-[#00F59B]/40 space-y-3 animate-fade-in">
                          <label className="block text-xs font-semibold text-slate-200">
                            Enter Courier Tracking Number / Milestone Proof
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={trackingNumberText}
                              onChange={(e) => setTrackingNumberText(e.target.value)}
                              placeholder="e.g. FedEx #FX-904128419 or deliverable link"
                              className="bg-[#040806] text-xs h-10"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleSubmitShipping(deal.id)}
                              className="h-10 px-4 text-xs font-bold cursor-pointer"
                            >
                              Submit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setTrackingInputDealId(null)}
                              className="h-10 px-3 text-xs cursor-pointer"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Actions Row */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          {deal.trackingNumber && (
                            <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                              <Truck weight="bold" className="w-4 h-4" /> Tracking: {deal.trackingNumber}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {deal.status === "in_inspection" && deal.role === "Buyer" && (
                            <Button
                              size="sm"
                              onClick={() => setSelectedDealToApprove(deal)}
                              className="bg-[#00F59B] text-[#04100C] font-bold text-xs h-9 px-4 rounded-lg hover:bg-[#33F7AC] cursor-pointer"
                            >
                              <CheckCircle weight="bold" className="w-4 h-4 mr-1.5" />
                              <span>Approve & Release Payment</span>
                            </Button>
                          )}

                          {deal.status === "funds_locked" && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                setTrackingInputDealId(deal.id);
                                setTrackingNumberText("");
                              }}
                              className="text-xs h-9 px-4 rounded-lg font-semibold cursor-pointer"
                            >
                              <Truck weight="bold" className="w-4 h-4 mr-1.5" />
                              <span>{deal.role === "Seller" ? "Upload Tracking / Deliverable" : "Mark Shipped"}</span>
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-slate-300 hover:text-white h-9 px-3 cursor-pointer"
                          >
                            <span>Download Agreement PDF</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        )}

      </main>

      {/* Confirmation Modal for Payout Release */}
      {selectedDealToApprove && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#091510] rounded-3xl p-6 sm:p-8 border border-emerald-500/40 max-w-md w-full shadow-2xl space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-[#00F59B] flex items-center justify-center mx-auto">
              <ShieldCheck weight="bold" className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">
                Release Escrow Funds?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                You are approving delivery for{" "}
                <span className="font-bold text-white">&quot;{selectedDealToApprove.title}&quot;</span>.
                This will trigger the multi-sig vault to disburse{" "}
                <span className="font-bold text-[#00F59B]">
                  {formatAmount(selectedDealToApprove.totalAmount, selectedDealToApprove.currency)}
                </span>{" "}
                to the seller. This action is final.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => setSelectedDealToApprove(null)}
                className="w-full h-12 text-sm font-semibold rounded-xl cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleApproveDeal(selectedDealToApprove.id)}
                className="w-full h-12 text-sm font-bold bg-[#00F59B] text-[#04100C] rounded-xl hover:bg-[#33F7AC] cursor-pointer"
              >
                <CheckCircle weight="bold" className="w-4 h-4 mr-1.5" />
                <span>Sign & Release</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
