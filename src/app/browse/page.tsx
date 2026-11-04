
import BrowseClient from "@/components/browse/BrowseClient";
import { listCategories, searchListings } from "@/lib/api";
import { counties } from "@/data/counties";
import type { ListingFilters } from "@/types";

type BrowsePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseFilters(
  params: Record<string, string | string[] | undefined>,
): ListingFilters {
  const query = firstValue(params.query);
  const county = firstValue(params.county);
  const category = firstValue(params.category);
  const minPrice = firstValue(params.minPrice);
  const maxPrice = firstValue(params.maxPrice);
  const dealType = firstValue(params.dealType);
  const sort = firstValue(params.sort);

  return {
    query: query || undefined,
    county: county || undefined,
    category: category || undefined,
    minPrice:
      minPrice && Number.isFinite(Number(minPrice))
        ? Number(minPrice)
        : undefined,
    maxPrice:
      maxPrice && Number.isFinite(Number(maxPrice))
        ? Number(maxPrice)
        : undefined,
    dealType: dealType || undefined,
    sellerFinancing:
      firstValue(params.sellerFinancing) === "true" || undefined,
    verifiedOnly:
      firstValue(params.verifiedOnly) === "true" || undefined,
    sort: sort || "newest",
  };
}

export default async function BrowsePage({
  searchParams,
}: BrowsePageProps) {
  const params = await searchParams;
  const initialFilters = parseFilters(params);

  const [categories, initialResult] = await Promise.all([
    listCategories(),
    searchListings(initialFilters, null),
  ]);

  return (
    <main>
      <BrowseClient
        initialFilters={initialFilters}
        initialResult={initialResult}
        categories={categories}
        counties={counties}
      />
    </main>
  );
}
