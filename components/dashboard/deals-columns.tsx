"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  Warning,
  Copy,
  Check,
  ChatCircle,
  Truck,
  Eye,
  CaretUpDown,
  CaretUp,
  CaretDown,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface TransactionItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

export interface EscrowDeal {
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

export interface DealsTableMeta {
  onViewDeal?: (deal: EscrowDeal) => void;
  onMessage?: (deal: EscrowDeal) => void;
  onApproveDeal?: (deal: EscrowDeal) => void;
  onSubmitTracking?: (deal: EscrowDeal) => void;
  onDispute?: (deal: EscrowDeal) => void;
  messageCounts?: Record<string, number>;
}

const formatAmount = (val: number, cur: string) => {
  const formatted = val.toLocaleString(undefined, {
    minimumFractionDigits: cur === "BTC" || cur === "ETH" ? 4 : 2,
    maximumFractionDigits: cur === "BTC" || cur === "ETH" ? 6 : 2,
  });
  return cur === "USD" ? `$${formatted} USD` : `${formatted} ${cur}`;
};

const StatusBadge = ({ status }: { status: EscrowDeal["status"] }) => {
  const config = {
    funds_locked: {
      icon: ShieldCheck,
      text: "Funds Locked",
      className: "bg-cyan-950/80 border-cyan-500/40 text-cyan-300",
    },
    in_inspection: {
      icon: Clock,
      text: "In Inspection",
      className: "bg-amber-950/80 border-amber-500/40 text-amber-300",
    },
    completed: {
      icon: CheckCircle,
      text: "Completed",
      className: "bg-emerald-950/80 border-emerald-500/40 text-[#00F59B]",
    },
    dispute: {
      icon: Warning,
      text: "In Dispute",
      className: "bg-red-950/80 border-red-500/40 text-red-300",
    },
  };

  const { icon: Icon, text, className } = config[status] || config.funds_locked;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold whitespace-nowrap shadow-sm ${className}`}
    >
      <Icon weight="bold" className="w-3.5 h-3.5" />
      <span>{text}</span>
    </span>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
      ) : (
        <Copy weight="bold" className="w-3.5 h-3.5" />
      )}
    </button>
  );
};

export const columns: ColumnDef<EscrowDeal>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <span>Deal ID</span>
          {isSorted === "asc" ? (
            <CaretUp weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : isSorted === "desc" ? (
            <CaretDown weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : (
            <CaretUpDown weight="bold" className="w-3.5 h-3.5 opacity-40" />
          )}
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[#00F59B] bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-bold">
            {row.original.id}
          </span>
          <CopyButton text={row.original.id} />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <span>Title & Scope</span>
          {isSorted === "asc" ? (
            <CaretUp weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : isSorted === "desc" ? (
            <CaretDown weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : (
            <CaretUpDown weight="bold" className="w-3.5 h-3.5 opacity-40" />
          )}
        </button>
      );
    },
    cell: ({ row, table }) => {
      const meta = table.options.meta as DealsTableMeta | undefined;
      return (
        <div
          onClick={() => meta?.onViewDeal?.(row.original)}
          className="max-w-[280px] cursor-pointer group"
        >
          <div className="font-semibold text-white group-hover:text-[#00F59B] transition-colors line-clamp-1">
            {row.original.title}
          </div>
          <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
            <span>{row.original.items[0]?.category || "Escrow Agreement"}</span>
            {row.original.items.length > 1 && (
              <span className="text-[10px] bg-white/10 px-1.5 py-0.2 rounded text-slate-300">
                +{row.original.items.length - 1} items
              </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      const roleStyles = {
        Buyer: "bg-blue-950/70 border-blue-500/40 text-blue-300",
        Seller: "bg-emerald-950/70 border-emerald-500/40 text-emerald-300",
        Broker: "bg-purple-950/70 border-purple-500/40 text-purple-300",
      };
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-semibold ${
            roleStyles[role] || "bg-white/10 text-slate-300"
          }`}
        >
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <span>Escrow Value</span>
          {isSorted === "asc" ? (
            <CaretUp weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : isSorted === "desc" ? (
            <CaretDown weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : (
            <CaretUpDown weight="bold" className="w-3.5 h-3.5 opacity-40" />
          )}
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="font-bold text-white whitespace-nowrap">
        {formatAmount(row.original.totalAmount, row.original.currency)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <span>Status</span>
          {isSorted === "asc" ? (
            <CaretUp weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : isSorted === "desc" ? (
            <CaretDown weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : (
            <CaretUpDown weight="bold" className="w-3.5 h-3.5 opacity-40" />
          )}
        </button>
      );
    },
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "inspectionDaysLeft",
    header: "Inspection",
    cell: ({ row }) => {
      if (row.original.status !== "in_inspection") {
        return <span className="text-slate-500 font-mono text-xs">—</span>;
      }
      const daysLeft = row.original.inspectionDaysLeft ?? 0;
      const isUrgent = daysLeft <= 1;
      return (
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold ${
            isUrgent ? "text-red-400 animate-pulse" : "text-amber-300"
          }`}
        >
          <Clock weight="bold" className="w-3.5 h-3.5" />
          <span>
            Day {daysLeft} of {row.original.inspectionDays}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "trackingNumber",
    header: "Tracking",
    cell: ({ row }) => {
      if (!row.original.trackingNumber) {
        return <span className="text-slate-500 font-mono text-xs">—</span>;
      }
      return (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Truck weight="bold" className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-mono text-xs text-slate-300">
            {row.original.trackingNumber}
          </span>
          <CopyButton text={row.original.trackingNumber} />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          <span>Created</span>
          {isSorted === "asc" ? (
            <CaretUp weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : isSorted === "desc" ? (
            <CaretDown weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
          ) : (
            <CaretUpDown weight="bold" className="w-3.5 h-3.5 opacity-40" />
          )}
        </button>
      );
    },
    cell: ({ row }) => (
      <span className="text-xs text-slate-400 whitespace-nowrap">
        {row.original.createdAt}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Quick Actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta as DealsTableMeta | undefined;
      const deal = row.original;
      const msgCount = meta?.messageCounts?.[deal.id] || 0;

      return (
        <div className="flex items-center gap-1.5 justify-end">
          {/* Direct contextual action buttons */}
          {deal.status === "in_inspection" && deal.role === "Buyer" && (
            <Button
              size="sm"
              onClick={() => meta?.onApproveDeal?.(deal)}
              className="h-8 px-2.5 bg-[#00F59B] hover:bg-[#33F7AC] text-[#04100C] font-bold text-xs rounded-lg cursor-pointer whitespace-nowrap"
              title="Approve & Release Payment"
            >
              <CheckCircle weight="bold" className="w-3.5 h-3.5 mr-1" />
              <span>Approve</span>
            </Button>
          )}

          {deal.status === "funds_locked" && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => meta?.onSubmitTracking?.(deal)}
              className="h-8 px-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg cursor-pointer whitespace-nowrap"
              title="Upload Tracking / Deliverable"
            >
              <Truck weight="bold" className="w-3.5 h-3.5 mr-1" />
              <span>Ship</span>
            </Button>
          )}

          {/* Chat/Message button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => meta?.onMessage?.(deal)}
            className="h-8 px-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer relative"
            title="Open Chat"
          >
            <ChatCircle weight="bold" className="w-4 h-4" />
            {msgCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00F59B] text-[#04100C] text-[10px] font-bold flex items-center justify-center">
                {msgCount}
              </span>
            )}
          </Button>

          {/* View Details Inspector button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => meta?.onViewDeal?.(deal)}
            className="h-8 px-2 text-slate-300 hover:text-[#00F59B] hover:bg-white/10 rounded-lg cursor-pointer"
            title="Inspect Deal Details"
          >
            <Eye weight="bold" className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
