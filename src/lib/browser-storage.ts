
import type { ListingFilters } from "@/types";

const SAVED_KEY = "uzadeals:saved-listings";
const SESSION_KEY = "uzadeals:demo-session";
const ALERTS_KEY = "uzadeals:search-alerts";

export type AlertFrequency = "daily" | "weekly";
export type AlertChannel = "email" | "sms";

export interface SearchAlert {
  id: string;
  label: string;
  filters: ListingFilters;
  frequency: AlertFrequency;
  channel: AlertChannel;
  enabled: boolean;
  updatedAt: string;
}

export interface DemoSession {
  sessionId: string;
  signedInAt: string;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function getSavedListingIds(): string[] {
  const value = readJson<unknown>(SAVED_KEY, []);
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export function isListingSaved(listingId: string): boolean {
  return getSavedListingIds().includes(listingId);
}

export function setListingSaved(
  listingId: string,
  shouldSave: boolean,
): boolean {
  const ids = getSavedListingIds();
  const next = shouldSave
    ? Array.from(new Set([...ids, listingId]))
    : ids.filter((id) => id !== listingId);

  return writeJson(SAVED_KEY, next);
}

export function getSearchAlerts(): SearchAlert[] {
  const value = readJson<unknown>(ALERTS_KEY, []);
  return Array.isArray(value) ? (value as SearchAlert[]) : [];
}

export function saveSearchAlert(alert: SearchAlert): boolean {
  const alerts = getSearchAlerts();
  const next = [
    ...alerts.filter((item) => item.id !== alert.id),
    alert,
  ];

  return writeJson(ALERTS_KEY, next);
}

export function deleteSearchAlert(alertId: string): boolean {
  return writeJson(
    ALERTS_KEY,
    getSearchAlerts().filter((item) => item.id !== alertId),
  );
}

export function getDemoSession(): DemoSession | null {
  const session = readJson<DemoSession | null>(SESSION_KEY, null);

  if (
    !session ||
    typeof session.sessionId !== "string" ||
    typeof session.signedInAt !== "string"
  ) {
    return null;
  }

  return session;
}

export function saveDemoSession(session: DemoSession): boolean {
  return writeJson(SESSION_KEY, session);
}

export function clearDemoSession(): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.removeItem(SESSION_KEY);
    return true;
  } catch {
    return false;
  }
}

export function buildSearchAlertId(filters: ListingFilters): string {
  const normalised = Object.entries(filters)
    .filter(([, value]) => value !== undefined && value !== "")
    .sort(([a], [b]) => a.localeCompare(b));

  const source = JSON.stringify(normalised);

  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) | 0;
  }

  return `search-${Math.abs(hash).toString(36)}`;
}
