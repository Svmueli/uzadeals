
import Link from "next/link";

const footerLinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Verification", href: "/verification" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" }
];

export default function Footer() {
  return (
    <footer className="bg-msitu text-white">
      <div className="site-container py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <Link
              href="/"
              className="inline-flex font-display text-2xl font-semibold"
              aria-label="UzaDeals homepage"
            >
              <span className="text-paper">Uza</span>
              <span className="text-jua">Deals</span>
            </Link>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
              A place to discover businesses for sale and explore
              opportunities to own something of your own.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-jua"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6">
          <p className="max-w-3xl text-xs leading-6 text-white/60">
            UzaDeals is a marketplace. We do not guarantee a seller&apos;s
            figures. Buyers should independently verify business
            information and conduct appropriate due diligence before
            making a purchase.
          </p>

          <div className="mt-5 flex flex-col gap-2 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} UzaDeals. All rights reserved.
            </span>
            <span>Made for the Kenyan marketplace.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
