"use client";

export interface WalletMethod {
  id: string;
  name: string;
  symbol: string;
  network: string;
  logo: string;
  address: string;
  qrPhoto: string;
  isActive: boolean;
  isPrimary?: boolean;
}

export interface EscrowTransaction {
  id: string;
  title: string;
  buyer: string;
  seller: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  walletAddress: string;
  status: "funds_locked" | "in_inspection" | "completed" | "dispute" | "refunded";
  createdAt: string;
  inspectionDays: number;
  category: string;
}

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: "Buyer" | "Seller" | "Broker";
  status: "Verified" | "Pending KYC" | "Suspended";
  totalDeals: number;
  totalVolume: number;
  joinedAt: string;
}

// Crisp QR Code SVG for Bitcoin deposit
export const DEFAULT_BTC_QR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" fill="%23ffffff" rx="12"/><path fill="%2304100c" d="M20 20h50v50H20zM30 30v30h30V30zm10 10h10v10H40zm90-20h50v50h-50zm10 10v30h30V30zm10 10h10v10h-10zM20 130h50v50H20zm10 10v30h30v-30zm10 10h10v10H40zm50-110h20v10H90zm20 20h20v20h-20zm-20 20h10v20H90zm30 10h20v10h-20zm-50 40h20v10H70zm30 0h20v20h-20zm30 0h30v10h-30zm-20 20h20v20h-20zm30 0h30v20h-30zm-70 20h20v20H70zm40 10h20v20h-20zm30 0h20v10h-20zm-50 20h20v10H90zm40 0h30v10h-30z"/></svg>`;

export const DEFAULT_ETH_QR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" fill="%23ffffff" rx="12"/><path fill="%2304100c" d="M20 20h50v50H20zM30 30v30h30V30zm10 10h10v10H40zm90-20h50v50h-50zm10 10v30h30V30zm10 10h10v10h-10zM20 130h50v50H20zm10 10v30h30v-30zm10 10h10v10H40zm50-100h10v20H90zm20 10h20v10h-20zm0 20h10v30h-10zm-30 20h20v10H80zm50 0h20v10h-20zm-40 20h10v20H90zm30 0h20v20h-20zm-20 20h10v20h-10zm40 10h20v10h-20zm-60 10h20v10H80zm40 0h20v10h-20z"/></svg>`;

export const DEFAULT_USDT_QR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none"><rect width="200" height="200" fill="%23ffffff" rx="12"/><path fill="%2304100c" d="M20 20h50v50H20zM30 30v30h30V30zm10 10h10v10H40zm90-20h50v50h-50zm10 10v30h30V30zm10 10h10v10h-10zM20 130h50v50H20zm10 10v30h30v-30zm10 10h10v10H40zm50-110h30v10H90zm10 20h10v30h-10zm30 0h20v10h-20zm-40 30h30v10H90zm40 10h20v20h-20zm-50 20h20v10H80zm30 10h20v20h-20zm30 0h20v10h-20zm-70 20h30v10H70zm50 0h20v20h-20zm-30 20h20v10H90zm40 0h20v10h-20z"/></svg>`;

// Preset SVGs for extra popular cryptocurrencies
export const LOGO_BNB = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23F3BA2F"/><path fill="%23FFFFFF" d="M32 14l6.5 6.5-6.5 6.5-6.5-6.5zm0 18l6.5 6.5-6.5 6.5-6.5-6.5zm-14.5-9l6.5 6.5-6.5 6.5-6.5-6.5zm29 0l6.5 6.5-6.5 6.5-6.5-6.5z"/></svg>`;

export const LOGO_XRP = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%2323292F"/><path fill="%23FFFFFF" d="M47 19h-5.2c-.8 0-1.6.3-2.1.9L32 27.5l-7.7-7.6c-.5-.6-1.3-.9-2.1-.9H17l11.4 11.3c2 2 5.2 2 7.2 0L47 19zm-30 26h5.2c.8 0 1.6-.3 2.1-.9L32 36.5l7.7 7.6c.5.6 1.3.9 2.1.9H47L35.6 33.7c-2-2-5.2-2-7.2 0L17 45z"/></svg>`;

export const LOGO_DOGE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23C2A633"/><text x="32" y="44" font-family="Arial,sans-serif" font-weight="900" font-size="34" fill="%23FFFFFF" text-anchor="middle">Ð</text></svg>`;

