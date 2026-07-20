"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  PackageSearch,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";

export default function SearchClientUI({ products, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return products.filter((product) =>
      product.title.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery, products]);

  const fallbackProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-12">
      <section className="sticky top-14 z-40 border-b border-border/70 bg-surface/85 px-4 py-4 backdrop-blur-xl sm:top-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
              <Search
                size={19}
                strokeWidth={1.9}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary"
              />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search gadgets, decor, accessories..."
                aria-label="Search products"
                className="h-13 w-full rounded-[16px] border border-border bg-[#f5f5f7] py-3 pl-11 pr-11 text-base font-medium text-primary outline-none transition-all placeholder:text-secondary/80 focus:border-accent focus:bg-surface focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-[0_0_0_3px_rgba(0,113,227,0.08)]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-secondary transition-colors hover:bg-black/[0.06] hover:text-primary focus:outline-none focus:ring-0 focus-visible:outline-none"
                >
                  <X size={17} strokeWidth={2.2} />
                </button>
              )}
            </div>
          {normalizedQuery && (
            <p className="mt-3 text-xs text-secondary" aria-live="polite">
              {results.length === 1
                ? "1 result found"
                : `${results.length} results found`}
              {" for "}
              <span className="font-medium text-primary">“{query.trim()}”</span>
            </p>
          )}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-7 md:px-8 md:py-10">
        {!normalizedQuery && (
          <section>
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
                Browse everything
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-primary">
                Find something good.
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-secondary">
                Search our current curated selection, or browse all available
                products below.
              </p>
            </div>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-[22px] border border-border bg-surface px-6 py-12 text-center">
                <PackageSearch
                  size={30}
                  strokeWidth={1.6}
                  className="mx-auto text-secondary"
                />
                <p className="mt-4 text-base font-semibold text-primary">
                  No products available yet.
                </p>
                <p className="mt-1 text-sm text-secondary">
                  Please check back soon.
                </p>
              </div>
            )}
          </section>
        )}

        {normalizedQuery && results.length > 0 && (
          <section>
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        )}

        {normalizedQuery && results.length === 0 && (
          <section className="mx-auto max-w-3xl">
            <div className="rounded-[28px] border border-border bg-surface px-5 py-9 text-center sm:px-10 sm:py-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#f1f2f4] text-primary">
                <PackageSearch size={27} strokeWidth={1.7} />
              </div>
              <p className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-primary">
                We don’t have that yet.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-secondary">
                Tell us what you’re looking for. If we can source a good
                version, we’ll let you know.
              </p>
              <Link
                href={`/request?item=${encodeURIComponent(query.trim())}`}
                className="pressable mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                Request this product
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
            </div>
            {fallbackProducts.length > 0 && (
              <div className="mt-10">
                <div className="mb-5 flex items-center gap-2">
                  <Sparkles size={16} strokeWidth={1.8} className="text-primary" />
                  <h2 className="text-base font-semibold tracking-[-0.02em] text-primary">
                    You might like these
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 md:grid-cols-4">
                  {fallbackProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
