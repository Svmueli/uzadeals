
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, AlertTriangle, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Verification | UzaDeals",
  description: "Understand what UzaDeals verification does and does not mean.",
};

const checkedItems = [
  {
    title: "Seller identity check",
    description:
      "The identity document presented by the seller was reviewed for consistency with the seller information collected.",
  },
  {
    title: "Business documentation check",
    description:
      "A business document supplied for the listing was reviewed for basic consistency and apparent completeness.",
  },
  {
    title: "Location check",
    description:
      "The stated business location was checked against the location information provided during the review.",
  },
];

export default function VerificationPage() {
  return (
    <main className="site-container py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-msitu/10 text-msitu">
          <ShieldCheck size={25} />
        </div>

        <p className="eyebrow mt-6">Trust and transparency</p>
        <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          What does “Verified” mean?
        </h1>
        <p className="mt-5 text-base leading-7 text-ink/65">
          On UzaDeals, “Verified” is intended to mean that UzaDeals has
          completed one or more specific checks recorded against that listing.
          The badge must always be read together with the list of checks shown
          on the listing.
        </p>

        <section className="mt-9 rounded-card border border-border bg-white p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <FileCheck size={21} className="text-msitu" />
            <h2 className="font-display text-xl font-semibold">
              Examples of checks
            </h2>
          </div>

          <div className="mt-5 space-y-5">
            {checkedItems.map((item, index) => (
              <div key={item.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-msitu/10 text-xs font-bold text-msitu">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink/60">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 rounded-control bg-paper p-3 text-xs leading-5 text-ink/55">
            These are the intended check categories for this product design.
            A check must only be displayed when it has actually been completed
            and recorded. This demo does not perform or certify these checks.
          </p>
        </section>

        <section className="mt-6 rounded-card border border-clay/30 bg-clay/5 p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <AlertTriangle size={21} className="text-clay" />
            <h2 className="font-display text-xl font-semibold">
              What it does not mean
            </h2>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/70">
            <li>It is not a guarantee that the business is profitable.</li>
            <li>It is not an audit or independent confirmation of financial figures.</li>
            <li>It is not a guarantee of ownership, title, licences or absence of debts.</li>
            <li>It is not a guarantee that the seller or buyer will complete a transaction.</li>
            <li>It is not a recommendation or endorsement by UzaDeals.</li>
          </ul>
        </section>

        <p className="mt-7 text-sm leading-6 text-ink/60">
          Buyers should independently inspect the business, verify documents,
          review financial records and seek professional advice where
          appropriate. Sellers remain responsible for the accuracy of the
          information they provide.
        </p>

        <p className="mt-5 rounded-control border border-jua/40 bg-jua/10 p-4 text-sm leading-6 text-ink">
          <strong>Legal review required:</strong> This is proposed product
          wording, not approved legal language. The definition of “Verified”,
          the scope of checks and the related disclaimers must be reviewed by
          a qualified Kenyan legal professional before public launch.
        </p>

        <Link
          href="/browse"
          className="mt-7 inline-flex min-h-11 items-center rounded-control bg-msitu px-5 py-3 text-sm font-semibold text-white"
        >
          Browse businesses
        </Link>
      </div>
    </main>
  );
}