export const LOGO_TRX = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23EC0623"/><path fill="%23FFFFFF" d="M16 20l28-6-16 34zm26-4L30 33l14-3zm-10 19l-9 11 19-14z"/></svg>`;

export const LOGO_ADA = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%230033AD"/><circle cx="32" cy="32" r="6" fill="%23FFFFFF"/><circle cx="32" cy="18" r="3.5" fill="%23FFFFFF"/><circle cx="32" cy="46" r="3.5" fill="%23FFFFFF"/><circle cx="18" cy="32" r="3.5" fill="%23FFFFFF"/><circle cx="46" cy="32" r="3.5" fill="%23FFFFFF"/><circle cx="22" cy="22" r="2.5" fill="%23FFFFFF"/><circle cx="42" cy="42" r="2.5" fill="%23FFFFFF"/><circle cx="42" cy="22" r="2.5" fill="%23FFFFFF"/><circle cx="22" cy="42" r="2.5" fill="%23FFFFFF"/></svg>`;

export const LOGO_POL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%238247E5"/><path fill="%23FFFFFF" d="M41 24l-9-5.2-9 5.2v10.4l9 5.2 9-5.2V24zm-9 3.5l4.5 2.6-4.5 2.6-4.5-2.6 4.5-2.6z"/></svg>`;

export const LOGO_XMR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23FF6600"/><path fill="%23FFFFFF" d="M32 15l15 15v14h-8v-9L32 28l-7 7v9h-8V30zm-15 29v5h30v-5z"/></svg>`;

export const LOGO_LTC = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23345D9D"/><path fill="%23FFFFFF" d="M26 18h8v16l7-2-1.5 5-5.5 1.5v3h10v6H26z"/></svg>`;

