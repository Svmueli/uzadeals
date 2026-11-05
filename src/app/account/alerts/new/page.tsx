
import type { Metadata } from "next";
import Link from "next/link";
import SearchAlertSettings from "@/components/alerts/SearchAlertSettings";
import type { ListingFilters } from "@/types";

export const metadata: Metadata = {
  title: "Save a search alert | UzaDeals",
  description: "Save alert preferences for a UzaDeals business search.",
  robots: { index: false, follow: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewSearchAlertPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const filters: ListingFilters = {
    query: first(params.query) || "",
    county: first(params.county) || "",
    category: first(params.category) || "",
    minPrice: first(params.minPrice)
      ? Number(first(params.minPrice))
      : undefined,
    maxPrice: first(params.maxPrice)
      ? Number(first(params.maxPrice))
      : undefined,
    dealType: first(params.dealType) || "",
    sellerFinancing: first(params.sellerFinancing) === "true",
    verifiedOnly: first(params.verifiedOnly) === "true",
    sort: first(params.sort) || "newest",
  };

  const labelParts = [
    filters.query,
    filters.category,
    filters.county,
  ].filter(Boolean);

  const label = labelParts.length
    ? labelParts.join(" · ")
    : "All businesses";

  return (
    <main className="site-container py-10 sm:py-14">
      <Link
        href="/account/alerts"
        className="text-sm font-medium text-msitu underline underline-offset-4"
      >
        Back to search alerts
      </Link>

      <div className="mt-7 max-w-2xl">
        <p className="eyebrow">Saved search</p>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">
          Set your alert preferences.
        </h1>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Preferences below belong to this filter combination. Change your
          browse filters and create another saved search to keep separate
          preferences for it.
        </p>

        <div className="mt-7">
          <SearchAlertSettings filters={filters} label={label} />
        </div>
      </div>
    </main>
  );
}
