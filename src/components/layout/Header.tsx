
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

const navigation = [
  { label: "Browse", href: "/browse" },
  { label: "Sell your business", href: "/sell" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Sign in", href: "/sign-in" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"EN" | "SW">("EN");

  function toggleLanguage() {
    setLanguage((current) => current === "EN" ? "SW" : "EN");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-msitu text-white shadow-sm">
      <div className="site-container">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="UzaDeals homepage"
            className="inline-flex shrink-0 items-center font-display text-[26px] font-semibold tracking-tight"
          >
            <span className="text-paper">Uza</span>
            <span className="text-jua">Deals</span>
            <span className="ml-2 hidden font-sans text-[9px] font-medium tracking-[0.16em] text-white/60 sm:inline">
              KENYA
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-semibold text-white/85 transition-colors hover:text-jua"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`Switch language from ${language}`}
              aria-pressed={language === "SW"}
              className="flex min-h-[44px] items-center gap-1 rounded-control border border-white/20 px-3 text-xs font-bold transition-colors hover:bg-white/10"
            >
              <Globe size={15} aria-hidden="true" />
              {language}
              <ChevronDown size={13} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex size-11 items-center justify-center rounded-control border border-white/20 transition-colors hover:bg-white/10 lg:hidden"
            >
              {menuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-white/15 pb-4 pt-2 lg:hidden"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="mobile-menu-link"
              >
                {item.label}
              </Link>
            ))}

            <p className="pt-4 text-[11px] text-white/55">
              Find an opportunity. Build something of your own.
            </p>
          </nav>
        )}
      </div>
    </header>
  );
}
