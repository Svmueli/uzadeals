
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Search } from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import { getSavedListingIds } from "@/lib/browser-storage";
import { searchListings } from "@/lib/api";
import type { Listing } from "@/types";

export default function SavedListingsClient() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadSaved() {
      try {
        const ids = getSavedListingIds();
        const result = await searchListings({}, null);

        if (!active) return;

        const saved = result.items.filter((listing) =>
          ids.includes(listing.id),
        );

        setListings(saved);
      } catch {
        if (active) setStorageAvailable(false);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadSaved();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="site-container py-10 sm:py-14">
      <div className="mb-8">
        <p className="eyebrow">Your shortlist</p>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Saved businesses
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-ink/65">
          Keep interesting opportunities together while you compare them.
        </p>
      </div>

      {!storageAvailable && (
        <p role="alert" className="mb-5 rounded-control bg-clay/10 p-4 text-sm text-clay">
          Your browser could not load saved listings. Check your storage settings.
        </p>
      )}

      {loading ? (
        <p role="status" className="text-sm text-ink/60">
          Loading your saved listings…
        </p>
      ) : listings.length > 0 ? (
        <>
          <p className="mb-5 text-sm text-ink/60">
            {listings.length} saved {listings.length === 1 ? "business" : "businesses"}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </>
      ) : (
        <div className="surface-card flex flex-col items-center px-5 py-12 text-center">
          <Bookmark size={30} className="text-msitu" />
          <h2 className="mt-4 font-display text-2xl font-semibold">
            Nothing saved yet.
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-ink/60">
            Browse businesses and use the heart icon to keep a shortlist here.
          </p>
          <Link
            href="/browse"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-control bg-msitu px-5 py-3 text-sm font-semibold text-white hover:bg-msitu/90"
          >
            <Search size={16} />
            Browse businesses
          </Link>
        </div>
      )}
    </main>
  );
}
