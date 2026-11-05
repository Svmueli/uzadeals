
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  XCircle,
} from "lucide-react";

import { createPayment } from "@/lib/api";
import { normalizeKenyanPhone } from "@/lib/phone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormEvent } from "react";

type PaymentOutcome =
  | "success"
  | "cancelled"
  | "insufficient_balance"
  | "timeout";

type PaymentStatus = "pending" | PaymentOutcome;

interface PaymentRecord {
  id: string;
  listingId: string;
  phone: string;
  amountKes: number;
  createdAt: string;
}

const DEV_MODE = process.env.NODE_ENV === "development";

const OUTCOMES: {
  value: PaymentOutcome;
  label: string;
  description: string;
}[] = [
  {
    value: "success",
    label: "Success",
    description: "Simulate a completed payment.",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    description: "Simulate a cancelled payment.",
  },
  {
    value: "insufficient_balance",
    label: "Insufficient balance",
    description: "Simulate a payment that cannot be completed.",
  },
  {
    value: "timeout",
    label: "Timeout",
    description: "Simulate no confirmation before the timeout.",
  },
];

const STATUS_COPY: Record<
  PaymentStatus,
  { title: string; description: string }
> = {
  pending: {
    title: "Waiting for confirmation",
    description: "Your demo payment is being processed.",
  },
  success: {
    title: "Payment successful",
    description: "The simulated payment was completed successfully.",
  },
  cancelled: {
    title: "Payment cancelled",
    description: "The simulated payment was cancelled.",
  },
  insufficient_balance: {
    title: "Insufficient balance",
    description: "The simulated account did not have enough balance.",
  },
  timeout: {
    title: "Request timed out",
    description: "No confirmation was received in the simulated time window.",
  },
};

function StatusIcon({ status }: { status: PaymentStatus }) {
  if (status === "success") {
    return <CheckCircle2 size={28} className="text-leaf" />;
  }

  if (status === "pending") {
    return <Clock3 size={28} className="text-jua" />;
  }

  if (status === "cancelled") {
    return <XCircle size={28} className="text-ink/50" />;
  }

  return <AlertCircle size={28} className="text-clay" />;
}

