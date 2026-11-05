
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Eye,
  Heart,
  MessageCircle,
  MessageSquare,
  Plus,
  Send,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  sellerDashboardListings,
  sellerInboxDemo,
  type InboxStatus,
  type SellerInboxThread,
  type SellerDashboardListing,
} from "@/data/seller-dashboard";

const KES = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

type InboxFilter = "All" | InboxStatus;

export default function SellerDashboardClient() {
  const [listings, setListings] = useState(sellerDashboardListings);
  const [threads, setThreads] = useState(sellerInboxDemo);
  const [filter, setFilter] = useState<InboxFilter>("All");
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredThreads = useMemo(
    () => filter === "All"
      ? threads
      : threads.filter((thread) => thread.status === filter),
    [filter, threads],
  );

  const totalViews = listings.reduce((sum, item) => sum + item.views, 0);
  const totalSaves = listings.reduce((sum, item) => sum + item.saves, 0);
  const totalInquiries = listings.reduce((sum, item) => sum + item.inquiries, 0);
  const newMessages = threads.filter((thread) => thread.status === "New").length;

  function updateThreadStatus(id: string, status: InboxStatus) {
    setThreads((current) =>
      current.map((thread) =>
        thread.id === id ? { ...thread, status } : thread,
      ),
    );
  }

  function markSold(id: string) {
    setListings((current) =>
      current.map((listing) =>
        listing.id === id ? { ...listing, status: "Sold" } : listing,
      ),
    );
  }

  function restoreListing(id: string) {
    setListings((current) =>
      current.map((listing) =>
        listing.id === id ? { ...listing, status: "Live" } : listing,
      ),
    );
  }

  function shareReply(
    channel: "sms" | "whatsapp",
    thread: SellerInboxThread,
  ) {
    const message = replyText.trim();

    if (!message) return;

    const body = encodeURIComponent(message);
    const url = channel === "sms"
      ? `sms:?body=${body}`
      : `https://wa.me/?text=${body}`;

    window.open(url, "_blank", "noopener,noreferrer");
    updateThreadStatus(thread.id, "Replied");
  }

  async function copyReply() {
    if (!replyText.trim()) return;

    try {
      await navigator.clipboard.writeText(replyText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function openReply(thread: SellerInboxThread) {
    setActiveThread(thread.id);
    setReplyText(
      `Hi ${thread.buyerFirstName}, thanks for your interest in ${thread.listingTitle}. `,
    );
    setCopied(false);
  }

  function closeReply() {
    setActiveThread(null);
    setReplyText("");
    setCopied(false);
  }

  const statCards = [
    {
      label: "Listing views",
      value: totalViews.toLocaleString("en-KE"),
      icon: Eye,
      description: "Across your demo listings",
    },
    {
      label: "Saves",
      value: totalSaves.toLocaleString("en-KE"),
      icon: Heart,
      description: "Buyer shortlists",
    },
    {
      label: "Inquiries",
      value: totalInquiries.toLocaleString("en-KE"),
      icon: MessageCircle,
      description: "Demo inquiry count",
    },
    {
      label: "New messages",
      value: newMessages.toString(),
      icon: Bell,
      description: "Awaiting a response",
    },
  ];

  return (
    <main className="site-container py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Seller workspace</p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Your dashboard.
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Keep track of your listings and buyer conversations.
          </p>
        </div>

        <Link
          href="/sell"
          className="inline-flex min-h-11 items-center gap-2 rounded-control bg-msitu px-4 py-3 text-sm font-semibold text-white hover:bg-msitu/90"
        >
          <Plus size={17} />
          New listing
        </Link>
      </div>

      <div className="mt-7 rounded-control border border-jua/40 bg-jua/10 p-4 text-sm leading-6 text-ink">
        <strong>Demo dashboard.</strong> Listing metrics and buyer conversations are fictional sample data. Changes made here are temporary and are not sent to a real buyer or marketplace.
      </div>

      <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-card border border-border bg-white p-4 sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-ink/55">
                  {stat.label}
                </span>
                <Icon size={18} className="text-msitu" />
              </div>
              <p className="mt-3 text-2xl font-bold tabular-nums text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] leading-5 text-ink/50">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow">01 / Performance</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">
              Your listings
            </h2>
          </div>
          <span className="text-xs text-ink/50">
            {listings.length} demo listings
          </span>
        </div>

        <div className="space-y-3">
          {listings.map((listing) => (
            <ListingPerformanceCard
              key={listing.id}
              listing={listing}
              onMarkSold={markSold}
              onRestore={restoreListing}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">02 / Conversations</p>
            <h2 className="mt-1 font-display text-2xl font-semibold">
              Buyer inbox
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              Review inquiries and manage your responses.
            </p>
          </div>
          <span className="rounded-full bg-msitu/10 px-3 py-2 text-xs font-semibold text-msitu">
            {newMessages} new
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {(["All", "New", "Replied", "Closed"] as InboxFilter[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`min-h-10 rounded-full border px-4 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua ${
                filter === item
                  ? "border-msitu bg-msitu text-white"
                  : "border-border bg-white text-ink/65 hover:border-msitu"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredThreads.length === 0 ? (
          <div className="rounded-card border border-border bg-white p-7 text-center">
            <MessageSquare size={25} className="mx-auto text-ink/40" />
            <p className="mt-3 font-semibold">No conversations here.</p>
            <p className="mt-1 text-sm text-ink/55">
              Try another inbox filter.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredThreads.map((thread) => (
              <article
                key={thread.id}
                className="min-w-0 rounded-card border border-border bg-white p-4 sm:p-5"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-msitu/10 text-sm font-bold text-msitu">
                      {thread.buyerFirstName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {thread.buyerFirstName}
                      </h3>
                      <p className="mt-1 break-words text-xs text-ink/55">
                        {thread.listingTitle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <StatusLabel status={thread.status} />
                    <p className="mt-2 text-[10px] text-ink/45">
                      {thread.receivedAt}
                    </p>
                  </div>
                </div>

                <p className="mt-4 break-words rounded-control bg-paper p-3 text-sm leading-6 text-ink/75">
                  {thread.firstLine}
                </p>

                {activeThread === thread.id ? (
                  <div className="mt-4 space-y-3">
                    <label className="block text-xs font-semibold text-ink/65">
                      Your reply
                      <textarea
                        value={replyText}
                        onChange={(event) => setReplyText(event.target.value)}
                        rows={4}
                        maxLength={1000}
                        className="mt-2 w-full rounded-control border border-border bg-white p-3 text-sm leading-6 focus:border-jua focus:outline-none focus:ring-2 focus:ring-jua/30"
                        placeholder="Write a helpful response…"
                      />
                    </label>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => shareReply("sms", thread)}
                        disabled={!replyText.trim()}
                        className="inline-flex min-h-10 items-center gap-2 rounded-control bg-msitu px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"
                      >
                        <Send size={14} />
                        Open SMS
                      </button>

                      <button
                        type="button"
                        onClick={() => shareReply("whatsapp", thread)}
                        disabled={!replyText.trim()}
                        className="inline-flex min-h-10 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs font-semibold text-ink disabled:opacity-40"
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </button>

                      <button
                        type="button"
                        onClick={() => void copyReply()}
                        disabled={!replyText.trim()}
                        className="min-h-10 rounded-control border border-border px-3 py-2 text-xs font-semibold text-ink disabled:opacity-40"
                      >
                        {copied ? "Copied" : "Copy reply"}
                      </button>

                      <button
                        type="button"
                        onClick={closeReply}
                        className="min-h-10 rounded-control px-3 py-2 text-xs font-medium text-ink/55"
                      >
                        Cancel
                      </button>
                    </div>

                    <p className="text-xs leading-5 text-ink/50">
                      Demo: this opens your messaging app with the reply text. It does not send a message or identify the buyer&apos;s number.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openReply(thread)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-control bg-msitu px-3 py-2 text-xs font-semibold text-white"
                    >
                      <MessageCircle size={14} />
                      Reply
                    </button>

                    {thread.status !== "Closed" && (
                      <button
                        type="button"
                        onClick={() => updateThreadStatus(thread.id, "Closed")}
                        className="min-h-10 rounded-control border border-border px-3 py-2 text-xs font-semibold text-ink/65 hover:border-clay hover:text-clay"
                      >
                        Not interested
                      </button>
                    )}

                    {thread.status === "Closed" && (
                      <button
                        type="button"
                        onClick={() => updateThreadStatus(thread.id, "New")}
                        className="min-h-10 rounded-control border border-border px-3 py-2 text-xs font-semibold text-ink/65"
                      >
                        Reopen
                      </button>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 rounded-card bg-msitu p-5 text-white sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-jua">
              Keep moving
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Have another business to list?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Create another listing and reach more potential buyers.
            </p>
          </div>

          <Link
            href="/sell"
            className="inline-flex min-h-11 items-center gap-2 rounded-control bg-white px-4 py-3 text-sm font-semibold text-msitu"
          >
            Create listing
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <p className="mt-6 text-xs leading-5 text-ink/45">
        All figures, inbox threads and status changes on this page are demo-only. They are held in page state and reset when the page is refreshed.
      </p>
    </main>
  );
}

function StatusLabel({ status }: { status: InboxStatus }) {
  const styles: Record<InboxStatus, string> = {
    New: "bg-jua/15 text-ink",
    Replied: "bg-leaf/10 text-leaf",
    Closed: "bg-paper text-ink/50",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}>
      {status}
    </span>
  );
}

function ListingPerformanceCard({
  listing,
  onMarkSold,
  onRestore,
}: {
  listing: SellerDashboardListing;
  onMarkSold: (id: string) => void;
  onRestore: (id: string) => void;
}) {
  return (
    <article className="rounded-card border border-border bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words font-semibold">{listing.title}</h3>
          <p className="mt-1 font-semibold tabular-nums text-msitu">
            {KES.format(listing.askingPriceKes)}
          </p>
        </div>

        <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${
          listing.status === "Live"
            ? "bg-leaf/10 text-leaf"
            : listing.status === "Sold"
              ? "bg-msitu/10 text-msitu"
              : "bg-jua/15 text-ink"
        }`}>
          {listing.status}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
        <Metric icon={<Eye size={14} />} label="Views" value={listing.views} />
        <Metric icon={<Heart size={14} />} label="Saves" value={listing.saves} />
        <Metric icon={<MessageCircle size={14} />} label="Inquiries" value={listing.inquiries} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {listing.status === "Live" && (
          <button
            type="button"
            onClick={() => onMarkSold(listing.id)}
            className="min-h-10 rounded-control bg-msitu px-3 py-2 text-xs font-semibold text-white"
          >
            Mark sold
          </button>
        )}

        {listing.status === "Sold" && (
          <button
            type="button"
            onClick={() => onRestore(listing.id)}
            className="min-h-10 rounded-control border border-border px-3 py-2 text-xs font-semibold text-ink"
          >
            Restore to live
          </button>
        )}

        <Link
          href="/sell"
          className="inline-flex min-h-10 items-center rounded-control border border-border px-3 py-2 text-xs font-semibold text-ink"
        >
          Edit listing
        </Link>
      </div>
    </article>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1 text-ink/50">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <p className="mt-1 text-lg font-semibold tabular-nums">
        {value.toLocaleString("en-KE")}
      </p>
    </div>
  );
}
