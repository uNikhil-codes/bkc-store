"use client";

import Link from "next/link";
import { Banknote, ChevronRight, Star } from "lucide-react";

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function ProductCard({ product }) {
  const hasImage = Boolean(product.imageUrl);
  const rawPrice = product.prepaidPrice || 0;
  const originalMRP = Math.round(rawPrice * 1.35);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group pressable block rounded-[22px] focus:outline-none"
      aria-label={`View details of ${product.title}`}
    >
      <article>
        {/* Image Frame */}
        <div className="relative aspect-square w-full overflow-hidden rounded-[22px] border border-black/[0.055] bg-[#f1f2f4]">
          {product.discountBadge && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-white shadow-sm">
              {product.discountBadge}
            </span>
          )}
          {hasImage ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-5 text-center text-xs font-medium text-secondary">
              Product image coming soon
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/[0.03] to-transparent" />
        </div>

        {/* Info Block */}
        <div className="px-1 pt-3">

          {/* Subtle rating row for browse confidence */}
          <div className="flex items-center gap-1 text-[#ff9500] mb-1">
            <Star size={10} fill="currentColor" stroke="none" />
            <span className="text-[10px] font-semibold text-primary">
              4.9 <span className="text-secondary font-normal">(184)</span>
            </span>
          </div>

          <h3 className="line-clamp-2 min-h-10 text-[14px] font-medium leading-5 tracking-[-0.015em] text-primary">
            {product.title}
          </h3>

          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-semibold tracking-[-0.025em] text-primary">
                {formatPrice(rawPrice)}
              </span>
              <span className="text-[11px] text-secondary line-through opacity-70">
                {formatPrice(originalMRP)}
              </span>
            </div>

            <ChevronRight
              size={14}
              className="text-secondary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </div>

          {product.isCodAvailable && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#f1f2f4] px-1.5 py-1 text-[10px] font-medium text-secondary">
              <Banknote size={11} strokeWidth={1.8} />
              COD available
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
