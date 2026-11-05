
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ModerationClient from "@/components/admin/ModerationClient";
import { searchListings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Moderation console | UzaDeals",
  description: "Internal demo listing moderation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ModerationPage() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADMIN !== "true") {
    notFound();
  }

  const result = await searchListings({}, null);

  return (
    <ModerationClient listings={result.items} />
  );
}
