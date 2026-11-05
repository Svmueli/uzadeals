
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { getListing } from "@/lib/api";
import { formatKES } from "@/lib/formatKES";
import InquiryTrigger from "@/components/inquiries/InquiryTrigger";
import type { Listing } from "@/types";

type ListingPageProps = {
  params: Promise<{ slug: string }>;
};

async function loadListing(slug: string): Promise<Listing | null> {
  return getListing(slug);
}

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await loadListing(slug);

  if (!listing) {
    return {
      title: "Business listing not found | UzaDeals",
      description: "This business listing could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    listing.description?.slice(0, 155) ||
    `${listing.title} for sale in ${listing.town}, ${listing.county}. View the asking price and seller-reported business details on UzaDeals.`;

  return {
    title: `${listing.title} for sale in ${listing.town} | UzaDeals`,
    description,
    alternates: {
      canonical: `/listings/${listing.slug}`,
    },
    openGraph: {
      title: `${listing.title} | UzaDeals`,
      description,
      type: "website",
      ...(listing.photos?.[0]
        ? {
            images: [
              {
                url: listing.photos[0],
                alt: listing.title,
              },
            ],
          }
        : {}),
    },
  };
}

function FigureRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="py-3">
      <div className="flex items-end gap-2">
        <span className="text-sm text-ink/70">{label}</span>
        <span
          className="mb-1 min-w-3 flex-1 border-b border-dotted border-ink/30"
          aria-hidden="true"
        />
        <span className="text-right text-sm font-bold tabular-nums text-ink">
          {value}
        </span>
      </div>
      <div className="mt-1 flex justify-end">
        <span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-semibold text-ink/60">
          Seller-reported
        </span>
      </div>
    </div>
  );
}

