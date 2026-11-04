
import type { ReactNode } from "react";

export interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({
  children,
  selected = false,
  disabled = false,
  onClick,
  className = ""
}: ChipProps) {
  const styles = [
    "inline-flex min-h-[44px] items-center justify-center",
    "rounded-full border px-4 py-2",
    "text-xs font-semibold",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-jua focus-visible:ring-offset-2",
    "focus-visible:ring-offset-paper",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "motion-reduce:transition-none",
    selected
      ? "border-msitu bg-msitu text-white"
      : "border-border bg-[#FFFCF6] text-ink hover:border-msitu hover:bg-[#EFE9DD]",
    className
  ].join(" ");

  if (!onClick) {
    return (
      <span className={styles}>
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
}