export const LOGO_AVAX = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="%23E84142"/><path fill="%23FFFFFF" d="M29 18l-14 26h9l10-18zm6 10l8 16h8zm-3 8l-4 8h8z"/></svg>`;

export interface CryptoPreset {
  id: string;
  name: string;
  symbol: string;
  network: string;
  logo: string;
}

export const CRYPTO_LOGO_PRESETS: CryptoPreset[] = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", network: "Bitcoin Native SegWit", logo: "/bitcoinlogo.svg" },
  { id: "eth", name: "Ethereum", symbol: "ETH", network: "Ethereum Mainnet (ERC-20)", logo: "/ethereumlogo.svg" },
  { id: "usdt", name: "Tether USD", symbol: "USDT", network: "TRON (TRC-20)", logo: "/tetherlogo.svg" },
  { id: "usdc", name: "USD Coin", symbol: "USDC", network: "Ethereum (ERC-20)", logo: "/usdclogo.svg" },
  { id: "sol", name: "Solana", symbol: "SOL", network: "Solana Mainnet", logo: "/solanalogo.svg" },
  { id: "bnb", name: "BNB", symbol: "BNB", network: "BNB Smart Chain (BEP-20)", logo: LOGO_BNB },
  { id: "xrp", name: "Ripple", symbol: "XRP", network: "XRP Ledger", logo: LOGO_XRP },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", network: "Dogecoin Network", logo: LOGO_DOGE },
  { id: "trx", name: "Tron", symbol: "TRX", network: "Tron TRC-20", logo: LOGO_TRX },
  { id: "ada", name: "Cardano", symbol: "ADA", network: "Cardano Mainnet", logo: LOGO_ADA },
  { id: "pol", name: "Polygon", symbol: "POL", network: "Polygon POS", logo: LOGO_POL },
  { id: "xmr", name: "Monero", symbol: "XMR", network: "Monero Network", logo: LOGO_XMR },
  { id: "ltc", name: "Litecoin", symbol: "LTC", network: "Litecoin Mainnet", logo: LOGO_LTC },
  { id: "avax", name: "Avalanche", symbol: "AVAX", network: "Avalanche C-Chain", logo: LOGO_AVAX },
];

export const INITIAL_WALLETS: WalletMethod[] = [
  {
    id: "wallet-btc",
    name: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin Native SegWit",
    logo: "/bitcoinlogo.svg",
    address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    qrPhoto: DEFAULT_BTC_QR_SVG,
    isActive: true,
    isPrimary: true,
  },
  {
    id: "wallet-usdt-trc20",
    name: "Tether USD",
    symbol: "USDT",
    network: "TRON (TRC-20)",
    logo: "/tetherlogo.svg",
    address: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    qrPhoto: DEFAULT_USDT_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-eth",
    name: "Ethereum",
    symbol: "ETH",
    network: "Ethereum Mainnet (ERC-20)",
    logo: "/ethereumlogo.svg",
    address: "0x71C8A9b2940Ec78a94F66C239B8F82736184C0A",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-usdc",
    name: "USD Coin",
    symbol: "USDC",
    network: "Ethereum (ERC-20)",
    logo: "/usdclogo.svg",
    address: "0x391Ebc68940Af519b78294B0998a7298B234912",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-sol",
    name: "Solana",
    symbol: "SOL",
    network: "Solana Mainnet",
    logo: "/solanalogo.svg",
    address: "7Xw19GqMKaPn3yFwL7aZ8vK4jL9b8C6qW8dF19zP8k9",
    qrPhoto: DEFAULT_BTC_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-usdt-erc20",
    name: "Tether USD",
    symbol: "USDT",
    network: "Ethereum (ERC-20)",
    logo: "/tetherlogo.svg",
    address: "0x9A3F7b894Ec23a91B6F28C4A78129B7F1293847",
    qrPhoto: DEFAULT_USDT_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-btc-taproot",
    name: "Bitcoin Taproot",
    symbol: "BTC",
    network: "Bitcoin Taproot (P2TR)",
    logo: "/bitcoinlogo.svg",
    address: "bc1p8d89a7f3e2b1c4d5e6f7a8b9c0d1e2f3a4b5c6",
    qrPhoto: DEFAULT_BTC_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-usdc-sol",
    name: "USD Coin (SPL)",
    symbol: "USDC",
    network: "Solana (SPL Token)",
    logo: "/usdclogo.svg",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-btc-legacy",
    name: "Bitcoin Legacy",
    symbol: "BTC",
    network: "Bitcoin Legacy (P2PKH)",
    logo: "/bitcoinlogo.svg",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    qrPhoto: DEFAULT_BTC_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-eth-arb",
    name: "Ethereum Arbitrum",
    symbol: "ETH",
    network: "Arbitrum One Layer 2",
    logo: "/ethereumlogo.svg",
    address: "0x4D8Ba29F3E14c89AB2194C791823aBc891274F",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-usdt-bep20",
    name: "Tether BSC",
    symbol: "USDT",
    network: "BNB Smart Chain (BEP-20)",
    logo: "/tetherlogo.svg",
    address: "0xB7E4A28C93F71D459A8B39487192A49B7123A9F",
    qrPhoto: DEFAULT_USDT_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-usdc-poly",
    name: "USD Coin Polygon",
    symbol: "USDC",
    network: "Polygon POS",
    logo: "/usdclogo.svg",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-eth-op",
    name: "Ethereum Optimism",
    symbol: "ETH",
    network: "Optimism Mainnet",
    logo: "/ethereumlogo.svg",
    address: "0x5C29D8A4E71F23B89D4C7A17192849182749129",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-btc-segwit2",
    name: "Bitcoin Cold Vault #2",
    symbol: "BTC",
    network: "Bitcoin Native SegWit",
    logo: "/bitcoinlogo.svg",
    address: "bc1q78a9c2f78b3e51d84a9c2f78b3e51d84a9c2f7",
    qrPhoto: DEFAULT_BTC_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-usdt-sol",
    name: "Tether Solana",
    symbol: "USDT",
    network: "Solana (SPL)",
    logo: "/tetherlogo.svg",
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    qrPhoto: DEFAULT_USDT_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-eth-base",
    name: "Ethereum Base",
    symbol: "ETH",
    network: "Base Layer 2",
    logo: "/ethereumlogo.svg",
    address: "0x8F14C7A29B3E51D84A9C2F78192837491827391",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
  {
    id: "wallet-usdc-base",
    name: "USD Coin Base",
    symbol: "USDC",
    network: "Base Layer 2",
    logo: "/usdclogo.svg",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    qrPhoto: DEFAULT_ETH_QR_SVG,
    isActive: true,
  },
];

export const INITIAL_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: "ESC-8921",
    title: "1968 Porsche 911 Targa (Matching Numbers)",
    buyer: "Alexander Wright",
    seller: "Heritage Auto Vault LLC",
    amount: 65000,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "in_inspection",
    createdAt: "2026-10-28",
    inspectionDays: 5,
    category: "Vehicles & Classic Cars",
  },
  {
    id: "ESC-8914",
    title: "Enterprise GPU Compute Cluster - Stage 2",
    buyer: "Apex DeepTech Inc",
    seller: "Krona Cloud Services",
    amount: 18500,
    currency: "USDC",
    paymentMethod: "USDC (ERC-20)",
    walletAddress: "0x391Ebc68940Af519b78294B0998a7298B234912",
    status: "funds_locked",
    createdAt: "2026-10-29",
    inspectionDays: 7,
    category: "Milestone & Freelance Services",
  },
  {
    id: "ESC-8905",
    title: "Rolex Submariner Date 126610LN - Box & Papers",
    buyer: "Elena Rostova",
    seller: "Swiss Crown Horology",
    amount: 12750,
    currency: "BTC",
    paymentMethod: "Bitcoin (BTC)",
    walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    status: "in_inspection",
    createdAt: "2026-10-30",
    inspectionDays: 3,
    category: "Jewelry & Luxury Timepieces",
  },
  {
    id: "ESC-8899",
    title: "Domain Portfolio: metaverse.ai & neuralnet.io",
    buyer: "Horizon Venture Partners",
    seller: "Aegis Brand Group",
    amount: 32000,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "funds_locked",
    createdAt: "2026-10-31",
    inspectionDays: 2,
    category: "Domain Names & Digital Assets",
  },
  {
    id: "ESC-8887",
    title: "2.5 ETH Bridge Settlement Protocol",
    buyer: "Vortex Labs Ltd",
    seller: "Nexus Liquidity DAO",
    amount: 5625,
    currency: "ETH",
    paymentMethod: "Ethereum (ETH)",
    walletAddress: "0x71C8A9b2940Ec78a94F66C239B8F82736184C0A",
    status: "funds_locked",
    createdAt: "2026-10-31",
    inspectionDays: 1,
    category: "Cryptocurrency & Digital Assets",
  },
  {
    id: "ESC-8876",
    title: "MacBook Pro 16 M3 Max - 10 Units Sealed",
    buyer: "Quantum Creative Studio",
    seller: "MacWorld Direct wholesale",
    amount: 4299,
    currency: "USDC",
    paymentMethod: "USDC (ERC-20)",
    walletAddress: "0x391Ebc68940Af519b78294B0998a7298B234912",
    status: "in_inspection",
    createdAt: "2026-10-25",
    inspectionDays: 4,
    category: "General Merchandise & Electronics",
  },
  {
    id: "ESC-8864",
    title: "Business Acquisition - Brew Haven Specialty Coffee",
    buyer: "Marcus Thorne",
    seller: "Brew Collective Partners",
    amount: 48000,
    currency: "BTC",
    paymentMethod: "Bitcoin (BTC)",
    walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    status: "funds_locked",
    createdAt: "2026-10-24",
    inspectionDays: 14,
    category: "Business & Brokered Deals",
  },
  {
    id: "ESC-8851",
    title: "Vintage Tiffany & Co. Diamond Ring 1.8ct",
    buyer: "David Chen",
    seller: "Beverly Hills Gem Exchange",
    amount: 15200,
    currency: "USDT",
    paymentMethod: "USDT (ERC-20)",
    walletAddress: "0x9A3F7b894Ec23a91B6F28C4A78129B7F1293847",
    status: "completed",
    createdAt: "2026-10-20",
    inspectionDays: 3,
    category: "Jewelry & Luxury Timepieces",
  },
  {
    id: "ESC-8840",
    title: "Custom SaaS Backend Architecture Deliverable",
    buyer: "NorthStar Logistics",
    seller: "DevSprint Solutions",
    amount: 9800,
    currency: "ETH",
    paymentMethod: "Ethereum (ETH)",
    walletAddress: "0x71C8A9b2940Ec78a94F66C239B8F82736184C0A",
    status: "completed",
    createdAt: "2026-10-18",
    inspectionDays: 7,
    category: "Milestone & Freelance Services",
  },
  {
    id: "ESC-8832",
    title: "1974 Gibson Les Paul Custom Electric Guitar",
    buyer: "Sarah Jenkins",
    seller: "Vintage Tone Gallery",
    amount: 7200,
    currency: "BTC",
    paymentMethod: "Bitcoin (BTC)",
    walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    status: "completed",
    createdAt: "2026-10-15",
    inspectionDays: 3,
    category: "General Merchandise & Electronics",
  },
  {
    id: "ESC-8820",
    title: "Industrial CNC Milling Machine - 5 Axis",
    buyer: "Titan Precision Engineering",
    seller: "Global Machinery Depot",
    amount: 84000,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "dispute",
    createdAt: "2026-10-12",
    inspectionDays: 10,
    category: "Wholesale & Bulk Inventory",
  },
  {
    id: "ESC-8811",
    title: "Heavy Cargo Marine Engine Spares Set",
    buyer: "Pacific Shipping Lines",
    seller: "Nordic Marine Supplies",
    amount: 38500,
    currency: "USDC",
    paymentMethod: "USDC (ERC-20)",
    walletAddress: "0x391Ebc68940Af519b78294B0998a7298B234912",
    status: "completed",
    createdAt: "2026-10-10",
    inspectionDays: 5,
    category: "Vehicles & Classic Cars",
  },
  {
    id: "ESC-8803",
    title: "Commercial Solar Inverter Bank (200kW)",
    buyer: "CleanGrid Power Group",
    seller: "SunVolt Distribution",
    amount: 27400,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "completed",
    createdAt: "2026-10-08",
    inspectionDays: 7,
    category: "Wholesale & Bulk Inventory",
  },
  {
    id: "ESC-8795",
    title: "Patek Philippe Aquanaut 5167A Stainless Steel",
    buyer: "Alexander Wright",
    seller: "Geneva Timepiece Club",
    amount: 41000,
    currency: "BTC",
    paymentMethod: "Bitcoin (BTC)",
    walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    status: "completed",
    createdAt: "2026-10-05",
    inspectionDays: 3,
    category: "Jewelry & Luxury Timepieces",
  },
  {
    id: "ESC-8788",
    title: "E-Commerce Brand Asset Transfer (KitchenWare)",
    buyer: "Aura Consumer Brands",
    seller: "CookStyle Global Ltd",
    amount: 52000,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "refunded",
    createdAt: "2026-10-02",
    inspectionDays: 14,
    category: "Business & Brokered Deals",
  },
  {
    id: "ESC-8774",
    title: "Full-Stack Mobile App Source Code & IP Escrow",
    buyer: "FinEdge Systems",
    seller: "CodeCrafters Studio",
    amount: 14500,
    currency: "ETH",
    paymentMethod: "Ethereum (ETH)",
    walletAddress: "0x71C8A9b2940Ec78a94F66C239B8F82736184C0A",
    status: "completed",
    createdAt: "2026-09-28",
    inspectionDays: 5,
    category: "Milestone & Freelance Services",
  },
  {
    id: "ESC-8761",
    title: "1994 Toyota Supra Turbo (Manual, Unmodified)",
    buyer: "Marcus Thorne",
    seller: "JDM Legend Imports",
    amount: 78000,
    currency: "BTC",
    paymentMethod: "Bitcoin (BTC)",
    walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    status: "completed",
    createdAt: "2026-09-25",
    inspectionDays: 7,
    category: "Vehicles & Classic Cars",
  },
  {
    id: "ESC-8750",
    title: "Rare 1st Edition Comic Collection CGC 9.8",
    buyer: "Elena Rostova",
    seller: "Apex Collectibles Ltd",
    amount: 19500,
    currency: "USDC",
    paymentMethod: "USDC (ERC-20)",
    walletAddress: "0x391Ebc68940Af519b78294B0998a7298B234912",
    status: "completed",
    createdAt: "2026-09-22",
    inspectionDays: 3,
    category: "General Merchandise & Electronics",
  },
  {
    id: "ESC-8742",
    title: "Bulk Organic Coffee Beans (2x 40ft Containers)",
    buyer: "RoastMasters USA",
    seller: "Antioquia Farms Export",
    amount: 62000,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "completed",
    createdAt: "2026-09-20",
    inspectionDays: 8,
    category: "Wholesale & Bulk Inventory",
  },
  {
    id: "ESC-8735",
    title: "50,000 USDT Multi-Sig OTC Settlement",
    buyer: "Apex DeepTech Inc",
    seller: "Nexus Liquidity DAO",
    amount: 50000,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "completed",
    createdAt: "2026-09-17",
    inspectionDays: 1,
    category: "Cryptocurrency & Digital Assets",
  },
  {
    id: "ESC-8729",
    title: "Audemars Piguet Royal Oak Chronograph 41mm",
    buyer: "David Chen",
    seller: "Swiss Crown Horology",
    amount: 38900,
    currency: "BTC",
    paymentMethod: "Bitcoin (BTC)",
    walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    status: "completed",
    createdAt: "2026-09-14",
    inspectionDays: 3,
    category: "Jewelry & Luxury Timepieces",
  },
  {
    id: "ESC-8718",
    title: "Automated Packaging Robotic Arm Assembly",
    buyer: "Titan Precision Engineering",
    seller: "RoboFlow Automation",
    amount: 45000,
    currency: "USDC",
    paymentMethod: "USDC (ERC-20)",
    walletAddress: "0x391Ebc68940Af519b78294B0998a7298B234912",
    status: "completed",
    createdAt: "2026-09-11",
    inspectionDays: 7,
    category: "Wholesale & Bulk Inventory",
  },
  {
    id: "ESC-8705",
    title: "Cloud Infrastructure Migration Milestone 1",
    buyer: "NorthStar Logistics",
    seller: "Krona Cloud Services",
    amount: 11200,
    currency: "ETH",
    paymentMethod: "Ethereum (ETH)",
    walletAddress: "0x71C8A9b2940Ec78a94F66C239B8F82736184C0A",
    status: "completed",
    createdAt: "2026-09-08",
    inspectionDays: 5,
    category: "Milestone & Freelance Services",
  },
  {
    id: "ESC-8692",
    title: "1963 Chevrolet Corvette Stingray Split Window",
    buyer: "Alexander Wright",
    seller: "Heritage Auto Vault LLC",
    amount: 115000,
    currency: "BTC",
    paymentMethod: "Bitcoin (BTC)",
    walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    status: "completed",
    createdAt: "2026-09-03",
    inspectionDays: 7,
    category: "Vehicles & Classic Cars",
  },
  {
    id: "ESC-8680",
    title: "Premium 3-Letter .com Domain Acquisition",
    buyer: "Horizon Venture Partners",
    seller: "Aegis Brand Group",
    amount: 88000,
    currency: "USDT",
    paymentMethod: "USDT (TRC-20)",
    walletAddress: "TJ5C29D8A4E71F23B89D4C7A1b8e9f24c8",
    status: "completed",
    createdAt: "2026-08-30",
    inspectionDays: 3,
    category: "Domain Names & Digital Assets",
  },
  {
    id: "ESC-8671",
    title: "Industrial Cold-Storage Warehouse Unit Transfer",
    buyer: "Pacific Shipping Lines",
    seller: "Brew Collective Partners",
    amount: 135000,
    currency: "USDC",
    paymentMethod: "USDC (ERC-20)",
    walletAddress: "0x391Ebc68940Af519b78294B0998a7298B234912",
    status: "completed",
    createdAt: "2026-08-25",
    inspectionDays: 14,
    category: "Business & Brokered Deals",
  },
  {
    id: "ESC-8660",
    title: "100 SOL Validator Bond Multi-Sig Custody",
    buyer: "Vortex Labs Ltd",
    seller: "Nexus Liquidity DAO",
    amount: 16500,
    currency: "SOL",
    paymentMethod: "Solana (SOL)",
    walletAddress: "7Xw19GqMKaPn3yFwL7aZ8vK4jL9b8C6qW8dF19zP8k9",
    status: "completed",
    createdAt: "2026-08-20",
    inspectionDays: 2,
    category: "Cryptocurrency & Digital Assets",
  },
];

export const INITIAL_USERS: PlatformUser[] = [
  {
    id: "usr-01",
    name: "Alexander Wright",
    email: "alexander.wright@wrightcapital.com",
    role: "Buyer",
    status: "Verified",
    totalDeals: 4,
    totalVolume: 236000,
    joinedAt: "2026-01-15",
  },
  {
    id: "usr-02",
    name: "Heritage Auto Vault LLC",
    email: "sales@heritageautovault.com",
    role: "Seller",
    status: "Verified",
    totalDeals: 3,
    totalVolume: 258000,
    joinedAt: "2026-02-04",
  },
  {
    id: "usr-03",
    name: "Elena Rostova",
    email: "e.rostova@genevawatchholdings.ch",
    role: "Buyer",
    status: "Verified",
    totalDeals: 2,
    totalVolume: 32250,
    joinedAt: "2026-03-11",
  },
  {
    id: "usr-04",
    name: "Swiss Crown Horology",
    email: "desk@swisscrownhorology.com",
    role: "Seller",
    status: "Verified",
    totalDeals: 3,
    totalVolume: 66850,
    joinedAt: "2026-03-18",
  },
  {
    id: "usr-05",
    name: "Marcus Thorne",
    email: "marcus.thorne@thorneventures.io",
    role: "Buyer",
    status: "Verified",
    totalDeals: 3,
    totalVolume: 141200,
    joinedAt: "2026-04-02",
  },
  {
    id: "usr-06",
    name: "Apex DeepTech Inc",
    email: "procurement@apexdeeptech.ai",
    role: "Buyer",
    status: "Verified",
    totalDeals: 2,
    totalVolume: 68500,
    joinedAt: "2026-04-20",
  },
  {
    id: "usr-07",
    name: "Krona Cloud Services",
    email: "contracts@kronacloud.net",
    role: "Seller",
    status: "Verified",
    totalDeals: 2,
    totalVolume: 29700,
    joinedAt: "2026-05-09",
  },
  {
    id: "usr-08",
    name: "Horizon Venture Partners",
    email: "domains@horizonvp.com",
    role: "Broker",
    status: "Verified",
    totalDeals: 2,
    totalVolume: 120000,
    joinedAt: "2026-05-24",
  },
  {
    id: "usr-09",
    name: "David Chen",
    email: "d.chen@pacificgemmology.sg",
    role: "Buyer",
    status: "Verified",
    totalDeals: 2,
    totalVolume: 54100,
    joinedAt: "2026-06-14",
  },
  {
    id: "usr-10",
    name: "Titan Precision Engineering",
    email: "operations@titanprecision.de",
    role: "Buyer",
    status: "Verified",
    totalDeals: 2,
    totalVolume: 129000,
    joinedAt: "2026-07-03",
  },
  {
    id: "usr-11",
    name: "Nexus Liquidity DAO",
    email: "treasury@nexusliquidity.eth",
    role: "Seller",
    status: "Verified",
    totalDeals: 3,
    totalVolume: 72125,
    joinedAt: "2026-07-29",
  },
  {
    id: "usr-12",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@audiophilegroup.co.uk",
    role: "Buyer",
    status: "Pending KYC",
    totalDeals: 1,
    totalVolume: 7200,
    joinedAt: "2026-08-19",
  },
];

// Helper functions for persistent storage
const STORAGE_KEYS = {
  WALLETS: "escrow_admin_wallets",
  TRANSACTIONS: "escrow_admin_transactions",
  USERS: "escrow_admin_users",
};

export function getAdminWallets(): WalletMethod[] {
  if (typeof window === "undefined") return INITIAL_WALLETS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WALLETS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.WALLETS, JSON.stringify(INITIAL_WALLETS));
      return INITIAL_WALLETS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_WALLETS;
  }
}

export function saveAdminWallets(wallets: WalletMethod[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.WALLETS, JSON.stringify(wallets));
  } catch (err) {
    console.error("Failed to save wallets", err);
  }
}

export function getAdminTransactions(): EscrowTransaction[] {
  if (typeof window === "undefined") return INITIAL_TRANSACTIONS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_TRANSACTIONS;
  }
}

export function saveAdminTransactions(txs: EscrowTransaction[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs));
  } catch (err) {
    console.error("Failed to save transactions", err);
  }
}

export function getAdminUsers(): PlatformUser[] {
  if (typeof window === "undefined") return INITIAL_USERS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_USERS;
  }
}
