
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet } from "@/components/ui/sheet";
import { Accordion } from "@/components/ui/accordion";
import { Chip } from "@/components/ui/chip";
import {
  ListingCardSkeleton,
  Skeleton
} from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";

export default function StyleguidePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedChip, setSelectedChip] = useState("All");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "success" | "error" | "info"
  >("success");

  const showNotification = (
    variant: "success" | "error" | "info"
  ) => {
    setToastVariant(variant);
    setShowToast(true);
  };

  return (
    <main className="min-h-screen bg-paper">
      <section className="border-b border-border bg-msitu text-white">
        <div className="site-container py-12 md:py-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-jua">
            UzaDeals / Design system
          </p>

          <h1 className="font-display text-4xl font-semibold md:text-6xl">
            The component
            <br />
            workshop.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/75">
            A practical reference for the reusable interface
            elements that power UzaDeals.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/20 px-3 py-2 text-xs">
              TypeScript
            </span>

            <span className="rounded-full border border-white/20 px-3 py-2 text-xs">
              Tailwind CSS
            </span>

            <span className="rounded-full border border-white/20 px-3 py-2 text-xs">
              WCAG 2.1 AA target
            </span>
          </div>
        </div>
      </section>

      <div className="site-container py-10 md:py-14">
        <div className="mb-10 rounded-control border border-border bg-[#FFFCF6] p-4">
          <p className="text-sm font-bold text-msitu">
            How to test this page
          </p>

          <p className="mt-2 text-xs leading-6 text-muted">
            Resize your browser to 360px and then desktop width.
            Use Tab and Shift + Tab to inspect keyboard focus.
            Try Enter and Space on interactive elements, and
            press Escape while the sheet is open.
          </p>
        </div>

        {/* BUTTONS */}

        <section className="border-b border-border py-10">
          <div className="mb-6">
            <p className="eyebrow">01 / Actions</p>

            <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
              Buttons
            </h2>

            <p className="mt-2 text-sm text-muted">
              Consistent actions with clear priority and
              interaction states.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 text-xs font-bold text-muted">
                VARIANTS
              </p>

              <div className="flex flex-wrap gap-3">
                <Button>Primary action</Button>

                <Button variant="secondary">
                  Highlight action
                </Button>

                <Button variant="outline">
                  Secondary action
                </Button>

                <Button variant="danger">
                  Delete action
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold text-muted">
                SIZES
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-bold text-muted">
                INTERACTION STATES
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="surface-card space-y-3 p-4">
                  <p className="text-xs font-bold text-muted">
                    Default
                  </p>
                  <Button fullWidth>Continue</Button>
                </div>

                <div className="surface-card space-y-3 p-4">
                  <p className="text-xs font-bold text-muted">
                    Hover
                  </p>
                  <Button fullWidth>
                    Hover over me
                  </Button>
                  <p className="text-[11px] text-muted">
                    Move your pointer over the button.
                  </p>
                </div>

                <div className="surface-card space-y-3 p-4">
                  <p className="text-xs font-bold text-muted">
                    Keyboard focus
                  </p>
                  <Button fullWidth>
                    Tab to focus
                  </Button>
                  <p className="text-[11px] text-muted">
                    Use Tab to reveal the focus ring.
                  </p>
                </div>

                <div className="surface-card space-y-3 p-4">
                  <p className="text-xs font-bold text-muted">
                    Disabled
                  </p>
                  <Button disabled fullWidth>
                    Unavailable
                  </Button>
                </div>

                <div className="surface-card space-y-3 p-4">
                  <p className="text-xs font-bold text-muted">
                    Loading
                  </p>
                  <Button loading fullWidth>
                    Saving changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INPUTS */}

        <section className="border-b border-border py-10">
          <p className="eyebrow">02 / Data entry</p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
            Inputs
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="surface-card space-y-5 p-5">
              <p className="text-xs font-bold text-muted">
                DEFAULT AND HOVER
              </p>

              <Input
                label="Business name"
                placeholder="e.g. Mama Akinyi's Shop"
                hint="Use the name customers know."
              />

              <Input
                label="Asking price"
                placeholder="480000"
                inputMode="numeric"
              />

              <Input
                label="Contact name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="surface-card space-y-5 p-5">
              <p className="text-xs font-bold text-muted">
                ERROR AND DISABLED
              </p>

              <Input
                label="Phone number"
                defaultValue="123"
                error="Enter a valid Kenyan phone number."
              />

              <Input
                label="Email address"
                placeholder="Not currently available"
                disabled
                hint="This field is disabled."
              />
            </div>
          </div>

          <div className="mt-6 surface-card p-5">
            <p className="mb-4 text-xs font-bold text-muted">
              KEYBOARD FOCUS
            </p>

            <Input
              label="Test focus visibility"
              placeholder="Click or Tab into this field"
              hint="The amber outline should be clearly visible."
            />
          </div>
        </section>

        {/* SHEET */}

        <section className="border-b border-border py-10">
          <p className="eyebrow">03 / Overlays</p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
            Sheet
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
            Bottom sheet on mobile and centered dialog on
            desktop. Focus remains inside while open.
          </p>

          <div className="mt-6 surface-card p-5">
            <Button onClick={() => setSheetOpen(true)}>
              Open demonstration sheet
            </Button>

            <p className="mt-3 text-xs leading-5 text-muted">
              Test the close button, backdrop and Escape key.
              After closing, focus should return to the trigger.
            </p>
          </div>

          <Sheet
            open={sheetOpen}
            onClose={() => setSheetOpen(false)}
            title="Sheet demonstration"
            description="This is how interactive UzaDeals panels will behave."
          >
            <div className="space-y-5">
              <div className="rounded-control bg-[#EFE9DD] p-4">
                <p className="text-sm font-bold text-msitu">
                  Keyboard accessibility
                </p>

                <p className="mt-2 text-xs leading-6 text-muted">
                  Press Tab to move between controls. Focus
                  should remain inside this dialog until it
                  closes.
                </p>
              </div>

              <Input
                label="Your name"
                placeholder="Enter your name"
              />

              <Input
                label="Your phone"
                placeholder="07XX XXX XXX"
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  fullWidth
                  onClick={() => setSheetOpen(false)}
                >
                  Finish demonstration
                </Button>

                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setSheetOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Sheet>
        </section>

        {/* ACCORDION */}

        <section className="border-b border-border py-10">
          <p className="eyebrow">04 / Expandable content</p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
            Accordion
          </h2>

          <div className="surface-card mt-6 p-5">
            <Accordion
              items={[
                {
                  title: "What is a demo listing?",
                  defaultOpen: true,
                  children: (
                    <>
                      A fictional business record used to
                      demonstrate the UzaDeals marketplace.
                      It does not represent an actual business
                      for sale.
                    </>
                  )
                },
                {
                  title: "What does verified mean?",
                  children: (
                    <>
                      Verification refers to specific checks
                      recorded against a listing. It is not a
                      guarantee of profitability or accuracy.
                    </>
                  )
                },
                {
                  title: "Should I pay before inspecting?",
                  children: (
                    <>
                      No. Independently inspect the business,
                      its records and ownership documentation
                      before making any payment.
                    </>
                  )
                }
              ]}
            />
          </div>
        </section>

        {/* CHIPS */}

        <section className="border-b border-border py-10">
          <p className="eyebrow">05 / Selection</p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
            Chips
          </h2>

          <p className="mt-2 text-sm text-muted">
            Try selecting different categories.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "All",
              "Kiosks",
              "Salons",
              "Agrovets",
              "Transport",
              "Online shops"
            ].map((chip) => (
              <Chip
                key={chip}
                selected={selectedChip === chip}
                onClick={() => setSelectedChip(chip)}
              >
                {chip}
              </Chip>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted">
            Selected category:{" "}
            <strong className="text-msitu">
              {selectedChip}
            </strong>
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Chip>Demo listing</Chip>
            <Chip selected>Seller financing</Chip>
            <Chip disabled>Unavailable filter</Chip>
          </div>
        </section>

        {/* SKELETON */}

        <section className="border-b border-border py-10">
          <p className="eyebrow">06 / Loading</p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
            Skeletons
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="surface-card space-y-4 p-5">
              <p className="text-xs font-bold text-muted">
                INDIVIDUAL ELEMENTS
              </p>

              <Skeleton variant="circle" />

              <Skeleton variant="text" width="70%" />

              <Skeleton variant="text" width="100%" />

              <Skeleton variant="rect" height="130px" />
            </div>

            <div>
              <p className="mb-4 text-xs font-bold text-muted">
                LISTING CARD
              </p>

              <ListingCardSkeleton />
            </div>
          </div>
        </section>

        {/* TOAST */}

        <section className="py-10">
          <p className="eyebrow">07 / Feedback</p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
            Toast notifications
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => showNotification("success")}
            >
              Success toast
            </Button>

            <Button
              variant="danger"
              onClick={() => showNotification("error")}
            >
              Error toast
            </Button>

            <Button
              variant="outline"
              onClick={() => showNotification("info")}
            >
              Information toast
            </Button>
          </div>

          <div className="mt-6 min-h-[110px]">
            {showToast && (
              <Toast
                variant={toastVariant}
                title={
                  toastVariant === "success"
                    ? "Changes saved"
                    : toastVariant === "error"
                      ? "Something went wrong"
                      : "A useful reminder"
                }
                description={
                  toastVariant === "success"
                    ? "Your demonstration action completed successfully."
                    : toastVariant === "error"
                      ? "Please review your information and try again."
                      : "This is an informational notification."
                }
                onDismiss={() => setShowToast(false)}
              />
            )}
          </div>
        </section>

        {/* DESIGN TOKENS */}

        <section className="border-t border-border py-10">
          <p className="eyebrow">08 / Visual language</p>

          <h2 className="mt-2 font-display text-3xl font-semibold text-msitu">
            Colour palette
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              {
                name: "Paper",
                hex: "#F8F4EC",
                className: "bg-paper",
                border: true
              },
              {
                name: "Ink",
                hex: "#1B1B18",
                className: "bg-ink"
              },
              {
                name: "Msitu",
                hex: "#0F3D2E",
                className: "bg-msitu"
              },
              {
                name: "Jua",
                hex: "#E8A020",
                className: "bg-jua"
              },
              {
                name: "Clay",
                hex: "#B5472B",
                className: "bg-clay"
              },
              {
                name: "Leaf",
                hex: "#2E7D4F",
                className: "bg-leaf"
              }
            ].map((colour) => (
              <div key={colour.name}>
                <div
                  className={[
                    "h-20 rounded-control",
                    colour.className,
                    colour.border ? "border border-border" : ""
                  ].join(" ")}
                />

                <p className="mt-2 text-sm font-bold text-ink">
                  {colour.name}
                </p>

                <p className="text-xs text-muted">
                  {colour.hex}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="border-t border-border bg-[#EFE9DD]">
        <div className="site-container py-6">
          <p className="text-xs text-muted">
            UzaDeals Design System · Part 2
          </p>
        </div>
      </footer>
    </main>
  );
}
