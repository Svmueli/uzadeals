
"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, Trash2 } from "lucide-react";
import {
  deleteSearchAlert,
  getSearchAlerts,
  saveSearchAlert,
  type SearchAlert,
} from "@/lib/browser-storage";

export default function AlertManager() {
  const [alerts, setAlerts] = useState<SearchAlert[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAlerts(getSearchAlerts());
    setReady(true);
  }, []);

  function updateAlert(alert: SearchAlert, enabled: boolean) {
    const updated = { ...alert, enabled, updatedAt: new Date().toISOString() };
    if (saveSearchAlert(updated)) {
      setAlerts((current) =>
        current.map((item) => item.id === alert.id ? updated : item),
      );
    }
  }

  function removeAlert(alertId: string) {
    if (deleteSearchAlert(alertId)) {
      setAlerts((current) => current.filter((item) => item.id !== alertId));
    }
  }

  if (!ready) {
    return <p role="status" className="text-sm text-ink/60">Loading alerts…</p>;
  }

  if (alerts.length === 0) {
    return (
      <div className="rounded-card border border-border bg-white p-5">
        <BellOff size={22} className="text-ink/50" />
        <h2 className="mt-3 font-semibold">No saved search alerts</h2>
        <p className="mt-1 text-sm text-ink/60">
          Save alert preferences from a search to manage them here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <article key={alert.id} className="rounded-card border border-border bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-semibold">{alert.label}</h3>
              <p className="mt-1 text-xs text-ink/55">
                {alert.frequency} · {alert.channel.toUpperCase()}
              </p>
              <p className="mt-2 text-xs text-ink/55">
                Search: {alert.filters.query || "All businesses"}
                {alert.filters.county ? ` · ${alert.filters.county}` : ""}
                {alert.filters.category ? ` · ${alert.filters.category}` : ""}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateAlert(alert, !alert.enabled)}
                aria-pressed={alert.enabled}
                className="inline-flex min-h-11 items-center gap-2 rounded-control border border-border px-3 text-sm font-medium hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua"
              >
                {alert.enabled ? <Bell size={15} /> : <BellOff size={15} />}
                {alert.enabled ? "On" : "Off"}
              </button>

              <button
                type="button"
                onClick={() => removeAlert(alert.id)}
                aria-label={`Delete ${alert.label} alert`}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-control text-clay hover:bg-clay/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
