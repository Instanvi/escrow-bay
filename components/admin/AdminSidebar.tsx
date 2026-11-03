"use client";

import Link from "next/link";
import {
  SlidersHorizontal,
  Users,
  ArrowsClockwise,
  Wallet,
  ShieldCheck,
  SignOut,
  X,
  House,
} from "@phosphor-icons/react";

export type AdminTab = "dashboard" | "users" | "transactions" | "wallets";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpen: boolean;
  onClose: () => void;
  totalUsersCount: number;
  totalTransactionsCount: number;
  totalWalletsCount: number;
  totalVolumeEscrowed: number;
}

export function AdminSidebar({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  totalUsersCount,
  totalTransactionsCount,
  totalWalletsCount,
  totalVolumeEscrowed,
}: AdminSidebarProps) {
  const handleNavClick = (tab: AdminTab) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Non-scrollable fixed sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-20 h-screen w-64 shrink-0 bg-[#0B1013] border-r border-white/10 flex flex-col justify-between overflow-hidden select-none transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top: Branding + Close button on mobile */}
        <div className="flex flex-col">
          <div className="h-16 px-5 border-b border-white/10 flex items-center justify-between shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-tight text-white">
                Escrow<span className="text-[#00F59B]">Bay</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-[#00F59B] border border-emerald-500/30">
                Admin
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 md:hidden"
              aria-label="Close sidebar"
            >
              <X weight="bold" className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-5">
            <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 px-3">
              Management Menu
            </div>

            <nav className="space-y-1.5">
              {/* Dashboard Nav Item */}
              <button
                type="button"
                onClick={() => handleNavClick("dashboard")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <SlidersHorizontal weight="bold" className="w-5 h-5 shrink-0" />
                <span>Dashboard</span>
              </button>

              {/* Users Nav Item */}
              <button
                type="button"
                onClick={() => handleNavClick("users")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "users"
                    ? "bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users weight="bold" className="w-5 h-5 shrink-0" />
                  <span>Users</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-400 font-mono">
                  {totalUsersCount}
                </span>
              </button>

              {/* Transactions Nav Item */}
              <button
                type="button"
                onClick={() => handleNavClick("transactions")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "transactions"
                    ? "bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <ArrowsClockwise weight="bold" className="w-5 h-5 shrink-0" />
                  <span>Transactions</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-slate-400 font-mono">
                  {totalTransactionsCount}
                </span>
              </button>

              {/* Wallets Nav Item */}
              <button
                type="button"
                onClick={() => handleNavClick("wallets")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "wallets"
                    ? "bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wallet weight="bold" className="w-5 h-5 shrink-0" />
                  <span>Wallets</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-[#00F59B] font-mono">
                  {totalWalletsCount}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Section (Fixed, Never Scrolls) */}
        <div className="p-4 border-t border-white/10 space-y-3 shrink-0 bg-[#0B1013]">
          {/* Quick Client Dashboard Link */}
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <House weight="bold" className="w-4 h-4 text-[#00F59B]" />
            <span>Client Dashboard</span>
          </Link>

          {/* Escrow Volume Stats Badge */}
          <div className="p-3 rounded-xl bg-[#10171B] border border-white/5 text-xs space-y-1">
            <div className="text-slate-400">Total Escrow Volume</div>
            <div className="text-base font-bold text-[#00F59B]">
              ${totalVolumeEscrowed.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <ShieldCheck weight="bold" className="w-3 h-3 text-[#00F59B]" /> Multi-Sig Custody Active
            </div>
          </div>

          {/* Exit Link */}
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <SignOut weight="bold" className="w-3.5 h-3.5" />
            <span>Exit Admin Portal</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
