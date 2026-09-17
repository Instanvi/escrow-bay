"use client"

import Link from "next/link";
import Image from "next/image";
import { Shield, Lock, Clock } from "@phosphor-icons/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const cryptos = [
    { name: "USDT", file: "/tetherlogo.svg" },
    { name: "BTC", file: "/bitcoinlogo.svg" },
    { name: "ETH", file: "/ethereumlogo.svg" },
    { name: "SOL", file: "/solanalogo.svg" },
    { name: "USDC", file: "/usdclogo.svg" },
  ];

  return (
    <footer className="bg-[#040709] border-t border-white/10 text-slate-400 pt-16 pb-8">
      <div className="app-container">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight text-white">
                Escrow<span className="text-[#00F59B]">Bay</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Institutional-grade crypto escrow protocol for physical merchandise, contractor milestones, and high-value commerce. Safe settlement in Bitcoin, Ethereum, Solana, and USDT.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Multi-Sig Protected</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Non-Custodial</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <Clock className="h-4 w-4" />
                <span className="font-medium">24/7 Monitoring</span>
              </div>
            </div>
          </div>

          {/* Platform Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#how-it-works" className="hover:text-[#00F59B] transition-colors">How It Works</a></li>
              <li><a href="#categories" className="hover:text-[#00F59B] transition-colors">Categories</a></li>
              <li><a href="#calculator" className="hover:text-[#00F59B] transition-colors">Fee Calculator</a></li>
              <li><a href="#security" className="hover:text-[#00F59B] transition-colors">Security</a></li>
              <li><a href="#faq" className="hover:text-[#00F59B] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Account Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Account</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/login" className="hover:text-[#00F59B] transition-colors">Log In</Link></li>
              <li><Link href="/signup" className="hover:text-[#00F59B] transition-colors">Sign Up</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#00F59B] transition-colors">Dashboard</Link></li>
              <li><Link href="/transactions" className="hover:text-[#00F59B] transition-colors">My Transactions</Link></li>
              <li><Link href="/settings" className="hover:text-[#00F59B] transition-colors">Settings</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-[#00F59B] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#00F59B] transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-[#00F59B] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00F59B] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/dispute-rules" className="hover:text-[#00F59B] transition-colors">Dispute Rules</Link></li>
            </ul>
          </div>

          {/* Supported Assets Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Supported Assets</h4>
            <div className="space-y-2">
              {cryptos.map((c) => (
                <div
                  key={c.name}
                  className="inline-flex items-center gap-2 px-2.5 py-1.5 mr-1.5 mb-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 font-medium hover:border-[#00F59B]/40 transition-colors"
                >
                  <Image
                    src={c.file}
                    alt={c.name}
                    width={16}
                    height={16}
                    className="rounded-full w-4 h-4 object-contain"
                  />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed">
              All transactions secured with multi-signature smart contracts and time-locked escrow.
            </p>
          </div>

        </div>

        {/* Security Banner */}
        <div className="mb-10 p-5 bg-white/5 border border-white/10 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-[#00F59B] flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-white mb-1.5">Security First Architecture</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                All escrow transactions are secured through audited smart contracts with multi-signature requirements. Your funds remain in non-custodial wallets until release conditions are met.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse" />
              100% Vault Uptime
            </div>
            <span className="hidden md:inline">•</span>
            <span className="text-center">Multi-Signature Escrow Infrastructure</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div>&copy; {currentYear} Escrow Bay. All rights reserved.</div>
            <span className="hidden md:inline">•</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-slate-300 transition-colors">Security</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
