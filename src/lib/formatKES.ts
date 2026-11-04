
export type CurrencyFormat = "full" | "short";

const numberFormatter = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 0
});

const compactFormatter = new Intl.NumberFormat("en-KE", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0
});

export function formatKES(
  amount: number,
  format: CurrencyFormat = "full"
): string {
  if (!Number.isFinite(amount)) {
    return "KSh —";
  }

  const absoluteAmount = Math.abs(amount);

  if (format === "short") {
    if (absoluteAmount >= 1_000_000) {
      const value = compactFormatter.format(amount / 1_000_000);
      return `KSh ${value}M`;
    }

    if (absoluteAmount >= 1_000) {
      const value = compactFormatter.format(amount / 1_000);
      return `KSh ${value}K`;
    }
  }

  return `KSh ${numberFormatter.format(amount)}`;
}
