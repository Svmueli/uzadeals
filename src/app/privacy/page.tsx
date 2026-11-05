
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy | UzaDeals",
  description: "Privacy policy placeholder for UzaDeals.",
};

export default function PrivacyPage() {
  return (
    <main className="site-container py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal information</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">
          Privacy policy
        </h1>

        <div className="mt-6 rounded-control border border-jua/40 bg-jua/10 p-4 text-sm leading-6">
          <strong>Placeholder — not a final privacy policy.</strong>
          <p className="mt-1">
            This page is sample product copy for development. It must be
            replaced with a complete privacy notice and reviewed for
            compliance with applicable Kenyan data protection requirements
            before UzaDeals collects personal information from the public.
          </p>
        </div>

        <div className="mt-8 space-y-7 text-sm leading-7 text-ink/65">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              1. Information we may collect
            </h2>
            <p className="mt-2">
              A production marketplace may collect account details, contact
              information, listing information, communications, technical
              information and records of user activity. The final policy must
              identify the exact data collected and the purposes for each
              category.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              2. How information may be used
            </h2>
            <p className="mt-2">
              Information may be needed to operate accounts, display listings,
              facilitate inquiries, prevent abuse, provide support and meet
              legal obligations. The final policy must explain the lawful
              basis for each processing purpose.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              3. Sharing and service providers
            </h2>
            <p className="mt-2">
              The final policy must identify when information is shared with
              other users, payment providers, hosting providers, analytics
              providers or public authorities, and explain the safeguards
              applied.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              4. Retention and security
            </h2>
            <p className="mt-2">
              The final policy must state how long information is retained,
              how deletion requests are handled and what technical and
              organisational safeguards are used.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              5. Your rights and contact details
            </h2>
            <p className="mt-2">
              The final policy must explain applicable data subject rights,
              how users can exercise them and how to contact the organisation
              responsible for processing their information.
            </p>
          </section>
        </div>

        <p className="mt-8 border-t border-border pt-5 text-xs leading-5 text-ink/50">
          Development placeholder. No statement on this page should be
          interpreted as a complete description of UzaDeals&apos; actual
          data-handling practices.
        </p>
      </article>
    </main>
  );
}
