
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({
  children,
  className = "",
}: AccordionProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  return (
    <details
      className="group border-b border-border last:border-b-0"
      open={defaultOpen}
    >
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-medium text-ink marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-jua">
        {title}
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>

      <div className="pb-4 text-sm leading-6 text-ink/65">
        {children}
      </div>
    </details>
  );
}
