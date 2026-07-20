"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Package,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

/* Re-engineered Instagram Icon following Feather/Lucide geometry */
function InstagramIcon({ size = 18, strokeWidth = 1.9, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* Apple-style Navigation Grid Actions */
const supportActions = [
  {
    id: "instagram",
    icon: InstagramIcon,
    title: "Chat on Instagram",
    body: "DM @bkc.finds — fastest reply",
    href: "https://instagram.com/bkc.finds",
    external: true,
  },
  {
    id: "email",
    icon: Mail,
    title: "Email support",
    body: "support@bigkidfinds.online",
    href: "mailto:support@bigkidfinds.online",
    external: true,
  },
  {
    id: "track",
    icon: Package,
    title: "Track your order",
    body: "Live status with your BKC order ID",
    href: "/track",
  },
  {
    id: "request",
    icon: Sparkles,
    title: "Request a product",
    body: "Can’t find it? We’ll source it",
    href: "/request",
  },
];

export default function SupportBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Prevent loading overlay over the Sanity Studio admin panel
  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      {/* Floating IOS Trigger Widget */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open support options"
        aria-expanded={open}
        whileTap={{ scale: 0.93 }}
        className="group fixed bottom-5 right-4 z-[60] flex h-13 w-13 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] border border-border/10 transition-colors md:bottom-6 md:right-6"
      >
        <MessageCircle size={22} strokeWidth={2} />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#1d1d1f]/95 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 md:block">
          Support Hub
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Minimal Backdrop Overlay */}
            <motion.div
              key="support-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-[1.5px]"
            />

            {/* Apple styled Floating Card Sheet */}
            <motion.div
              key="support-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Support options"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="pb-safe fixed inset-x-3 bottom-3 z-[85] rounded-[24px] border border-border/50 bg-surface/95 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[360px]"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.03em] text-primary">
                    Support Hub
                  </h3>
                  <p className="mt-0.5 text-xs leading-5 text-secondary">
                    Usually replies within a few hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close support panel"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f1f2f4] text-secondary transition-colors hover:bg-[#e5e5ea] hover:text-primary"
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>

              {/* iOS System Group Table Cells */}
              <div className="mt-4 overflow-hidden rounded-[18px] border border-border/40 bg-[#f1f2f4]">
                {supportActions.map((action, index) => {
                  const Icon = action.icon;
                  const inner = (
                    <>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#f5f5f7] text-primary">
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold tracking-[-0.015em] text-primary">
                          {action.title}
                        </span>
                        <span className="block truncate text-[11px] text-secondary">
                          {action.body}
                        </span>
                      </span>
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-secondary/60 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      />
                    </>
                  );

                  const cellClass =
                    "group flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-[#f5f5f7] border-b border-border/20 last:border-b-0";

                  return action.external ? (
                    <a
                      key={action.id}
                      href={action.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cellClass}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      key={action.id}
                      href={action.href}
                      onClick={() => setOpen(false)}
                      className={cellClass}
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>

              {/* Apple Aesthetic Soft Security Callout */}
              <p className="mt-4 flex items-start gap-2.5 rounded-[14px] bg-[#daf6ff] border border-border/30 px-3 py-2.5 text-[10px] leading-[1.45] text-green-350">
                <ShieldCheck size={14} className="mt-px shrink-0 text-green-500" />
                <span>
                  We will never request personal passwords, OTPs, card details, or UPI credentials.
                </span>
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