export default function PaymentSimulator({
  listingId,
  amountKes,
}: {
  listingId: string;
  amountKes: number;
}) {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);
  const [payment, setPayment] = useState<PaymentRecord | null>(null);
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [devOutcome, setDevOutcome] = useState<PaymentOutcome>("success");

  async function startPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPhoneError("");
    setFormError("");

    const normalizedPhone = normalizeKenyanPhone(phone);

    if (!normalizedPhone) {
      setPhoneError("Enter a valid Kenyan mobile number, such as 0712345678.");
      return;
    }

    if (!Number.isFinite(amountKes) || amountKes <= 0) {
      setFormError("This payment amount is not valid.");
      return;
    }

    if (!listingId.trim()) {
      setFormError("A listing reference is missing.");
      return;
    }

    setCreating(true);

    try {
      const created = await createPayment({
        listingId,
        phone: normalizedPhone,
        amountKes,
      });

      setPayment({
        id: created.id,
        listingId: created.listingId,
        phone: created.phone,
        amountKes: created.amountKes,
        createdAt: created.createdAt,
      });

      setStatus("pending");

      // This is a local demo outcome, not an M-Pesa transaction.
      window.setTimeout(() => {
        setStatus(DEV_MODE ? devOutcome : "success");
      }, 1200);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "We could not create the demo payment. Please try again.",
      );
    } finally {
      setCreating(false);
    }
  }

  function resetPayment() {
    setPayment(null);
    setStatus(null);
    setFormError("");
  }

  const formattedAmount = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amountKes);

  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="surface-card overflow-hidden p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-msitu/10 text-msitu">
            <LockKeyhole size={21} />
          </div>
          <div>
            <p className="eyebrow">Secure checkout demo</p>
            <h1 className="font-display text-2xl font-semibold">
              Payment simulation
            </h1>
          </div>
        </div>

        <div className="mt-6 rounded-control bg-paper p-4">
          <p className="text-xs font-medium text-ink/55">
            Amount to simulate
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-msitu">
            {formattedAmount}
          </p>
          <p className="mt-1 break-all text-xs text-ink/45">
            Listing reference: {listingId}
          </p>
        </div>

        {!payment && (
          <form onSubmit={startPayment} className="mt-6 space-y-5">
            <Input
              label="M-Pesa phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="0712345678"
              inputMode="tel"
              autoComplete="tel"
              error={phoneError}
              hint="Use a Kenyan mobile number. The demo normalises it to +254 format."
            />

            {DEV_MODE && (
              <div className="rounded-control border border-jua/40 bg-jua/10 p-4">
                <label
                  htmlFor="dev-payment-outcome"
                  className="block text-sm font-semibold text-ink"
                >
                  Development-only payment outcome
                </label>
                <p className="mt-1 text-xs leading-5 text-ink/60">
                  Choose the result to test. This selector is removed from production builds.
                </p>
                <select
                  id="dev-payment-outcome"
                  value={devOutcome}
                  onChange={(event) =>
                    setDevOutcome(event.target.value as PaymentOutcome)
                  }
                  className="mt-3 min-h-11 w-full rounded-control border border-border bg-white px-3 text-sm"
                >
                  {OUTCOMES.map((outcome) => (
                    <option key={outcome.value} value={outcome.value}>
                      {outcome.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-ink/55">
                  {OUTCOMES.find((item) => item.value === devOutcome)?.description}
                </p>
              </div>
            )}

            <div className="rounded-control border border-border p-4">
              <p className="text-sm font-semibold">Your payment privacy</p>
              <p className="mt-1 text-xs leading-5 text-ink/60">
                This is a user-interface simulation only. It does not connect to M-Pesa or move money. UzaDeals will never ask you to enter your M-Pesa PIN in this app.
              </p>
            </div>

            {formError && (
              <p role="alert" className="text-sm text-clay">
                {formError}
              </p>
            )}

            <Button block fullWidth loading={creating} type="submit">
              Simulate payment
            </Button>
          </form>
        )}

        {payment && status && (
          <div className="mt-7" aria-live="polite">
            <div className="rounded-card border border-border p-5 text-center">
              <div className="flex justify-center">
                <StatusIcon status={status} />
              </div>

              <h2 className="mt-3 font-display text-2xl font-semibold">
                {STATUS_COPY[status].title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                {STATUS_COPY[status].description}
              </p>

              <div className="mt-5 rounded-control bg-paper p-3 text-left">
                <div className="flex justify-between gap-3 py-2 text-xs">
                  <span className="text-ink/55">Payment reference</span>
                  <span className="break-all text-right font-semibold">
                    {payment.id}
                  </span>
                </div>
                <div className="flex justify-between gap-3 border-t border-border py-2 text-xs">
                  <span className="text-ink/55">Amount</span>
                  <span className="font-semibold tabular-nums">
                    {formattedAmount}
                  </span>
                </div>
                <div className="flex justify-between gap-3 border-t border-border py-2 text-xs">
                  <span className="text-ink/55">Phone</span>
                  <span className="font-semibold">{payment.phone}</span>
                </div>
                <div className="flex justify-between gap-3 border-t border-border py-2 text-xs">
                  <span className="text-ink/55">Status</span>
                  <span className="font-semibold capitalize">
                    {status.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-ink/50">
                Demo reference only. No money was transferred and no receipt was generated.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {(status === "cancelled" ||
                status === "insufficient_balance" ||
                status === "timeout") && (
                <Button
                  fullWidth
                  onClick={resetPayment}
                  variant="primary"
                >
                  Try simulation again
                </Button>
              )}

              <Link
                href="/dashboard"
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-control border border-border px-4 py-3 text-sm font-semibold text-ink"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs leading-5 text-ink/45">
        UzaDeals payment simulation · No real payment integration
      </p>
    </section>
  );
}
