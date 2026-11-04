
import type { HTMLAttributes } from "react";

export type SkeletonVariant =
  | "text"
  | "circle"
  | "rect";

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const shapeStyles: Record<SkeletonVariant, string> = {
    text: "h-4 w-full rounded-md",
    circle: "size-12 rounded-full",
    rect: "h-32 w-full rounded-control"
  };

  return (
    <div
      aria-hidden="true"
      className={[
        "bg-[#E9E2D5]",
        "motion-safe:animate-pulse",
        "motion-reduce:animate-none",
        shapeStyles[variant],
        className
      ].join(" ")}
      style={{
        ...style,
        ...(width ? { width } : {}),
        ...(height ? { height } : {})
      }}
      {...props}
    />
  );
}

export function ListingCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[14px] border border-border bg-[#FFFCF6]"
    >
      <Skeleton variant="rect" className="h-48 rounded-none" />

      <div className="space-y-4 p-4">
        <Skeleton variant="text" width="65%" />
        <Skeleton variant="text" width="90%" />

        <div className="grid grid-cols-3 gap-3 border-y border-border py-4">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>

        <div className="flex gap-2">
          <Skeleton variant="text" width="70px" />
          <Skeleton variant="text" width="90px" />
        </div>
      </div>
    </div>
  );
}
