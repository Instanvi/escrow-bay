"use client";

import React from "react";
export {
  ShieldCheck,
  Lock,
  LockOpen,
  ArrowRight,
  Check,
  CheckCircle,
  CaretDown,
  CaretRight,
  Lightning,
  Scales,
  Wallet,
  Coins,
  Clock,
  Package,
  Briefcase,
  Sparkle,
  Globe,
  Calculator,
  List as MenuIcon,
  X as XIcon,
  Question,
  FileText,
  ArrowsClockwise,
  Warning,
  ArrowSquareOut,
  MagnifyingGlass,
  CurrencyBtc,
  CurrencyEth,
} from "@phosphor-icons/react";

// Custom Solana & Tether Token Icons aligned with Phosphor style
export function SolanaTokenIcon({ className = "w-5 h-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 18h13.5l2.5-3H6.5L4 18Z" />
      <path d="M6.5 13.5H20l-2.5-3H4l2.5 3Z" />
      <path d="M4 9h13.5l2.5-3H6.5L4 9Z" />
    </svg>
  );
}

export function TetherTokenIcon({ className = "w-5 h-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 6h14" />
      <path d="M12 6v12" />
      <ellipse cx="12" cy="11" rx="7" ry="3.5" />
    </svg>
  );
}

// Brand Logomark
export function EscrowBayLogoMark({ className = "w-9 h-9", size = 36 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="14" fill="#0C1317" />
      <rect x="0.5" y="0.5" width="47" height="47" rx="13.5" stroke="#10B981" strokeOpacity="0.3" />
      <path
        d="M24 8L36 13.5V23.2C36 30.5 30.9 37.3 24 40C17.1 37.3 12 30.5 12 23.2V13.5L24 8Z"
        fill="url(#escrow_grad)"
        fillOpacity="0.2"
        stroke="#00F59B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M18 26C20.5 24 23.5 24 26 26C28.5 28 31 28 33 26"
        stroke="#00F59B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="19" r="3" stroke="#00F59B" strokeWidth="2" fill="#0C1317" />
      <path d="M24 22V25" stroke="#00F59B" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="escrow_grad" x1="24" y1="8" x2="24" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00F59B" />
          <stop offset="1" stopColor="#059669" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
