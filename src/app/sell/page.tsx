
import type { Metadata } from "next";
import SellerWizard from "@/components/sell/SellerWizard";

export const metadata: Metadata = {
  title: "Sell a business | UzaDeals",
  description: "Create a business listing on UzaDeals.",
  robots: { index: false, follow: false },
};

export default function SellPage() {
  return <SellerWizard />;
}
