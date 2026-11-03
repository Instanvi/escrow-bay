"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  ArrowsClockwise,
  Wallet,
  Coins,
  ShieldCheck,
  CheckCircle,
  Clock,
  WarningCircle,
  Copy,
  Check,
  Plus,
  UploadSimple,
  MagnifyingGlass,
  ArrowSquareOut,
  Funnel,
  Sparkle,
  X,
  CaretDown,
  Lock,
  Eye,
  SlidersHorizontal,
  SignOut,
  House,
  List,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  WalletMethod,
  EscrowTransaction,
  PlatformUser,
  getAdminWallets,
  saveAdminWallets,
  getAdminTransactions,
  saveAdminTransactions,
  getAdminUsers,
  INITIAL_WALLETS,
  INITIAL_TRANSACTIONS,
  INITIAL_USERS,
  DEFAULT_BTC_QR_SVG,
  CRYPTO_LOGO_PRESETS,
  CryptoPreset,
} from "@/lib/escrow-store";
import { AdminSidebar, AdminTab } from "@/components/admin/AdminSidebar";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Data States (Initialized with default sets to match SSR and prevent hydration mismatches)
  const [wallets, setWallets] = useState<WalletMethod[]>(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState<EscrowTransaction[]>(INITIAL_TRANSACTIONS);
  const [users, setUsers] = useState<PlatformUser[]>(INITIAL_USERS);

  // UI States
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [txFilterStatus, setTxFilterStatus] = useState<string>("all");
  const [zoomQrWallet, setZoomQrWallet] = useState<WalletMethod | null>(null);

  // Add Wallet Modal
  const [isAddWalletOpen, setIsAddWalletOpen] = useState(false);
  const [newWalletName, setNewWalletName] = useState("");
  const [newWalletSymbol, setNewWalletSymbol] = useState("");
  const [newWalletNetwork, setNewWalletNetwork] = useState("");
  const [newWalletLogo, setNewWalletLogo] = useState("/bitcoinlogo.svg");
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [newWalletQrPhoto, setNewWalletQrPhoto] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement | null>(null);
  const cardFileInputRef = useRef<HTMLInputElement | null>(null);
  const cardLogoFileInputRef = useRef<HTMLInputElement | null>(null);
  const [targetWalletForUpload, setTargetWalletForUpload] = useState<string | null>(null);
  const [targetWalletForLogoUpload, setTargetWalletForLogoUpload] = useState<string | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Load Initial Data from persistent store
  useEffect(() => {
    setWallets(getAdminWallets());
    setTransactions(getAdminTransactions());
    setUsers(getAdminUsers());
  }, []);

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Address copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Change Transaction Status Handler
  const handleStatusChange = (
    txId: string,
    newStatus: EscrowTransaction["status"]
  ) => {
    const updated = transactions.map((tx) =>
      tx.id === txId ? { ...tx, status: newStatus } : tx
    );
    setTransactions(updated);
    saveAdminTransactions(updated);
    showToast(`Transaction ${txId} status updated to ${newStatus.replace("_", " ").toUpperCase()}`);
  };

  // Handle QR Photo Upload for Add Wallet Modal
  const handleQrPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setNewWalletQrPhoto(reader.result);
        showToast("QR code photo uploaded successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle direct QR photo upload on an existing wallet card
  const handleCardQrPhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    walletId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const updated = wallets.map((w) =>
          w.id === walletId ? { ...w, qrPhoto: reader.result as string } : w
        );
        setWallets(updated);
        saveAdminWallets(updated);
        showToast("Wallet QR photo updated successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Custom Crypto Logo Upload for Add Wallet Modal
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setNewWalletLogo(reader.result);
        showToast("Custom crypto logo uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Logo Upload for existing wallet card
  const handleCardLogoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    walletId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const updated = wallets.map((w) =>
          w.id === walletId ? { ...w, logo: reader.result as string } : w
        );
        setWallets(updated);
        saveAdminWallets(updated);
        showToast("Wallet logo updated!");
      }
    };
    reader.readAsDataURL(file);
  };

  // Select Preset Crypto
  const handleSelectPreset = (preset: CryptoPreset) => {
    setNewWalletLogo(preset.logo);
    if (!newWalletName) setNewWalletName(preset.name);
    if (!newWalletSymbol) setNewWalletSymbol(preset.symbol);
    if (!newWalletNetwork) setNewWalletNetwork(preset.network);
    showToast(`Selected ${preset.name} preset`);
  };

  // Save New Wallet Method
  const handleSaveNewWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWalletName || !newWalletAddress) {
      showToast("Please fill in the wallet name and address");
      return;
    }

    const newMethod: WalletMethod = {
      id: `wallet-${Date.now()}`,
      name: newWalletName,
      symbol: newWalletSymbol.toUpperCase() || "CRYPTO",
      network: newWalletNetwork || "Mainnet",
      logo: newWalletLogo,
      address: newWalletAddress,
      qrPhoto: newWalletQrPhoto || DEFAULT_BTC_QR_SVG,
      isActive: true,
    };

    const updated = [newMethod, ...wallets];
    setWallets(updated);
    saveAdminWallets(updated);
    setIsAddWalletOpen(false);

    // Reset Form
    setNewWalletName("");
    setNewWalletSymbol("");
    setNewWalletNetwork("");
    setNewWalletAddress("");
    setNewWalletQrPhoto("");
    showToast(`New wallet method ${newMethod.name} added!`);
  };

  // Toggle Wallet Active
  const handleToggleWalletActive = (id: string) => {
    const updated = wallets.map((w) =>
      w.id === id ? { ...w, isActive: !w.isActive } : w
    );
    setWallets(updated);
    saveAdminWallets(updated);
    showToast("Wallet status updated");
  };

  // Delete Wallet
  const handleDeleteWallet = (id: string) => {
    if (confirm("Are you sure you want to remove this wallet method?")) {
      const updated = wallets.filter((w) => w.id !== id);
      setWallets(updated);
      saveAdminWallets(updated);
      showToast("Wallet method removed");
    }
  };

  // Calculations for KPI Cards
  const totalUsersCount = users.length;
  const totalTransactionsCount = transactions.length;
  const totalWalletsCount = wallets.length;

  const totalVolumeEscrowed = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  // Pie Chart Data: Breakdown by Currency/Payment Method
  const cryptoDistribution = useMemo(() => {
    const map: Record<string, { count: number; volume: number; color: string }> = {
      BTC: { count: 0, volume: 0, color: "#F7931A" },
      USDT: { count: 0, volume: 0, color: "#26A17B" },
      ETH: { count: 0, volume: 0, color: "#627EEA" },
      USDC: { count: 0, volume: 0, color: "#2775CA" },
      SOL: { count: 0, volume: 0, color: "#9945FF" },
      OTHER: { count: 0, volume: 0, color: "#00F59B" },
    };

    transactions.forEach((tx) => {
      const cur = tx.currency.toUpperCase();
      if (map[cur]) {
        map[cur].count += 1;
        map[cur].volume += tx.amount;
      } else {
        map.OTHER.count += 1;
        map.OTHER.volume += tx.amount;
      }
    });

    const total = totalVolumeEscrowed || 1;
    return Object.entries(map)
      .map(([key, data]) => ({
        currency: key,
        ...data,
        percentage: Math.round((data.volume / total) * 100),
      }))
      .filter((d) => d.count > 0)
      .sort((a, b) => b.volume - a.volume);
  }, [transactions, totalVolumeEscrowed]);

  // Filtered Transactions for the Transactions Tab (Clean table)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        searchQuery === "" ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        txFilterStatus === "all" || tx.status === txFilterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, txFilterStatus]);

  // Helper status badge renderer
  const renderStatusBadge = (status: EscrowTransaction["status"]) => {
    switch (status) {
      case "funds_locked":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Funds Locked
          </span>
        );
      case "in_inspection":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            In Inspection
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
            Completed
          </span>
        );
      case "dispute":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <WarningCircle weight="bold" className="w-3.5 h-3.5 text-rose-400" />
            Dispute Open
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/15 text-slate-300 border border-slate-500/30">
            Refunded
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="h-screen flex bg-[#06090B] text-slate-100 overflow-hidden antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0B1013] border border-[#00F59B]/40 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle weight="bold" className="w-5 h-5 text-[#00F59B]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input for Card QR Upload */}
      <input
        type="file"
        ref={cardFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (targetWalletForUpload) {
            handleCardQrPhotoUpload(e, targetWalletForUpload);
          }
        }}
      />

      {/* Hidden File Input for Card Custom Logo Upload */}
      <input
        type="file"
        ref={cardLogoFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (targetWalletForLogoUpload) {
            handleCardLogoUpload(e, targetWalletForLogoUpload);
          }
        }}
      />

      {/* Dedicated, Non-Scrollable Sidebar Component */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        totalUsersCount={totalUsersCount}
        totalTransactionsCount={totalTransactionsCount}
        totalWalletsCount={totalWalletsCount}
        totalVolumeEscrowed={totalVolumeEscrowed}
      />

      {/* Right Column: Top Bar + Independent Scrollable Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header / App Bar */}
        <header className="h-16 shrink-0 border-b border-white/10 bg-[#0B1013]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer"
              aria-label="Toggle Navigation"
            >
              <List weight="bold" className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white capitalize">
                {activeTab} Management
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-[#00F59B] border border-emerald-500/30">
                Live Escrow
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              <House weight="bold" className="w-4 h-4 text-[#00F59B]" />
              <span>Switch to Client Dashboard</span>
            </Link>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#00F59B]/15 border border-[#00F59B]/40 flex items-center justify-center text-[#00F59B] font-bold text-xs">
                AD
              </div>
              <span className="hidden md:inline text-xs font-medium text-slate-300">
                Root Administrator
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area (Only this area scrolls) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* TAB 1: DASHBOARD VIEW (From Sketch) */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 max-w-7xl mx-auto">
              {/* Header Title */}
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Overview Dashboard
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Real-time status of users, platform transactions, and custody wallets.
                </p>
              </div>

              {/* 3 TOP KPI CARDS (Exactly as drawn in the handwritten sketch) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                {/* Users Card */}
                <div
                  onClick={() => setActiveTab("users")}
                  className="p-5 rounded-2xl bg-[#0B1013] border border-white/10 hover:border-[#00F59B]/40 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200">
                      Total Users
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                      <Users weight="bold" className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 text-3xl font-bold text-white tracking-tight">
                    {totalUsersCount}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 flex items-center gap-1">
                    <span className="text-emerald-400 font-semibold">100%</span> active escrow accounts
                  </div>
                </div>

                {/* Transactions Card */}
                <div
                  onClick={() => setActiveTab("transactions")}
                  className="p-5 rounded-2xl bg-[#0B1013] border border-white/10 hover:border-[#00F59B]/40 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200">
                      Total Transactions
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                      <ArrowsClockwise weight="bold" className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 text-3xl font-bold text-white tracking-tight">
                    {totalTransactionsCount}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 flex items-center gap-1">
                    <span className="text-amber-400 font-semibold">
                      ${totalVolumeEscrowed.toLocaleString()}
                    </span>{" "}
                    cumulative volume
                  </div>
                </div>

                {/* Wallets Card */}
                <div
                  onClick={() => setActiveTab("wallets")}
                  className="p-5 rounded-2xl bg-[#0B1013] border border-white/10 hover:border-[#00F59B]/40 transition-all cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200">
                      Total Wallets
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#00F59B] border border-emerald-500/20 flex items-center justify-center">
                      <Wallet weight="bold" className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 text-3xl font-bold text-white tracking-tight">
                    {totalWalletsCount}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 flex items-center gap-1">
                    <span className="text-[#00F59B] font-semibold">
                      {wallets.filter((w) => w.isActive).length} active
                    </span>{" "}
                    deposit chains
                  </div>
                </div>
              </div>

              {/* PIE CHART SECTION (On Dashboard as requested) */}
              <div className="p-6 rounded-2xl bg-[#0B1013] border border-white/10 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Escrow Volume by Payment Method
                    </h2>
                    <p className="text-xs text-slate-400">
                      Distribution of locked collateral across Bitcoin and supported crypto wallets
                    </p>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    Live Escrow Vault Data
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Clean SVG Donut / Pie Chart */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="relative w-56 h-56 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        {(() => {
                          let cumulativePercent = 0;
                          return cryptoDistribution.map((item) => {
                            const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                            const strokeDashoffset = -cumulativePercent;
                            cumulativePercent += item.percentage;
                            return (
                              <circle
                                key={item.currency}
                                cx="50"
                                cy="50"
                                r="38"
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth="18"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                pathLength="100"
                                className="transition-all duration-500 hover:opacity-85"
                              />
                            );
                          });
                        })()}
                      </svg>
                      <div className="absolute text-center">
                        <div className="text-[11px] text-slate-400 font-medium">Total Vault</div>
                        <div className="text-lg font-bold text-white">
                          ${(totalVolumeEscrowed / 1000).toFixed(1)}k
                        </div>
                        <div className="text-[10px] text-[#00F59B] font-semibold">100% Backed</div>
                      </div>
                    </div>
                  </div>

                  {/* Distribution Legend & Breakdown */}
                  <div className="md:col-span-7 space-y-3">
                    {cryptoDistribution.map((item) => (
                      <div
                        key={item.currency}
                        className="p-3 rounded-xl bg-[#10171B] border border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3.5 h-3.5 rounded-md"
                            style={{ backgroundColor: item.color }}
                          />
                          <div>
                            <span className="text-sm font-bold text-white">
                              {item.currency === "BTC"
                                ? "Bitcoin (BTC)"
                                : item.currency === "USDT"
                                ? "Tether (USDT)"
                                : item.currency === "ETH"
                                ? "Ethereum (ETH)"
                                : item.currency === "USDC"
                                ? "USD Coin (USDC)"
                                : item.currency}
                            </span>
                            <span className="text-xs text-slate-400 block">
                              {item.count} transaction{item.count > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-mono font-bold text-white">
                            ${item.volume.toLocaleString()}
                          </div>
                          <div className="text-xs text-[#00F59B] font-semibold">
                            {item.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTTOM TRANSACTIONS TABLE (From Sketch: Buyer | Seller | Amount | Payment Method | Status) */}
              <div className="p-6 rounded-2xl bg-[#0B1013] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Recent Escrow Transactions
                    </h2>
                    <p className="text-xs text-slate-400">
                      Live transaction ledger matching current buyer and seller agreements
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("transactions")}
                    className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer text-xs"
                  >
                    View All {totalTransactionsCount}
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs uppercase bg-[#10171B] text-slate-400 border-y border-white/5 font-semibold">
                      <tr>
                        <th className="py-3 px-4">Buyer</th>
                        <th className="py-3 px-4">Seller</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {transactions.slice(0, 8).map((tx) => (
                        <tr
                          key={tx.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-semibold text-white">
                            {tx.buyer}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {tx.seller}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#00F59B]">
                            ${tx.amount.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-200">
                              {tx.paymentMethod.includes("Bitcoin") || tx.currency === "BTC" ? (
                                <Image
                                  src="/bitcoinlogo.svg"
                                  alt="BTC"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              ) : tx.paymentMethod.includes("Tether") || tx.currency === "USDT" ? (
                                <Image
                                  src="/tetherlogo.svg"
                                  alt="USDT"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              ) : tx.paymentMethod.includes("Ethereum") || tx.currency === "ETH" ? (
                                <Image
                                  src="/ethereumlogo.svg"
                                  alt="ETH"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              ) : (
                                <Image
                                  src="/usdclogo.svg"
                                  alt="Crypto"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              )}
                              <span>{tx.paymentMethod}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {renderStatusBadge(tx.status)}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-400">
                            {tx.createdAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USERS VIEW (Shows all users in the system) */}
          {activeTab === "users" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Registered Users
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Complete registry of buyers, sellers, and brokers registered in the platform.
                  </p>
                </div>
                <div className="text-xs px-3 py-1.5 rounded-lg bg-[#10171B] border border-white/10 text-slate-300 font-mono">
                  Total Users: <span className="text-[#00F59B] font-bold">{users.length}</span>
                </div>
              </div>

              {/* Users Table */}
              <div className="p-6 rounded-2xl bg-[#0B1013] border border-white/10 shadow-xl space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs uppercase bg-[#10171B] text-slate-400 border-y border-white/5 font-semibold">
                      <tr>
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Deals</th>
                        <th className="py-3 px-4">Escrow Volume</th>
                        <th className="py-3 px-4">KYC Status</th>
                        <th className="py-3 px-4">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((u) => (
                        <tr
                          key={u.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{u.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{u.id}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-mono text-xs">
                            {u.email}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                u.role === "Buyer"
                                  ? "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                                  : u.role === "Seller"
                                  ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                                  : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            {u.totalDeals}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#00F59B]">
                            ${u.totalVolume.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            {u.status === "Verified" ? (
                              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                                <CheckCircle weight="bold" className="w-3.5 h-3.5" />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-medium">
                                <Clock weight="bold" className="w-3.5 h-3.5" />
                                Pending KYC
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-400">
                            {u.joinedAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRANSACTIONS VIEW (Clean Table, No Charts, Real-time Status Changer) */}
          {activeTab === "transactions" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Transactions Ledger
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    All transactions across the platform. You can update any transaction status directly below.
                  </p>
                </div>

                <div className="text-xs px-3 py-1.5 rounded-lg bg-[#10171B] border border-white/10 text-slate-300 font-mono">
                  Total Transactions:{" "}
                  <span className="text-[#00F59B] font-bold">
                    {transactions.length}
                  </span>
                </div>
              </div>

              {/* Search & Status Filter Controls */}
              <div className="p-4 rounded-2xl bg-[#0B1013] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                  <MagnifyingGlass
                    weight="bold"
                    className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                  />
                  <Input
                    type="text"
                    placeholder="Search by ID, Buyer, Seller, or Deal Title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-[#10171B] border-white/10 text-white placeholder:text-slate-400 text-xs h-10 rounded-xl"
                  />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                  {[
                    { id: "all", label: "All" },
                    { id: "funds_locked", label: "Funds Locked" },
                    { id: "in_inspection", label: "In Inspection" },
                    { id: "completed", label: "Completed" },
                    { id: "dispute", label: "Dispute" },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setTxFilterStatus(filter.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        txFilterStatus === filter.id
                          ? "bg-[#00F59B] text-[#04100C]"
                          : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transactions Clean Table */}
              <div className="p-6 rounded-2xl bg-[#0B1013] border border-white/10 shadow-xl space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs uppercase bg-[#10171B] text-slate-400 border-y border-white/5 font-semibold">
                      <tr>
                        <th className="py-3 px-4">Deal ID & Item</th>
                        <th className="py-3 px-4">Buyer</th>
                        <th className="py-3 px-4">Seller</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Current Status</th>
                        <th className="py-3 px-4 text-right">Change Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-xs font-bold text-slate-400 block">
                              {tx.id}
                            </span>
                            <span className="font-semibold text-white block truncate max-w-xs">
                              {tx.title}
                            </span>
                            <span className="text-[11px] text-slate-400 block">
                              {tx.createdAt}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-white">
                            {tx.buyer}
                          </td>
                          <td className="py-3.5 px-4 text-slate-300">
                            {tx.seller}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#00F59B]">
                            ${tx.amount.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-slate-200">
                              {tx.currency === "BTC" ? (
                                <Image
                                  src="/bitcoinlogo.svg"
                                  alt="BTC"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              ) : tx.currency === "USDT" ? (
                                <Image
                                  src="/tetherlogo.svg"
                                  alt="USDT"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              ) : tx.currency === "ETH" ? (
                                <Image
                                  src="/ethereumlogo.svg"
                                  alt="ETH"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              ) : (
                                <Image
                                  src="/usdclogo.svg"
                                  alt="USDC"
                                  width={14}
                                  height={14}
                                  className="w-3.5 h-3.5"
                                />
                              )}
                              <span>{tx.paymentMethod}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {renderStatusBadge(tx.status)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {/* Status Changer Dropdown */}
                            <select
                              value={tx.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  tx.id,
                                  e.target.value as EscrowTransaction["status"]
                                )
                              }
                              className="text-xs bg-[#10171B] border border-white/20 text-slate-200 rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:border-[#00F59B] cursor-pointer"
                            >
                              <option value="funds_locked">Funds Locked</option>
                              <option value="in_inspection">In Inspection</option>
                              <option value="completed">Completed / Released</option>
                              <option value="dispute">Dispute Opened</option>
                              <option value="refunded">Refunded to Buyer</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredTransactions.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-sm">
                      No transactions found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WALLETS VIEW (Bitcoin Logo, Text Address, QR Photo Upload, Add Wallet Method) */}
          {activeTab === "wallets" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Escrow Custody Wallets
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Manage the crypto deposit addresses and QR code photos presented to buyers during payment.
                  </p>
                </div>

                {/* Add New Wallet Method Button */}
                <Button
                  type="button"
                  onClick={() => setIsAddWalletOpen(true)}
                  className="bg-[#00F59B] hover:bg-[#33F7AC] text-[#04100C] font-bold rounded-xl h-11 px-5 shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Plus weight="bold" className="w-4 h-4" />
                  <span>Add New Wallet Method</span>
                </Button>
              </div>

              {/* Wallets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wallets.map((wallet) => (
                  <div
                    key={wallet.id}
                    className={`p-5 rounded-2xl bg-[#0B1013] border transition-all duration-200 flex flex-col justify-between shadow-xl ${
                      wallet.isPrimary
                        ? "border-[#00F59B]/60 ring-1 ring-[#00F59B]/20"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Wallet Card Header with Logo */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative group/logo">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2">
                              <img
                                src={wallet.logo}
                                alt={wallet.name}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setTargetWalletForLogoUpload(wallet.id);
                                cardLogoFileInputRef.current?.click();
                              }}
                              title="Upload Custom Logo"
                              className="absolute -bottom-1 -right-1 p-1 rounded-md bg-[#10171B] border border-white/20 text-slate-400 hover:text-[#00F59B] text-[10px] cursor-pointer shadow transition-colors"
                            >
                              <UploadSimple weight="bold" className="w-3 h-3" />
                            </button>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-base text-white">
                                {wallet.name}
                              </h3>
                              {wallet.isPrimary && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#00F59B] border border-emerald-500/30">
                                  Default
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-400 font-medium">
                              {wallet.network}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                            wallet.isActive
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-slate-500/15 text-slate-400"
                          }`}
                        >
                          {wallet.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* QR Code Photo Display (Click to zoom) */}
                      <div className="p-3 rounded-xl bg-[#10171B] border border-white/5 flex flex-col items-center justify-center gap-2">
                        <div
                          onClick={() => setZoomQrWallet(wallet)}
                          className="relative w-36 h-36 bg-white p-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity shadow-md group"
                          title="Click to zoom QR Code"
                        >
                          <img
                            src={wallet.qrPhoto}
                            alt={`${wallet.name} QR Code`}
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity text-white text-xs font-semibold gap-1">
                            <Eye weight="bold" className="w-4 h-4" /> Zoom
                          </div>
                        </div>

                        {/* Upload QR Photo Button on Card */}
                        <button
                          type="button"
                          onClick={() => {
                            setTargetWalletForUpload(wallet.id);
                            cardFileInputRef.current?.click();
                          }}
                          className="text-[11px] font-semibold text-slate-300 hover:text-[#00F59B] flex items-center gap-1.5 mt-1 cursor-pointer transition-colors"
                        >
                          <UploadSimple weight="bold" className="w-3.5 h-3.5" />
                          <span>Upload QR Photo</span>
                        </button>
                      </div>

                      {/* Wallet Address AS TEXT (With Copy Button) */}
                      <div className="space-y-1.5">
                        <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center justify-between">
                          <span>Deposit Address</span>
                          <span className="text-[10px] text-slate-400">Selectable Text</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#06090B] border border-white/10 flex items-center justify-between gap-2">
                          <p className="font-mono text-xs text-slate-200 break-all select-all leading-relaxed">
                            {wallet.address}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleCopy(wallet.address, wallet.id)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-[#00F59B]/20 text-slate-300 hover:text-[#00F59B] transition-colors shrink-0 cursor-pointer"
                            title="Copy Wallet Address"
                          >
                            {copiedId === wallet.id ? (
                              <Check weight="bold" className="w-4 h-4 text-[#00F59B]" />
                            ) : (
                              <Copy weight="bold" className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions on Card */}
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => handleToggleWalletActive(wallet.id)}
                        className="font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        {wallet.isActive ? "Disable Wallet" : "Enable Wallet"}
                      </button>

                      {!wallet.isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleDeleteWallet(wallet.id)}
                          className="text-rose-400 hover:text-rose-300 font-semibold transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD NEW WALLET METHOD */}
      {isAddWalletOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0B1013] border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Wallet weight="bold" className="w-5 h-5 text-[#00F59B]" />
                <h3 className="text-lg font-bold text-white">
                  Add New Wallet Method
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddWalletOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewWallet} className="space-y-4">
              {/* Currency Name & Symbol */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Currency Name
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. Bitcoin"
                    value={newWalletName}
                    onChange={(e) => setNewWalletName(e.target.value)}
                    className="bg-[#10171B] border-white/10 text-white text-xs h-10 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Symbol
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. BTC"
                    value={newWalletSymbol}
                    onChange={(e) => setNewWalletSymbol(e.target.value)}
                    className="bg-[#10171B] border-white/10 text-white text-xs h-10 rounded-xl"
                  />
                </div>
              </div>

              {/* Network */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Network / Protocol
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Bitcoin Native SegWit or TRON TRC-20"
                  value={newWalletNetwork}
                  onChange={(e) => setNewWalletNetwork(e.target.value)}
                  className="bg-[#10171B] border-white/10 text-white text-xs h-10 rounded-xl"
                />
              </div>

              {/* Logo Selection: Upload Custom Logo + Expanded Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Crypto Logo
                  </label>
                  <span className="text-[11px] text-[#00F59B]">
                    Pick preset or upload any custom coin
                  </span>
                </div>

                {/* Upload Custom Logo Box */}
                <div className="p-3 rounded-xl bg-[#10171B] border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2 shrink-0">
                      <img
                        src={newWalletLogo}
                        alt="Active Logo"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Selected Logo</div>
                      <div className="text-[11px] text-slate-400">
                        Upload custom coin logo (PNG, JPG, SVG, WebP)
                      </div>
                    </div>
                  </div>

                  <div>
                    <input
                      type="file"
                      ref={logoFileInputRef}
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => logoFileInputRef.current?.click()}
                      className="border-white/15 bg-white/5 hover:bg-white/10 text-xs h-9 cursor-pointer flex items-center gap-1.5"
                    >
                      <UploadSimple weight="bold" className="w-4 h-4 text-[#00F59B]" />
                      <span>Upload Logo</span>
                    </Button>
                  </div>
                </div>

                {/* Expanded Presets Library */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-slate-400 font-medium">
                    Or select from 14 popular presets:
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 max-h-36 overflow-y-auto p-1.5 bg-[#060D09] rounded-xl border border-white/5">
                    {CRYPTO_LOGO_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          newWalletLogo === preset.logo
                            ? "bg-[#00F59B]/15 border-[#00F59B] text-[#00F59B] shadow-sm"
                            : "bg-[#10171B] border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                        title={`${preset.name} (${preset.symbol})`}
                      >
                        <img
                          src={preset.logo}
                          alt={preset.name}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="text-[10px] font-bold truncate max-w-full">
                          {preset.symbol}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Wallet Address AS TEXT */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Wallet Deposit Address (Text)
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"
                  value={newWalletAddress}
                  onChange={(e) => setNewWalletAddress(e.target.value)}
                  className="bg-[#10171B] border-white/10 font-mono text-white text-xs h-10 rounded-xl"
                />
              </div>

              {/* QR Code Photo Upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Upload Address QR Code Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0 border border-white/10">
                    <img
                      src={newWalletQrPhoto || DEFAULT_BTC_QR_SVG}
                      alt="QR Code Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleQrPhotoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs h-9 cursor-pointer w-full flex items-center justify-center gap-1.5"
                    >
                      <UploadSimple weight="bold" className="w-4 h-4 text-[#00F59B]" />
                      <span>{newWalletQrPhoto ? "Change Photo" : "Upload QR Image"}</span>
                    </Button>
                    <p className="text-[11px] text-slate-400">
                      Upload a PNG or JPG photo of the QR code for this wallet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddWalletOpen(false)}
                  className="border-white/10 text-slate-300 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#00F59B] hover:bg-[#33F7AC] text-[#04100C] font-bold px-6 cursor-pointer"
                >
                  Save Wallet Method
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ZOOM QR CODE */}
      {zoomQrWallet && (
        <div
          onClick={() => setZoomQrWallet(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0B1013] border border-white/20 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={zoomQrWallet.logo}
                  alt={zoomQrWallet.name}
                  className="w-6 h-6 object-contain"
                />
                <h3 className="font-bold text-white text-base">
                  {zoomQrWallet.name} QR Code
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setZoomQrWallet(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl inline-block shadow-lg">
              <img
                src={zoomQrWallet.qrPhoto}
                alt={zoomQrWallet.name}
                className="w-56 h-56 object-contain mx-auto"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#10171B] border border-white/10 text-left space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">
                {zoomQrWallet.network} Address
              </div>
              <div className="font-mono text-xs text-slate-200 break-all select-all">
                {zoomQrWallet.address}
              </div>
            </div>

            <Button
              type="button"
              onClick={() => handleCopy(zoomQrWallet.address, zoomQrWallet.id + "-zoom")}
              className="w-full bg-[#00F59B] hover:bg-[#33F7AC] text-[#04100C] font-bold h-10 rounded-xl flex items-center justify-center gap-2"
            >
              <Copy weight="bold" className="w-4 h-4" />
              <span>Copy Address</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
