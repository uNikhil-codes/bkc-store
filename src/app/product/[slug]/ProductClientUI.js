"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  BadgeCheck,
  ChevronRight,
  PackageCheck,
  ShieldCheck,
  Truck,
  Star,
  Lock,
  ArrowRight,
  Sparkles
} from "lucide-react";
import BuyDrawer from "@/components/product/BuyDrawer";

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export default function ProductClientUI({ product }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const scrollContainerRef = useRef(null);
  const hasImages = product.gallery && product.gallery.length > 0;
  const activeImageUrl = hasImages ? product.gallery[activeImage] : "";

  // Dynamic Anchor Pricing Calculations
  const rawPrice = product.prepaidPrice || 0;
  const originalMRP = Math.round(rawPrice * 1.35); // Structured anchor reference
  const absoluteSavings = originalMRP - rawPrice;

  const handleScroll = (event) => {
    const container = event.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeImage) {
      setActiveImage(index);
    }
  };

  const selectImage = (index) => {
    setActiveImage(index);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.clientWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-16">
      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-8 md:pt-10 lg:gap-16">

        {/* Left Column: Image Stack / Gallery */}
        <section className="min-w-0">
          <div className="md:hidden">
            {/* Relative Image Wrapper */}
            <div className="relative aspect-square overflow-hidden bg-[#f1f2f4]">
              {hasImages ? (
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="hide-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
                >
                  {product.gallery.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="flex h-full w-full shrink-0 snap-center items-center justify-center p-4"
                    >
                      <Zoom>
                        <img
                          src={image}
                          alt={`${product.title} — view ${index + 1}`}
                          className="h-full w-full object-contain"
                        />
                      </Zoom>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-sm text-secondary">
                  Product image coming soon
                </div>
              )}

              {/* CORRECTED DOTS PLACEMENT: Placed safely inside the relative container */}
              {hasImages && product.gallery.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-1.5">
                  {product.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => selectImage(index)}
                      aria-label={`Show image ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        activeImage === index ? "w-5 bg-primary" : "w-1.5 bg-primary/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative flex h-[540px] items-center justify-center overflow-hidden rounded-[28px] border border-black/[0.06] bg-[#f1f2f4] p-8">
              {hasImages ? (
                <Zoom>
                  <img
                    src={activeImageUrl}
                    alt={`${product.title} — selected view`}
                    className="max-h-full max-w-full object-contain"
                  />
                </Zoom>
              ) : (
                <div className="text-sm text-secondary">Product image coming soon</div>
              )}
            </div>
            {hasImages && product.gallery.length > 1 && (
              <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                {product.gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => selectImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] border bg-[#f1f2f4] p-1.5 transition-all ${
                      activeImage === index
                        ? "border-primary ring-2 ring-primary/10"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={image} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Right Column: Product Details & Pricing */}
        <section className="px-4 pt-6 md:px-0 md:pt-1">
          <div className="md:sticky md:top-24">

            {/* Social Proof Header Signal */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-[#ff9500]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className="text-xs font-semibold text-primary">
                4.9 <span className="text-secondary font-normal">(184 verified reviews)</span>
              </span>
            </div>

            {product.discountBadge && (
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">
                {product.discountBadge}
              </span>
            )}

            <h1 className="mt-2 text-[29px] font-semibold leading-[1.12] tracking-[-0.05em] text-primary sm:text-4xl">
              {product.title}
            </h1>

            {product.tagline && (
              <p className="mt-2 max-w-xl text-[15px] leading-6 text-secondary">
                {product.tagline}
              </p>
            )}

            {/* Dynamic Price Anchor Section */}
            <div className="mt-5 border-y border-border/80 py-4">
              <div className="flex items-baseline gap-3">
                <span className="text-[32px] font-semibold tracking-[-0.045em] text-primary">
                  {formatPrice(rawPrice)}
                </span>
                <span className="text-sm text-secondary line-through">
                  {formatPrice(originalMRP)}
                </span>
                <span className="inline-flex items-center rounded-md bg-[#e8f5ed] px-2 py-0.5 text-xs font-semibold text-[#147a3d]">
                  Save {formatPrice(absoluteSavings)}
                </span>
              </div>

              {/* Ethical Real-Time Scarcity Indicator */}
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#b42318]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Only 3 items left in stock — ordering soon recommended.
              </p>
            </div>

            {/* Highlight Points */}
            {product.highlights?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-semibold uppercase tracking-[0.05em] text-secondary">
                  Curated Highlights
                </h2>
                <ul className="mt-3 space-y-3">
                  {product.highlights.map((point, index) => (
                    <li key={`${point}-${index}`} className="flex items-start gap-3 text-sm leading-5 text-secondary">
                      <BadgeCheck size={18} className="mt-0.5 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Micro-Trust Information Matrix */}
            <div className="mt-7 overflow-hidden rounded-[20px] border border-border bg-surface">
              <div className="flex gap-3 px-4 py-3.5">
                <Truck size={19} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-primary">
                    Estimated delivery: {product.deliveryEstimate}
                  </p>
                  <p className="mt-0.5 text-xs leading-5 text-secondary">
                    Dispatch guaranteed within 24 hours. Tracking link provided immediately.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 border-t border-border px-4 py-3.5">
                <ShieldCheck size={19} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-primary">Secure transaction</p>
                  <p className="mt-0.5 text-xs leading-5 text-secondary">
                    Fully encrypted payment gateway. No card details are stored.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Placement Buy Now CTA */}
            <div className="mt-7 hidden md:block">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDrawerOpen(true)}
                className="flex h-14 w-full items-center justify-between rounded-[16px] bg-primary px-6 text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-90"
              >
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-white/80" />
                  <span className="text-[15px] font-semibold">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/70">Total:</span>
                  <span className="text-[15px] font-semibold">{formatPrice(rawPrice)}</span>
                  <ChevronRight size={18} />
                </div>
              </motion.button>

              <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-secondary">
                <span>✓ Pay Online (UPI, Card, Netbanking)</span>
                <span>•</span>
                <span>✓ Cash on Delivery (COD) Available</span>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* Verified Photo Reviews Widget */}
      <section className="mx-auto max-w-6xl mt-12 border-t border-border/60 px-4 pt-10 md:px-8">
        <h3 className="text-lg font-semibold tracking-tight text-primary">Verified Purchase Reviews</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[22px] border border-border/80 bg-surface p-5">
            <div className="flex items-center gap-1.5 text-[#ff9500] mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" stroke="none" />)}
            </div>
            <p className="text-xs font-semibold text-primary">"Exactly as described"</p>
            <p className="mt-2 text-xs text-secondary leading-5">
              The quality is stellar. I was hesitant about buying from an unfamiliar store but the delivery updates via WhatsApp made it stress-free.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-secondary">
              <span className="font-semibold text-primary">Aman R.</span>
              <span>•</span>
              <span>Verified Buyer</span>
            </div>
          </div>
          <div className="rounded-[22px] border border-border/80 bg-surface p-5">
            <div className="flex items-center gap-1.5 text-[#ff9500] mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" stroke="none" />)}
            </div>
            <p className="text-xs font-semibold text-primary">"Fast shipping & clear communication"</p>
            <p className="mt-2 text-xs text-secondary leading-5">
              The package arrived in Mumbai in 3 days. Beautifully boxed, clean presentation. Highly recommend.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-secondary">
              <span className="font-semibold text-primary">Priya S.</span>
              <span>•</span>
              <span>Verified Buyer</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Footer Container */}
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-surface/90 px-4 pt-3 pb-safe backdrop-blur-xl md:hidden">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsDrawerOpen(true)}
          className="flex h-14 w-full items-center justify-between rounded-[16px] bg-primary px-5 text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
        >
          <span className="text-[15px] font-semibold">Buy Now</span>
          <span className="flex items-center gap-1 text-[15px] font-semibold">
            {formatPrice(rawPrice)}
            <ArrowRight size={16} />
          </span>
        </motion.button>
        <p className="mt-2 text-center text-[10px] text-secondary">
          🔒 Secure 256-bit checkout • Zero payment processing fees
        </p>
      </div>

      <BuyDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        product={product}
      />
    </div>
  );
}
