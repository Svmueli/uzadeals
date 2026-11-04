
"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

export default function DemoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <aside
      className="demo-banner"
      role="status"
      aria-label="Demo data notice"
    >
      <div className="site-container flex min-h-[44px] items-center justify-between gap-3 py-2">
        <div className="flex items-center gap-2 text-xs sm:text-[13px]">
          <Info
            size={16}
            className="shrink-0"
            aria-hidden="true"
          />
          <p>
            <strong>Demo data:</strong>{" "}
            These businesses and figures are fictional examples.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Dismiss demo data notice"
          className="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
