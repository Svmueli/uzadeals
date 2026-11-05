
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizeKenyanPhone } from "@/lib/phone";
import { sendOtp, verifyOtp } from "@/lib/api";
import { saveDemoSession } from "@/lib/browser-storage";

type Stage = "phone" | "code" | "success";

export default function SignInClient() {
  const [stage, setStage] = useState<Stage>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [resendSeconds, setResendSeconds] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = window.setInterval(() => {
      setResendSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  async function requestCode() {
    setError("");
    setNotice("");

    const normalised = normalizeKenyanPhone(phone);
    if (!normalised) {
      setError("Enter a valid Kenyan mobile number.");
      return;
    }

    setBusy(true);

    try {
      const result = await sendOtp(normalised);

      if (!result.success) {
        setError(result.message || "Could not request a code.");
        return;
      }

      setPhone(normalised);
      setCode("");
      setAttempts(0);
      setLocked(false);
      setResendSeconds(30);
      setStage("code");
      setNotice("Demo verification code requested. No SMS has been sent.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked || busy) return;

    if (!/^\d{6}$/.test(code)) {
      setError("Enter the six-digit code.");
      return;
    }

    setBusy(true);
    setError("");

    try {
      const result = await verifyOtp(phone, code);

      if (result.success && result.sessionId) {
        const stored = saveDemoSession({
          sessionId: result.sessionId,
          signedInAt: new Date().toISOString(),
        });

        if (!stored) {
          setError("Your browser could not save this demo session. Check storage settings and try again.");
          return;
        }

        setStage("success");
        return;
      }

      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      setCode("");

      if (nextAttempts >= 5) {
        setLocked(true);
        setError("Too many incorrect attempts. Sign-in is locked for this attempt. Start again to request a new code.");
      } else {
        setError(`That code was not accepted. ${5 - nextAttempts} attempts remaining.`);
      }
    } catch {
      setError("Verification could not be completed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  function startAgain() {
    setStage("phone");
    setCode("");
    setAttempts(0);
    setLocked(false);
    setError("");
    setNotice("");
    setResendSeconds(0);
  }

  return (
    <main className="site-container flex min-h-[75vh] items-center justify-center py-12">
      <section className="surface-card w-full max-w-md p-6 sm:p-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-ink/65 hover:text-msitu"
        >
          <ArrowLeft size={16} />
          Back to UzaDeals
        </Link>

        {stage === "phone" && (
          <>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-msitu/10 text-msitu">
              <ShieldCheck size={23} />
            </div>
            <p className="eyebrow">Your UzaDeals account</p>
            <h1 className="font-display text-3xl font-semibold">
              Sign in to continue.
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              Enter your Kenyan mobile number to request a demo verification code.
            </p>

            <form
              className="mt-7 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                void requestCode();
              }}
            >
              <Input
                label="Mobile number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="07XX XXX XXX"
                inputMode="tel"
                autoComplete="tel"
                required
              />

              {error && <p role="alert" className="text-sm text-clay">{error}</p>}
              {notice && <p role="status" className="text-sm text-leaf">{notice}</p>}

              <Button type="submit" fullWidth loading={busy}>
                Request demo code
              </Button>
            </form>
          </>
        )}

        {stage === "code" && (
          <>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-msitu/10 text-msitu">
              <LockKeyhole size={23} />
            </div>
            <p className="eyebrow">Phone verification</p>
            <h1 className="font-display text-3xl font-semibold">
              Enter your code.
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              A demo code was requested for {phone}. No SMS is actually sent.
            </p>

            <form className="mt-7 space-y-5" onSubmit={submitCode}>
              <Input
                label="Six-digit code"
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                disabled={locked}
              />

              {error && <p role="alert" className="text-sm text-clay">{error}</p>}
              {notice && <p role="status" className="text-sm text-leaf">{notice}</p>}

              <Button type="submit" fullWidth loading={busy} disabled={locked || code.length !== 6}>
                Verify code
              </Button>
            </form>

            <div className="mt-5 flex items-center justify-between gap-3 text-sm">
              <button
                type="button"
                className="font-medium text-msitu underline underline-offset-4 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={resendSeconds > 0 || busy || locked}
                onClick={() => void requestCode()}
              >
                {resendSeconds > 0
                  ? `Resend in ${resendSeconds}s`
                  : "Resend code"}
              </button>
              <button
                type="button"
                className="text-ink/60 underline underline-offset-4"
                onClick={startAgain}
              >
                Change number
              </button>
            </div>

            {locked && (
              <div role="alert" className="mt-5 rounded-control border border-clay/30 bg-clay/5 p-4 text-sm text-clay">
                <strong>Sign-in locked.</strong> Five incorrect attempts were made. Start again to request a new demo code.
              </div>
            )}

            <p className="mt-5 text-xs leading-5 text-ink/50">
              Demo behaviour: any six-digit code except 000000 succeeds.
            </p>
          </>
        )}

        {stage === "success" && (
          <div className="py-8 text-center">
            <CheckCircle2 className="mx-auto mb-5 text-leaf" size={48} />
            <p className="eyebrow">Demo sign-in complete</p>
            <h1 className="font-display text-3xl font-semibold">
              You&apos;re signed in.
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              This is a simulated account session. No real identity verification has taken place.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Button fullWidth onClick={() => window.location.assign("/account")}>
                Go to account
              </Button>
              <Link href="/saved" className="text-sm font-medium text-msitu underline underline-offset-4">
                View saved listings
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
