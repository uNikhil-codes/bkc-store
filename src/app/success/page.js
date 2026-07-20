"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function SuccessPage() {
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const savedOrder = localStorage.getItem("bkc_recent_order");
    if (savedOrder) {
      setOrderId(savedOrder);
    }
  }, []);

  const copyToClipboard = async () => {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-4 py-10">
      <motion.main
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
        className="w-full max-w-md"
      >
        <div className="rounded-[28px] border border-border bg-surface px-5 py-9 text-center sm:px-8">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
              delay: 0.12,
            }}
            className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-success-soft text-success"
          >
            <Check size={34} strokeWidth={2.7} />
          </motion.div>
          <p className="mt-6 text-[30px] font-semibold tracking-[-0.05em] text-primary">
            Order confirmed.
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-secondary">
            Thank you. Your order is now being prepared and you can track its
            progress at any time.
          </p>

          <section className="mt-7 overflow-hidden rounded-[20px] border border-border bg-[#f8f8fa] text-left">
            <div className="px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
                Order reference
              </p>
              {orderId ? (
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="mt-2 flex w-full items-center justify-between gap-3 rounded-[13px] border border-border bg-surface px-3.5 py-3 text-left transition-colors hover:border-[#a1a1a6]"
                  aria-label="Copy order reference"
                >
                  <span className="text-sm font-semibold tracking-[0.06em] text-primary">
                    {orderId}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-secondary">
                    {copied ? (
                      <>
                        <Check size={14} className="text-success" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </span>
                </button>
              ) : (
                <p className="mt-2 text-sm text-secondary">
                  Your Order ID will appear here shortly.
                </p>
              )}
            </div>
            <div className="flex items-start gap-3 border-t border-border px-4 py-4">
              <Truck
                size={19}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-primary"
              />
              <div>
                <p className="text-sm font-semibold text-primary">
                  Estimated delivery
                </p>
                <p className="mt-1 text-xs leading-5 text-secondary">
                  Usually 5–7 business days from your order date. You’ll see
                  delivery updates on the tracking page.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-7 space-y-3">
            <Link
              href="/track"
              className="pressable flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              <Package size={18} strokeWidth={2} />
              Track my order
            </Link>
            <Link
              href="/"
              className="pressable flex h-13 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface text-sm font-semibold text-primary transition-colors hover:border-[#a1a1a6]"
            >
              Continue shopping
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] leading-5 text-secondary">
          <ShieldCheck size={14} strokeWidth={1.8} />
          Keep your Order ID handy for faster support.
        </p>
      </motion.main>
    </div>
  );
}
