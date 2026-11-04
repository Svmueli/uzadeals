
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, MapPin, ShieldCheck } from "lucide-react";
import type { Listing } from "@/types";
import { formatKES } from "@/lib/formatKES";
import { toggleSave } from "@/lib/api";

type ListingCardProps = {
  listing: Listing;
};

export default function ListingCard({ listing }: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  const [savePending, setSavePending] = useState(false);

  const hasProfit =
    typeof listing.monthlyProfitKes === "number" &&
    listing.monthlyProfitKes > 0;

  const paybackMonths = hasProfit
    ? listing.askingPriceKes / listing.monthlyProfitKes
    : null;

  const hasVerification = listing.verification != null;

  async function handleSave() {
    if (savePending) return;

    const nextSaved = !saved;
    setSaved(nextSaved);
    setSavePending(true);

    try {
      await toggleSave(listing.id);
    } catch {
      setSaved(!nextSaved);
    } finally {
      setSavePending(false);
    }
  }

  return (
    <article className="group relative overflow-hidden rounded-[14px] border border-border bg-white transition-transform duration-200 hover:-translate-y-1 motion-reduce:transform-none">
      <Link
        href={`/listings/${listing.slug}`}
        className="absolute inset-0 z-10 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jua"
        aria-label={`View ${listing.title}`}
      >
        <span className="sr-only">View listing: {listing.title}</span>
      </Link>

      <div className="relative aspect-[16/9] overflow-hidden bg-msitu">
        {listing.photos?.[0] ? (
          <Image
            src={listing.photos[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-msitu to-[#1c6049]">
            <span className="text-5xl" aria-hidden="true">
              {listing.category}
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full bg-jua px-3 py-1.5 text-sm font-bold tabular-nums text-ink">
          {formatKES(listing.askingPriceKes)}
        </div>

        <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-2.5 py-1 text-xs font-semibold text-white">
          Demo listing
        </span>

        <button
          type="button"
          onClick={handleSave}
          disabled={savePending}
          aria-label={saved ? "Remove saved listing" : "Save listing"}
          aria-pressed={saved}
          className="absolute right-3 top-3 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jua disabled:opacity-60"
        >
          <Heart
            size={19}
            fill={saved ? "currentColor" : "none"}
            className={saved ? "text-clay" : ""}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="relative">
        <div className="pointer-events-none space-y-3 p-4">
          <div className="flex min-h-6 items-start justify-between gap-2">
            <h2 className="line-clamp-2 text-base font-bold leading-snug text-ink">
              {listing.title}
            </h2>

            {hasVerification && (
              <details className="pointer-events-auto relative z-20 shrink-0">
                <summary
                  className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-full px-2 text-xs font-semibold text-leaf hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua [&::-webkit-details-marker]:hidden"
                  aria-label="View verification details"
                >
                  <ShieldCheck size={16} aria-hidden="true" />
                  Verified
                </summary>
                <div className="absolute right-0 top-full z-30 mt-1 w-56 rounded-control border border-border bg-white p-3 text-xs shadow-lg">
                  <p className="mb-2 font-bold text-ink">Checked items</p>
                  <ul className="list-disc space-y-1 pl-4 text-ink/75">
                    {listing.verification?.checkedItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
            )}
          </div>

          <p className="flex items-center gap-1.5 text-sm text-ink/65">
            <MapPin size={15} aria-hidden="true" />
            <span>
              {listing.town}, {listing.county}
            </span>
          </p>

          <div
            className={`grid divide-x divide-border rounded-control bg-paper py-3 ${
              hasProfit ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            <div className="px-2">
              <p className="text-[11px] leading-tight text-ink/55">
                Monthly profit
              </p>
              <p className="mt-1 text-sm font-bold tabular-nums text-ink">
                {hasProfit
                  ? formatKES(listing.monthlyProfitKes!)
                  : "Not stated"}
              </p>
            </div>

            {paybackMonths !== null && (
              <div className="px-2">
                <p className="text-[11px] leading-tight text-ink/55">
                  Payback
                </p>
                <p className="mt-1 text-sm font-bold tabular-nums text-ink">
                  {paybackMonths.toFixed(1)} months
                </p>
              </div>
            )}

            <div className="px-2">
              <p className="text-[11px] leading-tight text-ink/55">
                Operating
              </p>
              <p className="mt-1 text-sm font-bold tabular-nums text-ink">
                {listing.yearsOperating}{" "}
                {listing.yearsOperating === 1 ? "yr" : "yrs"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {listing.mpesaAccepted && (
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-ink/70">
                M-Pesa
              </span>
            )}
            {listing.sellerFinancing && (
              <span className="rounded-full border border-border px-2.5 py-1 text-xs text-ink/70">
                Seller financing
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
