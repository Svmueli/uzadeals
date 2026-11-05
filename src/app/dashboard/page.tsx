
import type { Metadata } from "next";
import SellerDashboardClient from "@/components/dashboard/SellerDashboardClient";

export const metadata: Metadata = {
  title: "Seller dashboard | UzaDeals",
  description: "Manage your business listings and buyer inquiries.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <SellerDashboardClient />;
}
