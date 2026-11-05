
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bookmark, Bell, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  clearDemoSession,
  getDemoSession,
  type DemoSession,
} from "@/lib/browser-storage";

export default function AccountPage() {
  const router = useRouter();
  const [session, setSession] = useState<DemoSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(getDemoSession());
    setReady(true);
  }, []);

  function signOut() {
    clearDemoSession();
    setSession(null);
    router.replace("/sign-in");
  }

  if (!ready) {
    return (
      <main className="site-container py-12">
        <p role="status" className="text-sm text-ink/60">Loading account…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="site-container py-12">
        <section className="surface-card mx-auto max-w-xl p-7 text-center">
          <h1 className="font-display text-3xl font-semibold">Your account</h1>
          <p className="mt-3 text-sm text-ink/65">
            Sign in to view your demo account area and manage saved searches.
          </p>
          <Link
            href="/sign-in"
            className="mt-6 inline-flex min-h-11 items-center rounded-control bg-msitu px-5 py-3 text-sm font-semibold text-white"
          >
            Sign in
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="site-container py-10 sm:py-14">
      <p className="eyebrow">Account</p>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">
        Your UzaDeals space.
      </h1>

      <div className="mt-7 rounded-card border border-jua/40 bg-jua/10 p-4 text-sm leading-6 text-ink">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldCheck size={18} />
          Demo account session
        </div>
        <p className="mt-1 text-ink/70">
          This session is simulated. Real authentication and identity verification are not connected.
        </p>
        <p className="mt-2 text-xs text-ink/55">
          Signed in at {new Date(session.signedInAt).toLocaleString("en-KE")}
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Link href="/saved" className="surface-card flex min-h-36 flex-col justify-between p-5 hover:border-msitu">
          <Bookmark size={22} className="text-msitu" />
          <div>
            <h2 className="font-semibold">Saved businesses</h2>
            <p className="mt-1 text-sm text-ink/60">Review your shortlist.</p>
          </div>
        </Link>

        <Link href="/account/alerts" className="surface-card flex min-h-36 flex-col justify-between p-5 hover:border-msitu">
          <Bell size={22} className="text-msitu" />
          <div>
            <h2 className="font-semibold">Search alerts</h2>
            <p className="mt-1 text-sm text-ink/60">Manage saved search preferences.</p>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={signOut}>
          <LogOut size={16} />
          Sign out
        </Button>
      </div>
    </main>
  );
}
