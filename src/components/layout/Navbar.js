import Link from "next/link";
import { Package, Search } from "lucide-react";

const navLinks = [
  { href: "/#new", label: "Shop" },
  { href: "/track", label: "Track order" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <>
      {/* Thin announcement bar — shipping clarity before a single scroll */}
      <div className="flex h-9 w-full items-center justify-center gap-2 bg-primary px-4 text-center text-[11px] font-medium leading-4 text-white sm:text-xs">
        <span>Free shipping on every order</span>
        <span className="text-white/35" aria-hidden="true">·</span>
        <span>COD available</span>
        <span className="hidden text-white/35 sm:inline" aria-hidden="true">·</span>
        <span className="hidden sm:inline">Delivery updates included</span>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 sm:h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className="group inline-flex items-center rounded-lg focus:outline-none"
            aria-label="BigKidFinds home"
          >
            <span className="text-[19px] sm:text-[21px] font-semibold tracking-[-0.045em] text-primary transition-opacity group-hover:opacity-65">
              BigKidFinds<span className="text-brand">.</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            {/* Labeled links — first-time visitors need words, not icons */}
            <div className="hidden items-center gap-1 sm:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex h-10 items-center rounded-full px-3.5 text-sm font-medium text-secondary transition-colors hover:bg-black/[0.045] hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/track"
              aria-label="Track your order"
              className="pressable inline-flex h-11 w-11 items-center justify-center rounded-full text-secondary transition-colors hover:bg-black/[0.045] hover:text-primary sm:hidden"
            >
              <Package size={20} strokeWidth={1.8} />
            </Link>
            <Link
              href="/search"
              aria-label="Search products"
              className="pressable inline-flex h-11 w-11 items-center justify-center rounded-full text-secondary transition-colors hover:bg-black/[0.045] hover:text-primary"
            >
              <Search size={21} strokeWidth={1.9} />
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
