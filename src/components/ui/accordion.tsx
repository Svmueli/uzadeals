
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false
}: AccordionItemProps) {
  return (
    <details
      open={defaultOpen}
      className="group border-b border-border"
    >
      <summary
        className={[
          "flex min-h-[56px] cursor-pointer",
          "list-none items-center justify-between gap-4 py-4",
          "font-semibold text-ink",
          "marker:hidden",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-jua focus-visible:ring-offset-2",
          "[&::-webkit-details-marker]:hidden"
        ].join(" ")}
      >
        <span>{title}</span>

        <ChevronDown
          size={19}
          aria-hidden="true"
          className="shrink-0 text-msitu transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>

      <div className="pb-5 pr-7 text-sm leading-7 text-muted">
        {children}
      </div>
    </details>
  );
}

export interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

export function Accordion({
  items,
  className = ""
}: AccordionProps) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={`${item.title}-${index}`}
          {...item}
        />
      ))}
    </div>
  );
}
