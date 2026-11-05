
import type { Metadata } from "next";
import Link from "next/link";
import AlertManager from "@/components/alerts/AlertManager";

export const metadata: Metadata = {
  title: "Search alerts | UzaDeals",
  description: "Manage your saved UzaDeals search alert preferences.",
  robots: { index: false, follow: false },
};

export default function SearchAlertsPage() {
  return (
    <main className="site-container py-10 sm:py-14">
      <Link href="/account" className="text-sm font-medium text-msitu underline underline-offset-4">
        Back to account
      </Link>
      <p className="eyebrow mt-7">Preferences</p>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">
        Search alerts
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-ink/65">
        Each saved search keeps its own frequency and delivery-channel preference.
        These settings are stored locally; actual notifications are not connected.
      </p>

      <div className="mt-7 max-w-2xl">
        <AlertManager />
      </div>
    </main>
  );
}
