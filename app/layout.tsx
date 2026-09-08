import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escrow Bay | Secure Crypto Escrow for Goods & Services",
  description: "The trusted crypto escrow platform for high-value merchandise, physical goods, contractor milestones, and high-ticket commerce. Settle safely in Bitcoin, Ethereum, Solana, and USDT.",
  keywords: "crypto escrow, bitcoin escrow, ethereum escrow, solana escrow, usdt escrow, goods and services escrow, milestone payment, fraud protection",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#06090B] text-slate-100 antialiased selection:bg-[#00F59B]/20 selection:text-[#00F59B]">
        {children}
      </body>
    </html>
  );
}
