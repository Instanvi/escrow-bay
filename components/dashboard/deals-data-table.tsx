"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlass,
  CaretLeft,
  CaretRight,
  ShieldCheck,
  Funnel,
} from "@phosphor-icons/react";
import { DealsTableMeta } from "./deals-columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: DealsTableMeta;
}

export function DealsDataTable<TData, TValue>({
  columns,
  data,
  meta,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    meta,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* Table Controls Bar: Quick Search & Counts */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Input
            placeholder="Search deals by ID, title, counterparty..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 h-10 bg-[#050B08] border-white/15 text-xs text-white placeholder:text-slate-500 rounded-xl focus:border-[#00F59B]"
          />
          <MagnifyingGlass
            weight="bold"
            className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#050B08] border border-white/10">
            <ShieldCheck weight="bold" className="w-3.5 h-3.5 text-[#00F59B]" />
            <strong className="text-white">{data.length}</strong> Escrow Agreements
          </span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-white/10 bg-[#050B08] shadow-2xl overflow-hidden backdrop-blur-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-white/10 bg-[#040806] hover:bg-[#040806]"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-slate-400 font-bold text-xs uppercase tracking-wider py-3.5 px-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center gap-2 py-6">
                    <Funnel weight="bold" className="w-8 h-8 text-slate-600" />
                    <p className="text-sm font-semibold text-slate-300">
                      No escrow deals match your criteria.
                    </p>
                    {globalFilter && (
                      <button
                        type="button"
                        onClick={() => setGlobalFilter("")}
                        className="text-xs text-[#00F59B] hover:underline cursor-pointer"
                      >
                        Clear search query
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <div>
            Showing{" "}
            <span className="font-bold text-white">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-white">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                data.length
              )}
            </span>{" "}
            of <span className="font-bold text-white">{data.length}</span> deals
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 px-3 text-xs border-white/10 hover:bg-white/10 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <CaretLeft weight="bold" className="w-3.5 h-3.5 mr-1" />
              <span>Previous</span>
            </Button>
            <span className="px-2 font-mono text-slate-300">
              {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 px-3 text-xs border-white/10 hover:bg-white/10 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <CaretRight weight="bold" className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
