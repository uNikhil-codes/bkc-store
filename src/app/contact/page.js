import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  Mail,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

// lucide-react 1.x removed brand icons, so the Instagram mark
// is drawn inline in the identical lucide stroke style.
const InstagramIcon = ({ size = 24, strokeWidth = 2, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
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

const contactOptions = [
  {
    title: "Email support",
    description: "support@bigkidfinds.online",
    href: "mailto:support@bigkidfinds.online",
    icon: Mail,
    external: false,
  },
  {
    title: "Instagram",
    description: "@bkc.finds",
    href: "https://instagram.com/bkc.finds",
    icon: InstagramIcon,
    external: true,
  },
  {
    title: "Business & collaborations",
    description: "Message us for partnerships",
    href: "https://instagram.com/bkc.finds",
    icon: MessageCircle,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto min-h-[75vh] max-w-2xl px-4 py-9 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-lg text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to store
      </Link>

      <header className="rise mt-8">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
          Support
        </p>
        <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.055em] text-primary sm:text-4xl">
          We’re here to help.
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-secondary">
          Need help with an order, delivery update, product request, or
          partnership? Choose the best way to reach us.
        </p>
      </header>

      <section className="rise rise-1 mt-8 space-y-3">
        {contactOptions.map((option) => {
          const Icon = option.icon;
          return (
            <a
              key={option.title}
              href={option.href}
              target={option.external ? "_blank" : undefined}
              rel={option.external ? "noopener noreferrer" : undefined}
              className="pressable group flex items-center gap-4 rounded-[20px] border border-border bg-surface p-4 transition-colors hover:border-[#a1a1a6]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#f1f2f4] text-primary">
                <Icon size={19} strokeWidth={1.8} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-primary">
                  {option.title}
                </span>
                <span className="mt-1 block truncate text-sm text-secondary">
                  {option.description}
                </span>
              </span>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-secondary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </a>
          );
        })}
      </section>

      <section className="rise rise-2 mt-7 overflow-hidden rounded-[22px] border border-border bg-surface">
        <div className="flex items-start gap-3 px-4 py-4">
          <Clock3
            size={19}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-primary"
          />
          <div>
            <p className="text-sm font-semibold text-primary">Response time</p>
            <p className="mt-1 text-xs leading-5 text-secondary">
              We aim to reply within 24 hours. For an existing order, please
              include your Order ID so we can assist you faster.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 border-t border-border px-4 py-4">
          <ShieldCheck
            size={19}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-accent"
          />
          <div>
            <p className="text-sm font-semibold text-primary">
              Safe order support
            </p>
            <p className="mt-1 text-xs leading-5 text-secondary">
              We will never ask for your OTP, UPI PIN, card number, or bank
              password.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
