
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ImagePlus,
  LoaderCircle,
  MoveLeft,
  MoveRight,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createDraft,
  updateDraft,
  submitListing,
} from "@/lib/api";

import type {
  DraftInput,
  ListingDraft,
  SubmissionResult,
} from "@/types";

const STEPS = [
  "Basics",
  "Numbers",
  "Story",
  "Photos",
  "Terms",
  "Review/pay",
];

const CATEGORIES = [
  "Kiosk",
  "Salon",
  "Agrovet",
  "M-Pesa agent",
  "Car wash",
  "Bodaboda",
  "Online shop",
  "Restaurant",
  "Retail shop",
  "Other",
];

const COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet",
  "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
  "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga",
  "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia",
  "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River",
  "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu",
  "Vihiga", "Wajir", "West Pokot",
];

type SaveState = "loading" | "saving" | "saved" | "error";

function toDraftInput(draft: ListingDraft): DraftInput {
  const {
    id: _id,
    updatedAt: _updatedAt,
    ...input
  } = draft;

  return input;
}

function money(value: number | undefined): string {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(value);
}

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      const maxDimension = 1600;
      const scale = Math.min(
        1,
        maxDimension / Math.max(image.width, image.height),
      );

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));

      const context = canvas.getContext("2d");

      if (!context) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Could not process this image."));
        return;
      }

      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);

          if (!blob) {
            reject(new Error("Could not compress this image."));
            return;
          }

          const reader = new FileReader();

          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject(new Error("Could not read the compressed image."));
            }
          };

          reader.onerror = () => reject(
            new Error("Could not read the compressed image."),
          );

          reader.readAsDataURL(blob);
        },
        "image/jpeg",
        0.78,
      );
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("This image could not be opened."));
    };

    image.src = objectUrl;
  });
}

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="mb-2 block text-sm font-semibold text-ink">
      {children}
    </span>
  );
}

