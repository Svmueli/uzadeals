
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use | UzaDeals",
  description: "Terms of use placeholder for UzaDeals.",
};

export default function TermsPage() {
  return (
    <main className="site-container py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow">Legal information</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">
          Terms of use
        </h1>

        <div className="mt-6 rounded-control border border-jua/40 bg-jua/10 p-4 text-sm leading-6">
          <strong>Placeholder — not final terms.</strong>
          <p className="mt-1">
            This page is sample product copy for development. It is not a
            binding final agreement. The terms must be reviewed by a qualified
            Kenyan legal professional before public launch.
          </p>
        </div>

        <div className="mt-8 space-y-7 text-sm leading-7 text-ink/65">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              1. About the marketplace
            </h2>
            <p className="mt-2">
              UzaDeals is intended to provide a platform for discovering and
              presenting business-sale and business-opportunity listings. The
              final terms must clearly identify the operating entity and
              describe the actual services offered.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              2. User responsibilities
            </h2>
            <p className="mt-2">
              Users should provide accurate information, respect other users,
              avoid misleading listings and use the platform lawfully.
              Sellers should have authority to advertise the opportunity they
              submit.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              3. Listings and seller information
            </h2>
            <p className="mt-2">
              Listing descriptions, financial figures, photographs and
              supporting information may be supplied by sellers. Buyers
              should independently verify material information before
              proceeding with a transaction.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              4. No guarantee of a transaction
            </h2>
            <p className="mt-2">
              A listing or inquiry does not guarantee that a sale, investment,
              partnership or other arrangement will take place. Users are
              responsible for their own due diligence and agreements.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              5. Payments and fees
            </h2>
            <p className="mt-2">
              Any real payment services, fees, refunds and payment-provider
              arrangements must be described accurately in final terms.
              Payment interfaces in this development version are simulations
              and do not transfer money.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              6. Moderation and account action
            </h2>
            <p className="mt-2">
              The final terms must explain how reports are handled, when
              listings may be restricted or removed, how users can appeal
              decisions and how accounts may be suspended.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink">
              7. Disputes and applicable law
            </h2>
            <p className="mt-2">
              The final terms must specify applicable law, dispute-resolution
              procedures, liability provisions and any mandatory consumer
              protections.
            </p>
          </section>
        </div>

        <p className="mt-8 border-t border-border pt-5 text-xs leading-5 text-ink/50">
          Development placeholder. These sections are a drafting scaffold,
          not legal advice or an enforceable final set of terms.
        </p>
      </article>
    </main>
  );
}
