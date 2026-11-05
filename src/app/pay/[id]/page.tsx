
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PaymentSimulator from "@/components/payment/PaymentSimulator";

export const metadata: Metadata = {
  title: "Payment simulation | UzaDeals",
  description: "Simulate a UzaDeals payment.",
  robots: {
    index: false,
    follow: false,
  },
};

interface PaymentPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ amount?: string }>;
}

export default async function PaymentPage({
  params,
  searchParams,
}: PaymentPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);

  const amountKes = Number(query.amount);

  if (
    !id ||
    !Number.isFinite(amountKes) ||
    amountKes <= 0
  ) {
    notFound();
  }

  return (
    <main className="site-container py-10 sm:py-16">
      <PaymentSimulator
        listingId={id}
        amountKes={amountKes}
      />
    </main>
  );
}
