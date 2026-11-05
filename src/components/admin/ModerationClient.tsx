
"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Eye,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import type { Listing } from "@/types";

type ReviewStatus = "Pending" | "Approved" | "Rejected";

interface ModerationItem {
  listing: Listing;
  status: ReviewStatus;
  note: string;
}

export default function ModerationClient({
  listings,
}: {
  listings: Listing[];
}) {
  const [items, setItems] = useState<ModerationItem[]>(() =>
    listings.map((listing) => ({
      listing,
      status: "Pending",
      note: "",
    })),
  );
  const [filter, setFilter] = useState<ReviewStatus | "All">("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesStatus =
        filter === "All" || item.status === filter;

      const matchesQuery =
        !normalizedQuery ||
        item.listing.title.toLowerCase().includes(normalizedQuery) ||
        item.listing.town.toLowerCase().includes(normalizedQuery) ||
        item.listing.county.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [filter, items, query]);

  const selectedItem = items.find(
    (item) => item.listing.id === selectedId,
  );

  function updateStatus(
    id: string,
    status: Exclude<ReviewStatus, "Pending">,
  ) {
    setItems((current) =>
      current.map((item) =>
        item.listing.id === id
          ? { ...item, status }
          : item,
      ),
    );
  }

  function updateNote(id: string, note: string) {
    setItems((current) =>
      current.map((item) =>
        item.listing.id === id
          ? { ...item, note }
          : item,
      ),
    );
  }

  const pendingCount = items.filter(
    (item) => item.status === "Pending",
  ).length;

  return (
    <main className="site-container py-8 sm:py-12">
      <div>
        <p className="eyebrow">Internal tools</p>
        <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          Listing moderation
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Review submitted listings and record a demo decision.
        </p>
      </div>

      <div className="mt-6 rounded-control border border-clay/30 bg-clay/5 p-4 text-sm leading-6 text-ink">
        <strong>Demo moderator console.</strong> Decisions are held in
        temporary browser state. There is no moderator authentication,
        audit log, server-side permission check or production moderation
        workflow in this version. Do not use this route to moderate real
        listings.
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <SummaryCard label="Total listings" value={items.length} />
        <SummaryCard label="Pending review" value={pendingCount} />
        <SummaryCard
          label="Reviewed"
          value={items.length - pendingCount}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Search listings</span>
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search business or location"
            className="min-h-11 w-full rounded-control border border-border bg-white pl-10 pr-3 text-sm"
          />
        </label>

        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as ReviewStatus | "All")
          }
          aria-label="Filter by moderation status"
          className="min-h-11 rounded-control border border-border bg-white px-3 text-sm"
        >
          <option value="All">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <section className="mt-5 space-y-3">
        {visibleItems.length === 0 ? (
          <div className="rounded-card border border-border bg-white p-7 text-center">
            <ShieldAlert size={24} className="mx-auto text-ink/40" />
            <p className="mt-3 text-sm font-semibold">
              No listings found.
            </p>
            <p className="mt-1 text-xs text-ink/55">
              Try a different search or filter.
            </p>
          </div>
        ) : (
          visibleItems.map((item) => (
            <article
              key={item.listing.id}
              className="rounded-card border border-border bg-white p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="break-words font-semibold">
                    {item.listing.title}
                  </h2>
                  <p className="mt-1 text-xs text-ink/55">
                    {item.listing.category} · {item.listing.town},{" "}
                    {item.listing.county}
                  </p>
                  <p className="mt-2 text-sm font-semibold tabular-nums text-msitu">
                    {new Intl.NumberFormat("en-KE", {
                      style: "currency",
                      currency: "KES",
                      maximumFractionDigits: 0,
                    }).format(item.listing.askingPriceKes)}
                  </p>
                </div>

                <ReviewStatusLabel status={item.status} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedId(
                    selectedId === item.listing.id
                      ? null
                      : item.listing.id,
                  )}
                  className="inline-flex min-h-10 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs font-semibold"
                >
                  <Eye size={14} />
                  {selectedId === item.listing.id
                    ? "Hide details"
                    : "Review details"}
                </button>

                {item.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => updateStatus(item.listing.id, "Approved")}
                      className="inline-flex min-h-10 items-center gap-2 rounded-control bg-msitu px-3 py-2 text-xs font-semibold text-white"
                    >
                      <CheckCircle2 size={14} />
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(item.listing.id, "Rejected")}
                      className="inline-flex min-h-10 items-center gap-2 rounded-control border border-clay/40 px-3 py-2 text-xs font-semibold text-clay"
                    >
                      <XCircle size={14} />
                      Reject
                    </button>
                  </>
                )}

                {item.status !== "Pending" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(item.listing.id, "Pending")}
                    className="inline-flex min-h-10 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs font-semibold"
                  >
                    <Clock3 size={14} />
                    Reset to pending
                  </button>
                )}
              </div>

              {selectedId === item.listing.id && (
                <div className="mt-5 space-y-4 border-t border-border pt-4">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                      Description
                    </h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink/65">
                      {item.listing.description || "No description supplied."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                      Reason for sale
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink/65">
                      {item.listing.reasonForSale || "Not supplied."}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                      Seller-provided financial figures
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                      <p>
                        <span className="block text-xs text-ink/50">Revenue</span>
                        {item.listing.monthlyRevenueKes == null
                          ? "Not supplied"
                          : `KSh ${item.listing.monthlyRevenueKes.toLocaleString("en-KE")}`}
                      </p>
                      <p>
                        <span className="block text-xs text-ink/50">Profit</span>
                        {item.listing.monthlyProfitKes == null
                          ? "Not supplied"
                          : `KSh ${item.listing.monthlyProfitKes.toLocaleString("en-KE")}`}
                      </p>
                    </div>
                  </div>

                  <label className="block text-xs font-semibold text-ink/65">
                    Internal demo review note
                    <textarea
                      value={item.note}
                      onChange={(event) =>
                        updateNote(item.listing.id, event.target.value)
                      }
                      rows={3}
                      maxLength={500}
                      placeholder="Record a review note…"
                      className="mt-2 w-full rounded-control border border-border p-3 text-sm font-normal"
                    />
                  </label>
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </main>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-card border border-border bg-white p-4">
      <p className="text-xs text-ink/55">{label}</p>
      <p className="mt-2 text-2xl font-bold tabular-nums">
        {value}
      </p>
    </div>
  );
}

function ReviewStatusLabel({
  status,
}: {
  status: ReviewStatus;
}) {
  const className = {
    Pending: "bg-jua/15 text-ink",
    Approved: "bg-leaf/10 text-leaf",
    Rejected: "bg-clay/10 text-clay",
  }[status];

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold ${className}`}>
      {status}
    </span>
  );
}