function WizardProgress({
  step,
}: {
  step: number;
}) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-msitu">
          Step {step + 1} of {STEPS.length}
        </span>
        <span className="text-xs text-ink/55">
          {STEPS[step]}
        </span>
      </div>

      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
        aria-label={`Step ${step + 1} of ${STEPS.length}`}
      >
        {STEPS.map((name, index) => (
          <div
            key={name}
            className={`h-2 flex-1 rounded-full ${
              index <= step ? "bg-msitu" : "bg-border"
            }`}
          />
        ))}
      </div>

      <div className="mt-3 hidden grid-cols-6 gap-2 sm:grid">
        {STEPS.map((name, index) => (
          <span
            key={name}
            className={`text-center text-[11px] ${
              index === step
                ? "font-bold text-msitu"
                : "text-ink/45"
            }`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SellerWizard() {
  const [draft, setDraft] = useState<ListingDraft | null>(null);
  const [step, setStep] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [pageError, setPageError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [photoBusy, setPhotoBusy] = useState(false);
  const [submission, setSubmission] = useState<SubmissionResult | null>(null);

  const draftRef = useRef<ListingDraft | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);
  const queuedRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    async function initialise() {
      try {
        const created = await createDraft();

        if (!mountedRef.current) return;

        draftRef.current = created;
        setDraft(created);
        setStep(
          Math.min(
            Math.max((created.currentStep || 1) - 1, 0),
            STEPS.length - 1,
          ),
        );
        setSaveState("saved");
      } catch {
        if (mountedRef.current) {
          setPageError("We could not start your draft. Please refresh and try again.");
          setSaveState("error");
        }
      }
    }

    void initialise();

    return () => {
      mountedRef.current = false;

      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, []);

  const persistDraft = useCallback(async (value: ListingDraft) => {
    if (savingRef.current) {
      queuedRef.current = true;
      return false;
    }

    savingRef.current = true;
    setSaveState("saving");

    try {
      const updated = await updateDraft(
        value.id,
        toDraftInput(value),
      );

      if (mountedRef.current) {
        draftRef.current = updated;
        setDraft(updated);
        setSaveState("saved");
      }

      return true;
    } catch {
      if (mountedRef.current) {
        setSaveState("error");
      }

      return false;
    } finally {
      savingRef.current = false;

      if (queuedRef.current && mountedRef.current) {
        queuedRef.current = false;

        const latest = draftRef.current;
        if (latest) {
          void persistDraft(latest);
        }
      }
    }
  }, []);

  const updateField = useCallback(
    <K extends keyof DraftInput>(
      field: K,
      value: DraftInput[K],
    ) => {
      setDraft((current) => {
        if (!current) return current;

        const updated = {
          ...current,
          [field]: value,
        };

        draftRef.current = updated;
        setSaveState("saving");

        if (saveTimer.current) {
          clearTimeout(saveTimer.current);
        }

        saveTimer.current = setTimeout(() => {
          void persistDraft(updated);
        }, 700);

        return updated;
      });
    },
    [persistDraft],
  );

  async function saveBeforeNavigation(nextStep: number) {
    const current = draftRef.current;
    if (!current) return;

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }

    const updated = {
      ...current,
      currentStep: nextStep + 1,
    };

    draftRef.current = updated;
    setDraft(updated);

    const success = await persistDraft(updated);

    if (success) {
      setStep(nextStep);
      setFieldError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setPageError("Your changes could not be saved. Please try again before continuing.");
    }
  }

  function validateStep(): boolean {
    if (!draft) return false;

    if (step === 0) {
      if (!draft.title?.trim()) {
        setFieldError("Add a name for the business before continuing.");
        return false;
      }

      if (!draft.category || !draft.county || !draft.town?.trim()) {
        setFieldError("Complete the category, county and town fields.");
        return false;
      }

      if (!draft.askingPriceKes || draft.askingPriceKes <= 0) {
        setFieldError("Enter a valid asking price.");
        return false;
      }
    }

    if (step === 1) {
      const revenue = Number(draft.monthlyRevenueKes || 0);
      const profit = Number(draft.monthlyProfitKes || 0);

      if (revenue < 0 || profit < 0) {
        setFieldError("Financial figures cannot be negative.");
        return false;
      }

      if (profit > revenue) {
        setFieldError(
          "Your monthly profit is higher than your revenue. Profit is what remains after expenses, so please check those two figures.",
        );
        return false;
      }

      if (!draft.monthlyRevenueKes || !draft.monthlyProfitKes) {
        setFieldError("Add your monthly revenue and monthly profit. Enter 0 if you do not have a figure yet.");
        return false;
      }
    }

    setFieldError("");
    return true;
  }

  async function goNext() {
    if (!validateStep()) return;
    await saveBeforeNavigation(Math.min(step + 1, STEPS.length - 1));
  }

  async function goBack() {
    await saveBeforeNavigation(Math.max(step - 1, 0));
  }

  async function addPhotos(files: FileList | null) {
    if (!files || !draft) return;

    const available = Math.max(0, 8 - draft.photos.length);
    const selected = Array.from(files).slice(0, available);

    if (selected.length === 0) {
      setFieldError("You can add up to 8 photos.");
      return;
    }

    setPhotoBusy(true);
    setFieldError("");

    try {
      const compressed: string[] = [];

      for (const file of selected) {
        if (!file.type.startsWith("image/")) continue;
        compressed.push(await compressImage(file));
      }

      updateField("photos", [...draft.photos, ...compressed].slice(0, 8));
    } catch (error) {
      setFieldError(
        error instanceof Error
          ? error.message
          : "One or more photos could not be processed.",
      );
    } finally {
      setPhotoBusy(false);
    }
  }

  function movePhoto(index: number, direction: -1 | 1) {
    if (!draft) return;

    const target = index + direction;
    if (target < 0 || target >= draft.photos.length) return;

    const photos = [...draft.photos];
    [photos[index], photos[target]] = [photos[target], photos[index]];
    updateField("photos", photos);
  }

  function removePhoto(index: number) {
    if (!draft) return;
    updateField(
      "photos",
      draft.photos.filter((_, photoIndex) => photoIndex !== index),
    );
  }

  async function handleSubmit() {
    if (!draft) return;

    if (!validateStep()) return;

    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }

    setSaveState("saving");
    setPageError("");

    try {
      const savedDraft = await updateDraft(
        draft.id,
        toDraftInput(draft),
      );

      const result = await submitListing(savedDraft.id);

      setDraft(savedDraft);
      setSubmission(result);
      setSaveState("saved");
    } catch {
      setSaveState("error");
      setPageError("Your listing could not be submitted. Your draft is still available to edit.");
    }
  }

  if (pageError && !draft) {
    return (
      <main className="site-container py-16">
        <div className="surface-card mx-auto max-w-xl p-6">
          <h1 className="font-display text-2xl font-semibold">
            We could not open your seller draft.
          </h1>
          <p role="alert" className="mt-3 text-sm text-clay">
            {pageError}
          </p>
          <Button className="mt-5" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </main>
    );
  }

  if (!draft) {
    return (
      <main className="site-container py-16">
        <p role="status" className="flex items-center gap-2 text-sm text-ink/60">
          <LoaderCircle size={18} className="animate-spin" />
          Preparing your seller draft…
        </p>
      </main>
    );
  }

  if (submission) {
    const statuses = [
      { key: "submitted", label: "Submitted", description: "Your listing has been received." },
      { key: "being-checked", label: "Being checked", description: "The demo moderation stage." },
      { key: "live", label: "Live", description: "Ready to be viewed by buyers." },
    ];

    const activeIndex = statuses.findIndex(
      (item) => item.key === submission.status,
    );

    return (
      <main className="site-container py-12 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="surface-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf/10 text-leaf">
              <Check size={25} />
            </div>

            <p className="eyebrow mt-5">Listing submitted</p>
            <h1 className="font-display text-3xl font-semibold">
              Your business is in the pipeline.
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              This is a simulated submission. No real moderation or payment has taken place.
            </p>

            <div className="mt-8 space-y-5">
              {statuses.map((status, index) => {
                const complete = index <= activeIndex;

                return (
                  <div key={status.key} className="flex gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      complete ? "bg-msitu text-white" : "bg-paper text-ink/40"
                    }`}>
                      {complete ? <Check size={16} /> : index + 1}
                    </div>

                    <div>
                      <p className={`text-sm font-semibold ${
                        complete ? "text-msitu" : "text-ink/45"
                      }`}>
                        {status.label}
                      </p>
                      <p className="mt-1 text-xs text-ink/55">
                        {status.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-7 text-xs text-ink/50">
              Submitted: {new Date(submission.submittedAt).toLocaleString("en-KE")}
            </p>

            <Link
              href="/dashboard"
              className="mt-7 inline-flex min-h-11 items-center rounded-control bg-msitu px-5 py-3 text-sm font-semibold text-white"
            >
              Go to seller dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="site-container py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/dashboard"
              className="text-sm text-ink/55 underline underline-offset-4"
            >
              Seller dashboard
            </Link>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              List your business.
            </h1>
            <p className="mt-2 text-sm text-ink/60">
              Share the details buyers need to understand the opportunity.
            </p>
          </div>

          <div
            className="flex items-center gap-2 text-xs font-medium"
            role="status"
            aria-live="polite"
          >
            {saveState === "saving" && (
              <>
                <LoaderCircle size={14} className="animate-spin" />
                Saving…
              </>
            )}
            {saveState === "saved" && (
              <span className="flex items-center gap-1 text-leaf">
                <Check size={14} />
                Saved
              </span>
            )}
            {saveState === "error" && (
              <span className="text-clay">Save failed</span>
            )}
            {saveState === "loading" && "Loading…"}
          </div>
        </div>

        <WizardProgress step={step} />

        <section className="surface-card p-5 sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <p className="eyebrow">01 / Basics</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Introduce the business.
                </h2>
                <p className="mt-2 text-sm text-ink/60">
                  Start with the name, type and location.
                </p>
              </div>

              <Input
                label="Business name"
                value={draft.title || ""}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="e.g. Mama Akinyi's Shop"
                required
              />

              <div>
                <FieldLabel>Business category</FieldLabel>
                <select
                  value={draft.category || ""}
                  onChange={(event) => updateField("category", event.target.value)}
                  className="min-h-12 w-full rounded-control border border-border bg-white px-3 text-sm"
                >
                  <option value="">Choose a category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel>County</FieldLabel>
                  <select
                    value={draft.county || ""}
                    onChange={(event) => updateField("county", event.target.value)}
                    className="min-h-12 w-full rounded-control border border-border bg-white px-3 text-sm"
                  >
                    <option value="">Choose county</option>
                    {COUNTIES.map((county) => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Town or area"
                  value={draft.town || ""}
                  onChange={(event) => updateField("town", event.target.value)}
                  placeholder="e.g. Kitui Town"
                  required
                />
              </div>

              <Input
                label="Asking price (KSh)"
                type="number"
                min="1"
                inputMode="numeric"
                value={draft.askingPriceKes?.toString() || ""}
                onChange={(event) => updateField(
                  "askingPriceKes",
                  event.target.value === "" ? undefined : Number(event.target.value),
                )}
                placeholder="e.g. 450000"
                required
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <p className="eyebrow">02 / Numbers</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Help buyers understand the numbers.
                </h2>
                <p className="mt-2 text-sm text-ink/60">
                  Use realistic monthly figures. These are seller-reported figures, not audited accounts.
                </p>
              </div>

              <Input
                label="Monthly revenue (KSh)"
                type="number"
                min="0"
                value={draft.monthlyRevenueKes?.toString() || ""}
                onChange={(event) => updateField(
                  "monthlyRevenueKes",
                  event.target.value === "" ? undefined : Number(event.target.value),
                )}
                placeholder="e.g. 180000"
              />

              <Input
                label="Monthly profit (KSh)"
                type="number"
                min="0"
                value={draft.monthlyProfitKes?.toString() || ""}
                onChange={(event) => updateField(
                  "monthlyProfitKes",
                  event.target.value === "" ? undefined : Number(event.target.value),
                )}
                placeholder="e.g. 45000"
              />

              {typeof draft.monthlyRevenueKes === "number" &&
                typeof draft.monthlyProfitKes === "number" &&
                draft.monthlyProfitKes > draft.monthlyRevenueKes && (
                  <p className="rounded-control border border-clay/30 bg-clay/5 p-3 text-sm leading-6 text-clay">
                    Profit is normally what remains after expenses. It cannot be higher than revenue in this form. Please check the figures.
                  </p>
                )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Years operating"
                  type="number"
                  min="0"
                  value={draft.yearsOperating?.toString() || ""}
                  onChange={(event) => updateField(
                    "yearsOperating",
                    event.target.value === "" ? undefined : Number(event.target.value),
                  )}
                />

                <Input
                  label="Number of staff"
                  type="number"
                  min="0"
                  value={draft.staffCount?.toString() || ""}
                  onChange={(event) => updateField(
                    "staffCount",
                    event.target.value === "" ? undefined : Number(event.target.value),
                  )}
                />
              </div>

              <Input
                label="Lease remaining (months)"
                type="number"
                min="0"
                value={draft.leaseRemainingMonths?.toString() || ""}
                onChange={(event) => updateField(
                  "leaseRemainingMonths",
                  event.target.value === "" ? undefined : Number(event.target.value),
                )}
                hint="Leave blank if the business does not operate from leased premises."
              />

              <div className="rounded-control bg-paper p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/55">
                  Simple payback estimate
                </p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-msitu">
                  {draft.monthlyProfitKes && draft.monthlyProfitKes > 0
                    ? `${(Number(draft.askingPriceKes || 0) / draft.monthlyProfitKes).toFixed(1)} months`
                    : "Not available"}
                </p>
                <p className="mt-1 text-xs leading-5 text-ink/55">
                  Asking price divided by monthly profit. This is a simple calculation, not a forecast or guarantee.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <p className="eyebrow">03 / Story</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Tell the business story.
                </h2>
              </div>

              <div>
                <FieldLabel>Why are you selling?</FieldLabel>
                <textarea
                  value={draft.reasonForSale || ""}
                  onChange={(event) => updateField("reasonForSale", event.target.value)}
                  rows={3}
                  maxLength={600}
                  placeholder="Share the reason you are considering a sale."
                  className="w-full rounded-control border border-border bg-white p-3 text-sm focus:border-jua focus:outline-none focus:ring-2 focus:ring-jua/30"
                />
                <p className="mt-1 text-right text-xs text-ink/45">
                  {(draft.reasonForSale || "").length}/600
                </p>
              </div>

              <div>
                <FieldLabel>Business description</FieldLabel>
                <textarea
                  value={draft.description || ""}
                  onChange={(event) => updateField("description", event.target.value)}
                  rows={6}
                  maxLength={3000}
                  placeholder="Describe what the business does, its customers, daily operations and what makes it interesting."
                  className="w-full rounded-control border border-border bg-white p-3 text-sm focus:border-jua focus:outline-none focus:ring-2 focus:ring-jua/30"
                />
                <p className="mt-1 text-right text-xs text-ink/45">
                  {(draft.description || "").length}/3000
                </p>
              </div>

              <div>
                <FieldLabel>What is included in the sale?</FieldLabel>
                <textarea
                  value={(draft.whatIsIncluded || []).join("\n")}
                  onChange={(event) => updateField(
                    "whatIsIncluded",
                    event.target.value.split("\n").map((item) => item.trim()).filter(Boolean),
                  )}
                  rows={5}
                  placeholder={"Stock and inventory\nShelving and fittings\nBusiness equipment"}
                  className="w-full rounded-control border border-border bg-white p-3 text-sm focus:border-jua focus:outline-none focus:ring-2 focus:ring-jua/30"
                />
                <p className="mt-1 text-xs text-ink/50">
                  Put each included item on a separate line.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <p className="eyebrow">04 / Photos</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Show buyers what they are considering.
                </h2>
                <p className="mt-2 text-sm text-ink/60">
                  Add up to 8 photos. The first photo is your cover image.
                </p>
              </div>

              <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed border-border bg-paper p-5 text-center hover:border-msitu">
                <ImagePlus size={25} className="text-msitu" />
                <span className="mt-2 text-sm font-semibold">
                  {photoBusy ? "Compressing photos…" : "Choose photos"}
                </span>
                <span className="mt-1 text-xs text-ink/55">
                  JPEG, PNG or WebP · Up to 8 photos
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  disabled={photoBusy || draft.photos.length >= 8}
                  onChange={(event) => {
                    void addPhotos(event.target.files);
                    event.currentTarget.value = "";
                  }}
                  className="sr-only"
                />
              </label>

              <div className="flex items-center justify-between text-xs text-ink/55">
                <span>{draft.photos.length} of 8 photos</span>
                <span>First photo = cover</span>
              </div>

              {draft.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {draft.photos.map((photo, index) => (
                    <div
                      key={`${index}-${photo.slice(0, 30)}`}
                      className="overflow-hidden rounded-card border border-border bg-white"
                    >
                      <div className="relative aspect-square bg-paper">
                        <img
                          src={photo}
                          alt={`Business photo ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        {index === 0 && (
                          <span className="absolute left-2 top-2 rounded-full bg-msitu px-2 py-1 text-[10px] font-bold text-white">
                            COVER
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-1 p-2">
                        <span className="text-xs text-ink/60">
                          Photo {index + 1}
                        </span>

                        <div className="flex gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => movePhoto(index, -1)}
                            aria-label={`Move photo ${index + 1} left`}
                            className="flex min-h-9 min-w-9 items-center justify-center rounded-control hover:bg-paper disabled:opacity-30"
                          >
                            <MoveLeft size={15} />
                          </button>
                          <button
                            type="button"
                            disabled={index === draft.photos.length - 1}
                            onClick={() => movePhoto(index, 1)}
                            aria-label={`Move photo ${index + 1} right`}
                            className="flex min-h-9 min-w-9 items-center justify-center rounded-control hover:bg-paper disabled:opacity-30"
                          >
                            <MoveRight size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            aria-label={`Remove photo ${index + 1}`}
                            className="flex min-h-9 min-w-9 items-center justify-center rounded-control text-clay hover:bg-clay/10"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs leading-5 text-ink/50">
                Photos are resized and compressed in your browser before being saved to this demo draft.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <p className="eyebrow">05 / Terms</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Set out the deal terms.
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    field: "mpesaAccepted" as const,
                    title: "M-Pesa accepted",
                    description: "You can discuss M-Pesa as a payment method.",
                  },
                  {
                    field: "bankTransfer" as const,
                    title: "Bank transfer accepted",
                    description: "You can discuss bank transfer as a payment method.",
                  },
                  {
                    field: "sellerFinancing" as const,
                    title: "Seller financing available",
                    description: "You may consider an agreed instalment arrangement.",
                  },
                  {
                    field: "negotiable" as const,
                    title: "Price is negotiable",
                    description: "Buyers may discuss the asking price.",
                  },
                ].map((option) => (
                  <label
                    key={option.field}
                    className="flex min-h-16 cursor-pointer items-start gap-3 rounded-control border border-border p-4"
                  >
                    <input
                      type="checkbox"
                      checked={Boolean(draft[option.field])}
                      onChange={(event) => updateField(option.field, event.target.checked)}
                      className="mt-1 h-4 w-4 accent-[#0F3D2E]"
                    />
                    <span>
                      <span className="block text-sm font-semibold">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-ink/55">
                        {option.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <div>
                <FieldLabel>Deal type</FieldLabel>
                <select
                  value={draft.dealType || ""}
                  onChange={(event) => updateField("dealType", event.target.value)}
                  className="min-h-12 w-full rounded-control border border-border bg-white px-3 text-sm"
                >
                  <option value="">Choose a deal type</option>
                  <option value="full-sale">Full business sale</option>
                  <option value="partnership">Partnership opportunity</option>
                  <option value="asset-sale">Assets and equipment only</option>
                </select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <p className="eyebrow">06 / Review and submit</p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Check everything before submitting.
                </h2>
              </div>

              <div className="rounded-card border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                  Business
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {draft.title || "Untitled business"}
                </h3>
                <p className="mt-1 text-sm text-ink/60">
                  {draft.category} · {draft.town}, {draft.county}
                </p>
                <p className="mt-3 text-lg font-bold tabular-nums text-msitu">
                  {money(draft.askingPriceKes)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-control bg-paper p-3">
                  <p className="text-xs text-ink/55">Monthly revenue</p>
                  <p className="mt-1 font-semibold">{money(draft.monthlyRevenueKes)}</p>
                </div>
                <div className="rounded-control bg-paper p-3">
                  <p className="text-xs text-ink/55">Monthly profit</p>
                  <p className="mt-1 font-semibold">{money(draft.monthlyProfitKes)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Description</p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-ink/65">
                  {draft.description || "No description added."}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Photos ({draft.photos.length})
                </p>
                {draft.photos.length > 0 ? (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {draft.photos.map((photo, index) => (
                      <img
                        key={`${index}-${photo.slice(0, 30)}`}
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="aspect-square w-full rounded-control object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-ink/55">No photos added.</p>
                )}
              </div>

              <div className="rounded-control bg-jua/10 p-4 text-sm leading-6 text-ink">
                <strong>Before submitting:</strong> Make sure your figures and descriptions are accurate. Buyers should independently inspect the business and its records. This demo does not process a payment or publish a real listing.
              </div>

              {pageError && (
                <p role="alert" className="text-sm text-clay">{pageError}</p>
              )}

              <Button
                fullWidth
                loading={saveState === "saving"}
                onClick={() => void handleSubmit()}
              >
                Submit demo listing
              </Button>
            </div>
          )}

          {fieldError && (
            <p role="alert" className="mt-6 rounded-control bg-clay/5 p-3 text-sm leading-6 text-clay">
              {fieldError}
            </p>
          )}

          {pageError && step !== 5 && (
            <p role="alert" className="mt-4 text-sm text-clay">
              {pageError}
            </p>
          )}

          {step !== 5 && (
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant="outline"
                onClick={() => void goBack()}
                disabled={step === 0 || saveState === "saving"}
              >
                <ArrowLeft size={16} />
                Back
              </Button>

              <Button
                onClick={() => void goNext()}
                loading={saveState === "saving"}
              >
                Continue
                <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
