
import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  MessageCircle,
  ClipboardCheck,
  Handshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How UzaDeals works",
  description: "Learn how buying and selling businesses works on UzaDeals.",
};

const steps = [
  {
    number: "01",
    title: "Explore businesses",
    description:
      "Browse opportunities by category, location, asking price and deal type. Review the information provided by each seller.",
    icon: Search,
  },
  {
    number: "02",
    title: "Ask questions",
    description:
      "Use the inquiry option to express interest and request more information. Arrange conversations and viewings directly with the seller.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Do your checks",
    description:
      "Inspect the premises, review records, understand the lease and independently verify any claims before making a decision.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Agree on the deal",
    description:
      "Discuss the terms directly, document any agreement properly and use appropriate professional advice where needed.",
    icon: Handshake,
  },
];

export default function HowItWorksPage() {
  return (
    <main className="site-container py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow">A clearer way to explore opportunities</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
          From discovery to due diligence.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ink/65">
          UzaDeals helps buyers discover businesses and gives sellers a place
          to present their opportunities. A listing is a starting point for
          conversation, not a guarantee of a successful deal.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="rounded-card border border-border bg-white p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold text-jua">
                    {step.number}
                  </span>
                  <Icon size={22} className="text-msitu" />
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink/60">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>

        <section className="mt-10 rounded-card bg-paper p-5 sm:p-7">
          <h2 className="font-display text-2xl font-semibold">
            Take your time before committing.
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/65">
            <li>Visit the business and confirm that it operates as described.</li>
            <li>Review sales, expenses, debts and other financial records.</li>
            <li>Check licences, permits, ownership and lease arrangements.</li>
            <li>Do not rely on a badge or a listing as a substitute for your own checks.</li>
            <li>Put agreed terms in writing before completing a transaction.</li>
          </ul>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/browse"
            className="inline-flex min-h-11 items-center rounded-control bg-msitu px-5 py-3 text-sm font-semibold text-white"
          >
            Browse businesses
          </Link>
          <Link
            href="/verification"
            className="inline-flex min-h-11 items-center rounded-control border border-border px-5 py-3 text-sm font-semibold"
          >
            Understand verification
          </Link>
        </div>
      </div>
    </main>
  );
}
