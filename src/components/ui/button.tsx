
import { LoaderCircle } from "lucide-react";
import {
  forwardRef,
  type ButtonHTMLAttributes
} from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-msitu bg-msitu text-white hover:bg-[#174E3C] hover:border-[#174E3C]",
  secondary:
    "border border-jua bg-jua text-ink hover:bg-[#F1B33F] hover:border-[#F1B33F]",
  outline:
    "border border-border bg-transparent text-ink hover:bg-[#F0EADD]",
  danger:
    "border border-clay bg-clay text-white hover:bg-[#96391F] hover:border-[#96391F]"
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-[44px] px-3 text-xs",
  md: "min-h-[48px] px-5 text-sm",
  lg: "min-h-[52px] px-6 text-base"
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    disabled,
    className = "",
    children,
    type = "button",
    ...props
  },
  ref
) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-control font-bold",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-jua focus-visible:ring-offset-2",
        "focus-visible:ring-offset-paper",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "motion-reduce:transition-none",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      ].filter(Boolean).join(" ")}
      {...props}
    >
      {loading && (
        <LoaderCircle
          size={17}
          aria-hidden="true"
          className="motion-safe:animate-spin motion-reduce:animate-none"
        />
      )}

      {children}
    </button>
  );
});

Button.displayName = "Button";
