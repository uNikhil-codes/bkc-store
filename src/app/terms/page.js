import Link from "next/link";
import { ArrowLeft, FileText, Scale, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-lg text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ArrowLeft size={16} strokeWidth={2} />
        Back to store
      </Link>

      <header className="mt-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#f1f2f4] text-primary">
          <FileText size={23} strokeWidth={1.8} />
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-secondary">
          The fine print, made clear
        </p>

        <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.055em] text-primary sm:text-4xl">
          Terms of Service
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
          Welcome to BigKidFinds. By browsing our site and placing an order,
          you agree to the terms below. We have kept them clear and simple
          because we believe clarity matters.
        </p>
      </header>

      <section className="mt-8 overflow-hidden rounded-[22px] border border-border bg-[#f8f8fa]">
        <div className="flex items-start gap-3 p-4">
          <ShieldCheck
            size={20}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-primary"
          />
          <div>
            <p className="text-sm font-semibold text-primary">
              A transparent shopping experience
            </p>
            <p className="mt-1 text-xs leading-5 text-secondary">
              Our terms explain how BigKidFinds operates, how orders are
              accepted, and how payments and deliveries are handled.
            </p>
          </div>
        </div>
      </section>

      <article className="mt-10 space-y-9 text-[15px] leading-7 text-secondary">
        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            1. Our Business Model
          </h2>

          <p className="mt-3">
            BigKidFinds is a curated e-commerce marketplace. We are not the
            manufacturer of the products. We source unique, high-quality items
            from a network of domestic and international suppliers, makers, and
            fulfilment platforms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            2. Order Acceptance
          </h2>

          <p className="mt-3">
            Placing an order does not constitute automatic acceptance of that
            order. We reserve the right to accept, decline, or cancel an order
            for any reason.
          </p>

          <p className="mt-4">
            Common reasons for cancellation include an item becoming
            unavailable, a clear pricing error on the website, or an order
            being flagged by fraud-detection systems. If we cancel an order you
            have already paid for, we will issue a full refund.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            3. Payment
          </h2>

          <p className="mt-3">
            All prices are listed in Indian Rupees (INR). Prices may change
            without notice. We offer prepaid payment methods, including UPI,
            and Cash on Delivery where available.
          </p>

          <p className="mt-4">
            Cash on Delivery is available only on selected products and PIN
            codes at our discretion.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            4. User Conduct
          </h2>

          <p className="mt-3">
            You agree not to copy, reproduce, or resell any part of our
            website’s design, photography, or written copy. Our brand and its
            assets are our intellectual property.
          </p>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-[-0.025em] text-primary">
            <Scale size={19} strokeWidth={1.8} />
            5. Governing Law
          </h2>

          <p className="mt-3">
            By using our service, you agree that any disputes will be governed
            by the laws of India.
          </p>
        </section>

        <section className="border-t border-border pt-7">
          <p className="text-sm leading-6 text-secondary">
            For specific information, please also review our{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link
              href="/refund-policy"
              className="font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
              Refund Policy
            </Link>
            , and{" "}
            <Link
              href="/shipping"
              className="font-medium text-primary underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
              Shipping Policy
            </Link>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
