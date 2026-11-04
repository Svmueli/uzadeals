
import {
  forwardRef,
  useId,
  type InputHTMLAttributes
} from "react";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(function Input(
  {
    label,
    hint,
    error,
    id,
    required,
    disabled,
    className = "",
    wrapperClassName = "",
    ...props
  },
  ref
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null
  ].filter(Boolean).join(" ") || undefined;

  return (
    <div className={wrapperClassName}>
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-semibold text-ink"
      >
        {label}

        {required && (
          <span className="ml-1 text-clay" aria-hidden="true">
            *
          </span>
        )}

        {required && (
          <span className="sr-only">Required</span>
        )}
      </label>

      <input
        ref={ref}
        id={inputId}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={[
          "min-h-[48px] w-full rounded-control border",
          "bg-[#FFFCF6] px-4 py-3 text-sm text-ink",
          "placeholder:text-muted",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-jua focus-visible:ring-offset-2",
          "focus-visible:ring-offset-paper",
          "disabled:cursor-not-allowed disabled:bg-[#EFE9DD] disabled:opacity-70",
          error
            ? "border-clay focus-visible:ring-clay"
            : "border-border hover:border-msitu",
          className
        ].filter(Boolean).join(" ")}
        {...props}
      />

      {hint && !error && (
        <p
          id={hintId}
          className="mt-2 text-xs leading-5 text-muted"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-2 text-xs leading-5 text-clay"
        >
          <span aria-hidden="true">!</span>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
