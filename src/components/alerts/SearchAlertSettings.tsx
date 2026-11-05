
"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildSearchAlertId,
  getSearchAlerts,
  saveSearchAlert,
  type AlertChannel,
  type AlertFrequency,
  type SearchAlert,
} from "@/lib/browser-storage";
import type { ListingFilters } from "@/types";

interface SearchAlertSettingsProps {
  filters: ListingFilters;
  label?: string;
}

export default function SearchAlertSettings({
  filters,
  label = "My current search",
}: SearchAlertSettingsProps) {
  const alertId = useMemo(
    () => buildSearchAlertId(filters),
    [filters],
  );

  const [frequency, setFrequency] = useState<AlertFrequency>("weekly");
  const [channel, setChannel] = useState<AlertChannel>("email");
  const [enabled, setEnabled] = useState(false);
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = getSearchAlerts().find((item) => item.id === alertId);

    if (existing) {
      setFrequency(existing.frequency);
      setChannel(existing.channel);
      setEnabled(existing.enabled);
    } else {
      setFrequency("weekly");
      setChannel("email");
      setEnabled(false);
    }

    setSaved(false);
    setReady(true);
  }, [alertId]);

  function handleSave() {
    const alert: SearchAlert = {
      id: alertId,
      label,
      filters,
      frequency,
      channel,
      enabled,
      updatedAt: new Date().toISOString(),
    };

    setSaved(saveSearchAlert(alert));
  }

  return (
    <section className="rounded-card border border-border bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-jua/15 text-ink">
          {enabled ? <BellRing size={19} /> : <Bell size={19} />}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-ink">Alert me about this search</h2>
          <p className="mt-1 text-sm text-ink/60">
            Save this search and its alert preferences on this device.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <label className="flex min-h-11 items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) => setEnabled(event.target.checked)}
            className="h-4 w-4 accent-[#0F3D2E]"
            disabled={!ready}
          />
          Enable this search alert
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-medium text-ink">
            Frequency
            <select
              value={frequency}
              onChange={(event) =>
                setFrequency(event.target.value as AlertFrequency)
              }
              className="mt-2 min-h-11 w-full rounded-control border border-border bg-white px-3 text-sm"
              disabled={!ready}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-ink">
            Channel
            <select
              value={channel}
              onChange={(event) =>
                setChannel(event.target.value as AlertChannel)
              }
              className="mt-2 min-h-11 w-full rounded-control border border-border bg-white px-3 text-sm"
              disabled={!ready}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </label>
        </div>

        <Button type="button" onClick={handleSave} fullWidth disabled={!ready}>
          Save alert preferences
        </Button>

        {saved && (
          <p role="status" className="text-sm text-leaf">
            Preferences saved on this device. No alert will actually be sent in this demo.
          </p>
        )}

        {!saved && ready && (
          <p className="text-xs leading-5 text-ink/50">
            Preferences are stored separately for this search. Email and SMS delivery are not connected.
          </p>
        )}
      </div>
    </section>
  );
}