function AreaMapPlaceholder({
  town,
  county,
}: {
  town: string;
  county: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Approximate business area in ${town}, ${county}. Exact business location is not shown.`}
      className="relative isolate min-h-52 overflow-hidden rounded-[14px] border border-border bg-[#e8e5d9]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(28deg, transparent 47%, #c6c8b8 48%, #c6c8b8 49%, transparent 50%), linear-gradient(112deg, transparent 44%, #c6c8b8 45%, #c6c8b8 46%, transparent 47%), linear-gradient(0deg, transparent 48%, #d1d1c4 49%, #d1d1c4 50%, transparent 51%)",
          backgroundSize: "130px 100px, 160px 130px, 100px 90px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-[18%] top-[15%] h-36 w-48 rotate-12 rounded-[45%_55%_60%_40%] border-2 border-dashed border-msitu/40 bg-leaf/10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-4 h-20 w-28 -rotate-12 rounded-[40%_60%_45%_55%] border border-msitu/20 bg-white/20"
      />
      <div className="absolute inset-x-3 bottom-3 rounded-control border border-white/70 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 text-msitu">
          <MapPin size={17} aria-hidden="true" />
          <p className="text-sm font-bold">
            {town}, {county}
          </p>
        </div>
        <p className="mt-1 text-xs leading-5 text-ink/60">
          Approximate area only. The exact business location is not
          displayed publicly.
        </p>
      </div>
    </div>
  );
}

function buildListingJsonLd(listing: Listing) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description,
    category: listing.category,
    ...(listing.photos?.[0] ? { image: listing.photos } : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: listing.askingPriceKes,
      availability: "https://schema.org/InStock",
    },
  };

  // Prevent a description containing HTML/script text from breaking the
  // JSON-LD script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function ListingDetailPage({
  params,
}: ListingPageProps) {
  const { slug } = await params;
  const listing = await loadListing(slug);

  if (!listing) notFound();

  const hasVerification = listing.verification != null;
  const hasProfit =
    typeof listing.monthlyProfitKes === "number" &&
    listing.monthlyProfitKes > 0;

  const paybackMonths = hasProfit
    ? listing.askingPriceKes / listing.monthlyProfitKes
    : null;

  const jsonLd = buildListingJsonLd(listing);

  return (
    <main className="pb-24 sm:pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <div className="site-container pt-5 sm:pt-8">
        <Link
          href="/browse"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-msitu hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jua"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to businesses
        </Link>

        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
          <div className="min-w-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-msitu">
              {listing.photos?.[0] ? (
                <Image
                  src={listing.photos[0]}
                  alt={listing.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-msitu to-[#1c6049]">
                  <span className="text-6xl" aria-hidden="true">
                    {listing.category}
                  </span>
                </div>
              )}

              <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-bold text-white">
                Demo listing
              </span>
            </div>

            {listing.photos && listing.photos.length > 1 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {listing.photos.slice(1, 4).map((photo, index) => (
                  <div
                    key={`${photo}-${index}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-control bg-paper"
                  >
                    <Image
                      src={photo}
                      alt={`${listing.title} photo ${index + 2}`}
                      fill
                      sizes="(max-width: 640px) 33vw, 20vw"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-msitu">
                  {listing.category}
                </span>
                {listing.negotiable && (
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-ink/65">
                    Price negotiable
                  </span>
                )}
                {listing.sellerFinancing && (
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-ink/65">
                    Seller financing
                  </span>
                )}
              </div>

              <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                {listing.title}
              </h1>

              <p className="mt-3 flex items-center gap-2 text-sm text-ink/60">
                <MapPin size={16} aria-hidden="true" />
                {listing.town}, {listing.county}
              </p>

              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-ink/75">
                {listing.description}
              </p>
            </div>

            <section className="mt-9">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-2xl font-bold text-ink">
                  Business snapshot
                </h2>
                <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-semibold text-ink/60">
                  All figures seller-reported
                </span>
              </div>

              <div className="mt-4 divide-y divide-border border-y border-border">
                <FigureRow
                  label="Asking price"
                  value={formatKES(listing.askingPriceKes)}
                />

                {typeof listing.monthlyRevenueKes === "number" && (
                  <FigureRow
                    label="Monthly revenue"
                    value={formatKES(listing.monthlyRevenueKes)}
                  />
                )}

                {typeof listing.monthlyProfitKes === "number" && (
                  <FigureRow
                    label="Monthly profit"
                    value={formatKES(listing.monthlyProfitKes)}
                  />
                )}

                <FigureRow
                  label="Years operating"
                  value={`${listing.yearsOperating} ${
                    listing.yearsOperating === 1 ? "year" : "years"
                  }`}
                />

                {typeof listing.staffCount === "number" && (
                  <FigureRow
                    label="Staff"
                    value={String(listing.staffCount)}
                  />
                )}

                {typeof listing.leaseRemainingMonths === "number" && (
                  <FigureRow
                    label="Lease remaining"
                    value={`${listing.leaseRemainingMonths} months`}
                  />
                )}

                {paybackMonths !== null && (
                  <FigureRow
                    label="Indicative payback period"
                    value={`${paybackMonths.toFixed(1)} months`}
                  />
                )}
              </div>

              <p className="mt-3 text-xs leading-5 text-ink/55">
                Figures are provided by the seller and have not been
                independently audited. Any payback estimate is a simple
                calculation based on the asking price and stated monthly
                profit; it is not a forecast or guarantee.
              </p>
            </section>

            {hasVerification && (
              <section className="mt-9 rounded-[14px] border border-leaf/25 bg-leaf/5 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={22}
                    className="mt-0.5 shrink-0 text-leaf"
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-bold text-ink">
                      Verification details
                    </h2>
                    <span className="mt-1 inline-flex rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-leaf">
                      Checked by UzaDeals
                    </span>
                    <p className="mt-2 text-xs text-ink/60">
                      Checks recorded:{" "}
                      {new Date(
                        listing.verification!.checkedAt,
                      ).toLocaleDateString("en-KE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {listing.verification!.checkedItems.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-ink/75"
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0 text-leaf"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs leading-5 text-ink/55">
                      This label applies only to the checks listed here.
                      It does not mean every seller-reported figure has
                      been independently verified.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {listing.whatIsIncluded.length > 0 && (
              <section className="mt-9">
                <h2 className="font-display text-2xl font-bold text-ink">
                  What's included
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {listing.whatIsIncluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-control bg-paper p-3 text-sm text-ink/75"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-leaf"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-9">
              <h2 className="font-display text-2xl font-bold text-ink">
                Location area
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                The listing is based in {listing.town}, {listing.county}.
                We show an approximate area to protect the seller's
                location.
              </p>
              <div className="mt-4">
                <AreaMapPlaceholder
                  town={listing.town}
                  county={listing.county}
                />
              </div>
            </section>

            {listing.reasonForSale && (
              <section className="mt-9">
                <h2 className="font-display text-2xl font-bold text-ink">
                  Reason for selling
                </h2>
                <p className="mt-3 text-sm leading-7 text-ink/75">
                  {listing.reasonForSale}
                </p>
              </section>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-[14px] border border-border bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Asking price
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums text-ink">
                {formatKES(listing.askingPriceKes)}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-paper px-2.5 py-1 text-[10px] font-semibold text-ink/60">
                Seller-reported
              </span>

              {hasProfit && (
                <div className="mt-5 rounded-control bg-paper p-3">
                  <p className="text-xs text-ink/55">
                    Stated monthly profit
                  </p>
                  <p className="mt-1 text-lg font-bold tabular-nums text-ink">
                    {formatKES(listing.monthlyProfitKes!)}
                  </p>
                  <span className="mt-1 inline-flex rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-ink/60">
                    Seller-reported
                  </span>
                </div>
              )}

              <div className="mt-5">
                <InquiryTrigger
                  listingId={listing.id}
                  listingTitle={listing.title}
                  fullWidth
                />
              </div>

              <p className="mt-3 text-center text-xs leading-5 text-ink/50">
                Ask questions and arrange your own checks before making
                any decision.
              </p>

              <div className="mt-5 border-t border-border pt-4">
                <p className="flex items-center gap-2 text-xs text-ink/55">
                  <Clock3 size={14} aria-hidden="true" />
                  Listed{" "}
                  {new Date(listing.createdAt).toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-2 text-xs leading-5 text-ink/50">
                  Demo listing. Details and seller responses are simulated.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs text-ink/50">
          <ArrowRight size={14} aria-hidden="true" />
          <span>
            Payment, ownership transfer and legal checks are not handled
            by this demo marketplace.
          </span>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <div className="site-container flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/50">
              Asking price
            </p>
            <p className="truncate text-base font-bold tabular-nums text-ink">
              {formatKES(listing.askingPriceKes)}
            </p>
          </div>
          <div className="w-[52%]">
            <InquiryTrigger
              listingId={listing.id}
              listingTitle={listing.title}
              fullWidth
            />
          </div>
        </div>
      </div>
    </main>
  );
}
