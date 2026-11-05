
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, MapPin, ShieldCheck } from "lucide-react";
import type { Listing } from "@/types";
import { formatKES } from "@/lib/formatKES";
import {
  getSavedListingIds,
  setListingSaved,
} from "@/lib/browser-storage";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setSaved(getSavedListingIds().includes(listing.id));
  }, [listing.id]);

  const hasProfit =
    typeof listing.monthlyProfitKes === "number" &&
    listing.monthlyProfitKes > 0;

  const paybackMonths = hasProfit
    ? listing.askingPriceKes / listing.monthlyProfitKes
    : null;

  const hasVerification = listing.verification != null;

  function handleSave() {
    const nextSaved = !saved;
    const persisted = setListingSaved(listing.id, nextSaved);

    if (!persisted) {
      setSaveError("Could not save this change in browser storage.");
      return;
    }

    setSaved(nextSaved);
    setSaveError("");
  }

  return (
    <article className="group relative overflow-hidden rounded-card border border-border bg-white transition-shadow hover:shadow-md">
      <Link
        href={`/listings/${listing.slug}`}
        className="absolute inset-0 z-10 rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jua"
        aria-label={`View ${listing.title}`}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-msitu/10">
        {listing.photos?.[0] ? (
          <Image
            src={listing.photos[0]}
            alt={listing.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-msitu text-4xl text-white/80">
            {listing.category}
          </div>
        )}

        <span className="absolute left-3 top-3 z-20 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">
          Demo listing
        </span>

        <button
          type="button"
          onClick={handleSave}
          aria-label={saved ? "Remove from saved listings" : "Save listing"}
          aria-pressed={saved}
          className="absolute right-3 top-3 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition-colors hover:text-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua"
        >
          <Heart
            size={19}
            fill={saved ? "currentColor" : "none"}
            className={saved ? "text-clay" : ""}
          />
        </button>

        {hasVerification && (
          <div className="absolute bottom-3 left-3 z-20 max-w-[85%] rounded-control bg-white/95 px-3 py-2 text-xs text-msitu">
            <div className="flex items-center gap-1 font-semibold">
              <ShieldCheck size={14} />
              Checked by UzaDeals
            </div>
            <p className="mt-1 text-ink/65">
              {listing.verification.checkedItems.join(", ")}
            </p>
          </div>
        )}
      </div>

      <div className="pointer-events-none relative z-0 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-msitu">
              {listing.category}
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold leading-tight text-ink">
              {listing.title}
            </h2>
          </div>
          {listing.negotiable && (
            <span className="shrink-0 rounded-full bg-jua/15 px-2 py-1 text-[11px] font-semibold text-ink">
              Negotiable
            </span>
          )}
        </div>

        <p className="mt-2 flex items-center gap-1 text-sm text-ink/60">
          <MapPin size={14} />
          {listing.town}, {listing.county}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3">
          <div>
            <p className="text-xs text-ink/55">Asking price</p>
            <p className="mt-1 font-semibold tabular-nums">
              {formatKES(listing.askingPriceKes)}
            </p>
          </div>
          <div>
            <p className="text-xs text-ink/55">Monthly profit</p>
            <p className="mt-1 font-semibold tabular-nums">
              {hasProfit
                ? formatKES(listing.monthlyProfitKes as number)
                : "Not provided"}
            </p>
          </div>
        </div>

        {paybackMonths !== null && (
          <p className="mt-3 text-xs text-ink/60">
            Simple payback estimate:{" "}
            <strong className="text-ink">
              {paybackMonths.toFixed(1)} months
            </strong>
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {listing.mpesaAccepted && (
            <span className="rounded-full bg-leaf/10 px-2 py-1 text-xs text-leaf">
              M-Pesa accepted
            </span>
          )}
          {listing.sellerFinancing && (
            <span className="rounded-full bg-jua/15 px-2 py-1 text-xs text-ink">
              Seller financing
            </span>
          )}
        </div>

        {saveError && (
          <p role="status" className="mt-2 text-xs text-clay">
            {saveError}
          </p>
        )}
      </div>
    </article>
  );
}
