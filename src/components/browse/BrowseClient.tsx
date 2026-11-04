
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Sheet } from "@/components/ui/sheet";
import { ListingCardSkeleton } from "@/components/ui/skeleton";
import { searchListings } from "@/lib/api";
import { formatKES } from "@/lib/formatKES";
import type {
  BusinessCategory,
  Listing,
  ListingFilters,
  ListingSearchResult,
} from "@/types";

type BrowseClientProps = {
  initialFilters: ListingFilters;
  initialResult: ListingSearchResult;
  categories: BusinessCategory[];
  counties: readonly string[];
};

const MAX_PRICE = 20_000_000;

function cleanFilters(filters: ListingFilters): ListingFilters {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }
      if (typeof value === "boolean" && value === false) {
        return false;
      }
      return true;
    }),
  ) as ListingFilters;
}

export default function BrowseClient({
  initialFilters,
  initialResult,
  categories,
  counties,
}: BrowseClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] =
    useState<ListingFilters>(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<ListingFilters>(initialFilters);

  const [listings, setListings] = useState<Listing[]>(initialResult.items);
  const [nextCursor, setNextCursor] = useState<string | null>(
    initialResult.nextCursor,
  );
  const [total, setTotal] = useState(initialResult.total);
  const [liveCount, setLiveCount] = useState(initialResult.total);
  const [countLoading, setCountLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const minPrice = draftFilters.minPrice ?? "";
  const maxPrice = draftFilters.maxPrice ?? "";

  const activeFilterCount = useMemo(() => {
    return [
      draftFilters.county,
      draftFilters.category,
      draftFilters.minPrice !== undefined,
      draftFilters.maxPrice !== undefined,
      draftFilters.dealType,
      draftFilters.sellerFinancing,
      draftFilters.verifiedOnly,
    ].filter(Boolean).length;
  }, [draftFilters]);

  useEffect(() => {
    let cancelled = false;

    async function updateCount() {
      setCountLoading(true);

      try {
        const result = await searchListings(cleanFilters(draftFilters), null);
        if (!cancelled) setLiveCount(result.total);
      } catch {
        if (!cancelled) setLiveCount(0);
      } finally {
        if (!cancelled) setCountLoading(false);
      }
    }

    updateCount();

    return () => {
      cancelled = true;
    };
  }, [draftFilters]);

  function updateDraft<K extends keyof ListingFilters>(
    key: K,
    value: ListingFilters[K],
  ) {
    setDraftFilters((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function writeFiltersToUrl(filters: ListingFilters) {
    const params = new URLSearchParams();
    const cleaned = cleanFilters(filters);

    Object.entries(cleaned).forEach(([key, value]) => {
      params.set(key, String(value));
    });

    const queryString = params.toString();

    router.replace(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false },
    );
  }

  async function loadListings(filters: ListingFilters) {
    setListLoading(true);
    setAlertMessage("");

    try {
      const result = await searchListings(filters, null);
      setListings(result.items);
      setNextCursor(result.nextCursor);
      setTotal(result.total);
      setLiveCount(result.total);
    } catch {
      setListings([]);
      setNextCursor(null);
      setTotal(0);
    } finally {
      setListLoading(false);
    }
  }

  async function applyFilters() {
    const nextFilters = cleanFilters(draftFilters);

    setAppliedFilters(nextFilters);
    writeFiltersToUrl(nextFilters);
    setFiltersOpen(false);

    await loadListings(nextFilters);
  }

  async function clearFilters() {
    const cleared: ListingFilters = {};

    setDraftFilters(cleared);
    setAppliedFilters(cleared);
    writeFiltersToUrl(cleared);
    setFiltersOpen(false);

    await loadListings(cleared);
  }

  async function changeSort(value: string) {
    const nextFilters = cleanFilters({
      ...draftFilters,
      sort: value as ListingFilters["sort"],
    });

    setDraftFilters(nextFilters);
    setAppliedFilters(nextFilters);
    writeFiltersToUrl(nextFilters);

    await loadListings(nextFilters);
  }

  async function showMore() {
    if (!nextCursor || moreLoading) return;

    setMoreLoading(true);

    try {
      const result = await searchListings(appliedFilters, nextCursor);

      setListings((current) => {
        const existingIds = new Set(current.map((item) => item.id));
        const additional = result.items.filter(
          (item) => !existingIds.has(item.id),
        );

        return [...current, ...additional];
      });

      setNextCursor(result.nextCursor);
      setTotal(result.total);
    } finally {
      setMoreLoading(false);
    }
  }

  function handleSearch(value: string) {
    updateDraft("query", value || undefined);
  }

  function handlePriceInput(
    key: "minPrice" | "maxPrice",
    value: string,
  ) {
    updateDraft(key, value === "" ? undefined : Number(value));
  }

  function requestAlert() {
    setAlertMessage(
      "Alerts are not connected yet. Sign-in and alert delivery will be available in a later step.",
    );
  }

  return (
    <div className="site-container py-8 sm:py-12">
      <div className="mb-7">
        <p className="eyebrow">Explore opportunities</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          Businesses for sale
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/65">
          Compare businesses across Kenya. Review the figures, ask
          questions and do your own due diligence before making a decision.
        </p>
      </div>

      <div className="sticky top-0 z-30 -mx-4 border-y border-border bg-paper/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:rounded-[14px] sm:border sm:p-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex min-h-12 flex-1 items-center gap-3 rounded-control border border-border bg-white px-3">
            <Search size={18} className="text-ink/45" aria-hidden="true" />
            <span className="sr-only">Search listings</span>
            <input
              type="search"
              value={draftFilters.query ?? ""}
              onChange={(event) => handleSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void applyFilters();
              }}
              placeholder="Business name, type or town"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/45"
            />
            {draftFilters.query && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-ink/55 hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua"
                aria-label="Clear search"
              >
                <X size={16} aria-hidden="true" />
              </button>
            )}
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-control border border-border bg-white px-4 text-sm font-semibold text-ink hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua sm:flex-none"
            >
              <SlidersHorizontal size={17} aria-hidden="true" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-jua px-1 text-xs font-bold text-ink">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <label className="flex min-h-12 flex-1 items-center rounded-control border border-border bg-white px-3 sm:flex-none">
              <span className="sr-only">Sort listings</span>
              <select
                value={draftFilters.sort ?? "newest"}
                onChange={(event) => void changeSort(event.target.value)}
                className="w-full bg-transparent text-sm font-medium text-ink outline-none sm:w-44"
              >
                <option value="newest">Newest first</option>
                <option value="price-asc">Lowest price</option>
                <option value="payback-asc">Best payback</option>
              </select>
              <ChevronDown
                size={15}
                className="shrink-0 text-ink/45"
                aria-hidden="true"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/65" aria-live="polite">
          {listLoading
            ? "Updating listings…"
            : `${total.toLocaleString("en-KE")} businesses`}
        </p>
      </div>

      {listLoading ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {nextCursor && (
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                loading={moreLoading}
                onClick={showMore}
              >
                Show more
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 rounded-[14px] border border-border bg-paper px-5 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-msitu">
            <Search size={21} aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-ink">
            Nothing matches yet. Try a nearby county, or get alerted when
            something appears
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-ink/65">
            You can broaden your search or request an alert for this
            combination of filters.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
            <Button onClick={requestAlert}>
              <Bell size={16} aria-hidden="true" />
              Get an alert
            </Button>
          </div>
          {alertMessage && (
            <p
              className="mx-auto mt-4 max-w-md text-sm text-ink/65"
              role="status"
            >
              {alertMessage}
            </p>
          )}
        </div>
      )}

      <Sheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filter businesses"
        description="Narrow down the opportunities you want to explore."
      >
        <div className="space-y-5">
          <Accordion>
            <AccordionItem title="Location">
              <label className="block text-sm font-medium text-ink">
                County
                <select
                  value={draftFilters.county ?? ""}
                  onChange={(event) =>
                    updateDraft("county", event.target.value || undefined)
                  }
                  className="mt-2 min-h-12 w-full rounded-control border border-border bg-white px-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-jua"
                >
                  <option value="">Any county</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </label>
            </AccordionItem>

            <AccordionItem title="Business category">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Chip
                    key={category.id}
                    selected={draftFilters.category === category.id}
                    onClick={() =>
                      updateDraft(
                        "category",
                        draftFilters.category === category.id
                          ? undefined
                          : category.id,
                      )
                    }
                  >
                    {category.emoji} {category.name}
                  </Chip>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem title="Asking price">
              <div className="grid grid-cols-2 gap-3">
                <label className="text-sm font-medium text-ink">
                  Minimum (KES)
                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={(event) =>
                      handlePriceInput("minPrice", event.target.value)
                    }
                    placeholder="No minimum"
                    className="mt-2 min-h-12 w-full rounded-control border border-border bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-jua"
                  />
                </label>
                <label className="text-sm font-medium text-ink">
                  Maximum (KES)
                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={(event) =>
                      handlePriceInput("maxPrice", event.target.value)
                    }
                    placeholder="No maximum"
                    className="mt-2 min-h-12 w-full rounded-control border border-border bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-jua"
                  />
                </label>
              </div>

              <label className="mt-5 block text-sm font-medium text-ink">
                Maximum price:{" "}
                <span className="tabular-nums">
                  {formatKES(Number(maxPrice) || MAX_PRICE)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={MAX_PRICE}
                  step="50000"
                  value={Math.min(Number(maxPrice) || MAX_PRICE, MAX_PRICE)}
                  onChange={(event) =>
                    handlePriceInput("maxPrice", event.target.value)
                  }
                  className="mt-3 w-full accent-[#0F3D2E]"
                />
              </label>
            </AccordionItem>

            <AccordionItem title="Deal type">
              <label className="block text-sm font-medium text-ink">
                Deal type
                <input
                  type="text"
                  value={draftFilters.dealType ?? ""}
                  onChange={(event) =>
                    updateDraft("dealType", event.target.value || undefined)
                  }
                  placeholder="Enter a deal type"
                  className="mt-2 min-h-12 w-full rounded-control border border-border bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-jua"
                />
              </label>
            </AccordionItem>
          </Accordion>

          <div className="space-y-3 border-t border-border pt-4">
            <label className="flex min-h-12 cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="block text-sm font-semibold text-ink">
                  Seller financing
                </span>
                <span className="block text-xs text-ink/55">
                  Sellers open to a payment arrangement
                </span>
              </span>
              <input
                type="checkbox"
                checked={Boolean(draftFilters.sellerFinancing)}
                onChange={(event) =>
                  updateDraft(
                    "sellerFinancing",
                    event.target.checked || undefined,
                  )
                }
                className="h-5 w-5 accent-[#0F3D2E]"
              />
            </label>

            <label className="flex min-h-12 cursor-pointer items-center justify-between gap-3">
              <span>
                <span className="block text-sm font-semibold text-ink">
                  Verified only
                </span>
                <span className="block text-xs text-ink/55">
                  Listings with verification details
                </span>
              </span>
              <input
                type="checkbox"
                checked={Boolean(draftFilters.verifiedOnly)}
                onChange={(event) =>
                  updateDraft(
                    "verifiedOnly",
                    event.target.checked || undefined,
                  )
                }
                className="h-5 w-5 accent-[#0F3D2E]"
              />
            </label>
          </div>

          <div className="sticky bottom-0 flex gap-3 border-t border-border bg-white py-4">
            <Button variant="outline" fullWidth onClick={clearFilters}>
              Reset
            </Button>
            <Button
              fullWidth
              onClick={applyFilters}
              loading={countLoading}
            >
              {countLoading
                ? "Counting…"
                : `Show ${liveCount.toLocaleString("en-KE")} businesses`}
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
