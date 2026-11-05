
import type { Metadata } from "next";
import SavedListingsClient from "@/components/saved/SavedListingsClient";

export const metadata: Metadata = {
  title: "Saved businesses | UzaDeals",
  description: "Review the businesses you have saved on UzaDeals.",
  robots: { index: false, follow: false },
};

export default function SavedPage() {
  return <SavedListingsClient />;
}
