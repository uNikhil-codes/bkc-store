"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Truck, Mail, MapPin } from "lucide-react";

const supportLinks = [
  { href: "/track", label: "Track order" },
  { href: "/request", label: "Request a product" },
  { href: "/contact", label: "Contact support" },
];

const policyLinks = [
  { href: "/shipping", label: "Shipping" },
  { href: "/refund-policy", label: "Refunds" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/70 bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">

          {/* Curation Story Column */}
          <div>
            <p className="text-xl font-semibold tracking-[-0.045em]">
              BigKidFinds<span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-sm text-xs leading-6 text-secondary">
              We hand-pick and curate highly specific, quality-tested catalog lines. By operating as a transparent middleman platform, we partner with verified logistics networks across India to secure your checkout and delivery journey.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3 py-1.5 text-[10px] font-medium text-secondary">
                <ShieldCheck size={12} className="text-primary" />
                Verified Razorpay Payments
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3 py-1.5 text-[10px] font-medium text-secondary">
                <Truck size={12} className="text-primary" />
                Delivery to 20,000+ PIN Codes
              </span>
            </div>
          </div>

          {/* Support Channels */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
              Support
            </p>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-primary transition-opacity hover:opacity-55"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guidelines & Compliance */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
              Policies
            </p>
            <ul className="mt-4 space-y-3">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary transition-opacity hover:opacity-55"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Absolute Transparency: Physical Footer Seal */}
        <div className="mt-10 border-t border-border/70 pt-6 text-xs text-secondary flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-primary">BigKidFinds Curation Hub</p>
            <p className="flex items-center gap-1.5">
              <MapPin size={12} /> Bangalore Hub, India
            </p>
            <p className="flex items-center gap-1.5">
              <Mail size={12} /> support@bigkidfinds.online
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p>© {new Date().getFullYear()} BigKidFinds. All rights reserved.</p>
            <p className="mt-0.5 text-[10px]">Made for considered shopping.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
