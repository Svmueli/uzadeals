
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  MessageCircle,
  Handshake,
} from "lucide-react";
import ListingCard from "@/components/listings/ListingCard";
import { listCategories, searchListings } from "@/lib/api";
import { counties } from "@/data/counties";

export default async function HomePage() {
  const [categories, latestListings] = await Promise.all([
    listCategories(),
    searchListings({ sort: "newest" }, null),
  ]);

  const featuredListings = latestListings.items.slice(0, 6);

  return (
    <main>
      <section className="bg-paper">
        <div className="site-container grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="eyebrow mb-4">Kenya's business marketplace</p>
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Buy a business.
              <span className="block text-msitu">
                Know the numbers.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink/70 sm:text-lg">
              Explore businesses for sale across Kenya. Compare asking
              prices, monthly profits and the details that help you ask
              better questions before making a decision.
            </p>

            <form
              action="/browse"
              method="GET"
              className="mt-8 rounded-[14px] border border-border bg-white p-3 shadow-sm sm:flex sm:items-center sm:gap-2"
            >
              <label className="flex min-h-12 flex-1 items-center gap-3 px-2">
                <Search
                  size={20}
                  className="shrink-0 text-ink/45"
                  aria-hidden="true"
                />
                <span className="sr-only">Search businesses</span>
                <input
                  name="query"
                  type="search"
                  placeholder="What business, and where?"
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/45"
                />
              </label>

              <label className="flex min-h-12 items-center border-t border-border px-2 sm:border-l sm:border-t-0">
                <span className="sr-only">County</span>
                <select
                  name="county"
                  defaultValue=""
                  className="w-full bg-transparent px-2 text-sm text-ink outline-none sm:w-36"
                >
                  <option value="">Any county</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-control bg-msitu px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0b3024] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jua sm:mt-0 sm:w-auto"
              >
                Find businesses
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </form>

            <p className="mt-3 text-xs text-ink/50">
              Browse listings from different towns, sectors and price
              ranges.
            </p>
          </div>

          <div className="relative hidden min-h-[340px] overflow-hidden rounded-[24px] bg-msitu p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/15" />
            <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full border border-white/15" />
            <div className="relative">
              <p className="text-sm font-semibold text-white/65">
                A clearer way to explore
              </p>
              <p className="mt-4 max-w-sm font-display text-3xl font-semibold leading-tight">
                Find the opportunity behind the numbers.
              </p>
            </div>
            <div className="relative grid grid-cols-2 gap-3">
              <div className="rounded-control border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-white/65">Compare</p>
                <p className="mt-1 font-semibold">Asking prices</p>
              </div>
              <div className="rounded-control border border-white/15 bg-white/10 p-4">
                <p className="text-xs text-white/65">Understand</p>
                <p className="mt-1 font-semibold">Monthly profit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Explore by sector</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              What are you looking for?
            </h2>
          </div>
          <Link
            href="/browse"
            className="hidden items-center gap-1 text-sm font-semibold text-msitu hover:underline sm:flex"
          >
            All businesses <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/browse?category=${encodeURIComponent(category.id)}`}
              className="flex min-h-12 shrink-0 items-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-msitu hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jua"
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <div className="site-container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Fresh opportunities</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                New this week
              </h2>
            </div>
            <Link
              href="/browse?sort=newest"
              className="flex min-h-11 items-center gap-1 text-sm font-semibold text-msitu hover:underline"
            >
              View all <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {featuredListings.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-[14px] border border-border bg-white p-8 text-center">
              <p className="font-semibold text-ink">
                No listings have been added yet.
              </p>
              <p className="mt-2 text-sm text-ink/60">
                Check back soon for new business opportunities.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="site-container py-14 sm:py-20">
        <div className="rounded-[24px] border border-border bg-white p-6 sm:p-9">
          <div className="max-w-xl">
            <p className="eyebrow">A more thoughtful process</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              Three steps to a better conversation.
            </h2>
          </div>

          <div className="mt-8 grid gap-7 sm:grid-cols-3">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-msitu">
                <Search size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-bold text-ink">1. Browse</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Explore businesses and compare the details that matter.
              </p>
            </div>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-msitu">
                <MessageCircle size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-bold text-ink">2. Ask</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Contact the seller and ask questions about the business.
              </p>
            </div>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-msitu">
                <Handshake size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-bold text-ink">3. Meet</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Arrange a meeting and carry out your own checks before
                reaching an agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container pb-14 sm:pb-20">
        <div className="flex flex-col gap-6 rounded-[24px] bg-msitu p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-white/65">
              Have a business to sell?
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Your next chapter could be someone else's beginning.
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/75">
              Prepare your business details and reach people looking for
              their next opportunity.
            </p>
          </div>
          <Link
            href="/sell"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-control bg-jua px-5 text-sm font-bold text-ink transition-colors hover:bg-[#f0b744] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Sell your business
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
