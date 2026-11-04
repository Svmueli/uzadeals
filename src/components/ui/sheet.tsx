
"use client";

import {
  useEffect,
  useId,
  useRef,
  type ReactNode
} from "react";

import { X } from "lucide-react";

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Sheet({
  open,
  onClose,
  title,
  description,
  children
}: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleClose() {
    const previousFocus = previousFocusRef.current;

    previousFocusRef.current = null;

    onClose();

    if (previousFocus?.isConnected) {
      requestAnimationFrame(() => {
        previousFocus.focus({ preventScroll: true });
      });
    }
  }

  function closeDialog() {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={handleClose}
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog();
        }
      }}
      className={[
        "fixed inset-x-0 bottom-0 m-0",
        "max-h-[90dvh] w-full max-w-none",
        "overflow-y-auto border border-border",
        "rounded-t-[24px] bg-paper p-0 text-ink",
        "shadow-2xl backdrop:bg-ink/60",
        "md:bottom-auto md:left-1/2 md:top-1/2",
        "md:w-[min(100%-32px,560px)]",
        "md:-translate-x-1/2 md:-translate-y-1/2",
        "md:rounded-[24px]",
        "focus:outline-none",
        "motion-safe:transition-transform motion-safe:duration-200",
        "motion-reduce:transition-none"
      ].join(" ")}
    >
      <div className="sticky top-0 z-10 border-b border-border bg-paper px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id={titleId}
              className="font-display text-xl font-semibold text-msitu"
            >
              {title}
            </h2>

            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-xs leading-5 text-muted"
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={closeDialog}
            autoFocus
            aria-label="Close dialog"
            className={[
              "flex size-11 shrink-0 items-center justify-center",
              "rounded-control border border-border",
              "hover:bg-[#EFE9DD]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-jua focus-visible:ring-offset-2",
              "motion-reduce:transition-none"
            ].join(" ")}
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="p-5">
        {children}
      </div>
    </dialog>
  );
}
