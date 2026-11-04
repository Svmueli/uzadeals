
import type { ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  X
} from "lucide-react";

export type ToastVariant =
  | "success"
  | "error"
  | "info";

export interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  onDismiss: () => void;
  action?: ReactNode;
}

const toastStyles: Record<
  ToastVariant,
  {
    container: string;
    icon: string;
    role: "status" | "alert";
  }
> = {
  success: {
    container: "border-leaf",
    icon: "text-leaf",
    role: "status"
  },
  error: {
    container: "border-clay",
    icon: "text-clay",
    role: "alert"
  },
  info: {
    container: "border-msitu",
    icon: "text-msitu",
    role: "status"
  }
};

export function Toast({
  title,
  description,
  variant = "info",
  onDismiss,
  action
}: ToastProps) {
  const config = toastStyles[variant];

  const Icon =
    variant === "success"
      ? CheckCircle2
      : variant === "error"
        ? AlertCircle
        : Info;

  return (
    <div
      role={config.role}
      aria-live={variant === "error" ? "assertive" : "polite"}
      aria-atomic="true"
      className={[
        "flex w-full items-start gap-3",
        "rounded-control border-l-4 border-y border-r",
        "bg-[#FFFCF6] p-4 shadow-lg",
        config.container,
        "motion-safe:transition-transform motion-safe:duration-200",
        "motion-reduce:transition-none"
      ].join(" ")}
    >
      <Icon
        size={21}
        aria-hidden="true"
        className={`mt-0.5 shrink-0 ${config.icon}`}
      />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-ink">
          {title}
        </p>

        {description && (
          <p className="mt-1 text-xs leading-5 text-muted">
            {description}
          </p>
        )}

        {action && (
          <div className="mt-3">
            {action}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className={[
          "flex size-11 shrink-0 items-center justify-center",
          "rounded-control text-muted hover:bg-[#EFE9DD]",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-jua focus-visible:ring-offset-2"
        ].join(" ")}
      >
        <X size={17} aria-hidden="true" />
      </button>
    </div>
  );
}
