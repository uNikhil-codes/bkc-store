import Link from "next/link";
import { ArrowLeft, PackageCheck, ShieldCheck, Truck } from "lucide-react";

export default function ShippingPage() {
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
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#eaf3ff] text-accent">
          <Truck size={23} strokeWidth={1.8} />
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-secondary">
          Fast & reliable
        </p>

        <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.055em] text-primary sm:text-4xl">
          Shipping & Delivery
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
          Our mission is to get every curated find into your hands as quickly
          and reliably as possible, with delivery support throughout the
          journey.
        </p>
      </header>

      <section className="mt-8 overflow-hidden rounded-[22px] border border-border bg-[#f8f8fa]">
        <div className="flex items-start gap-3 p-4">
          <PackageCheck
            size={20}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-primary"
          />

          <div>
            <p className="text-sm font-semibold text-primary">
              A note on fulfilment partners
            </p>

            <p className="mt-1 text-xs leading-5 text-secondary">
              BigKidFinds curates products through a fulfilment network. During
              delivery, you may receive calls or updates from Meesho, Amazon,
              Flipkart, or other delivery partners. This is normal and relates
              to the partner fulfilling your specific order.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 border-t border-border p-4">
          <ShieldCheck
            size={20}
            strokeWidth={1.8}
            className="mt-0.5 shrink-0 text-primary"
          />

          <div>
            <p className="text-sm font-semibold text-primary">
              Transparent delivery support
            </p>

            <p className="mt-1 text-xs leading-5 text-secondary">
              Your delivery details are shared securely and only with the
              partner responsible for delivering your order.
            </p>
          </div>
        </div>
      </section>

      <article className="mt-10 space-y-9 text-[15px] leading-7 text-secondary">
        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            1. Our 24-Hour Dispatch Rule
          </h2>

          <p className="mt-3">
            We are not a mega-corporation with slow processing times. We are a
            fast-moving studio. Our internal target is to process and dispatch
            every order within 24 hours of confirmation. Orders placed before
            11 AM IST are typically dispatched the same day.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            2. Our Fulfillment Network
          </h2>

          <p className="mt-3">
            To provide a seamless delivery experience across India, we work
            with a hybrid network of trusted partners. Depending on your
            location and the product’s warehouse, your order may be shipped
            through different fulfilment channels.
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              <strong className="font-semibold text-primary">
                Important note:
              </strong>{" "}
              BigKidFinds curates products rather than manufacturing or holding
              every product directly. Calls and messages from different
              delivery partners may occur during fulfilment.
            </li>

            <li>
              <strong className="font-semibold text-primary">
                Courier partners may include:
              </strong>{" "}
              Delhivery, Ecom Express, Shadowfax, Meesho partners, Amazon
              partners, and other logistics providers.
            </li>

            <li>
              <strong className="font-semibold text-primary">
                Curated supplier networks:
              </strong>{" "}
              Including reliable Meesho fulfilment networks that support
              delivery reach across Tier-1, Tier-2, and Tier-3 locations.
            </li>
          </ul>

          <p className="mt-4">
            Your checkout details are shared securely and only with the partner
            responsible for delivering your specific order.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            3. Estimated Delivery Timelines
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              <strong className="font-semibold text-primary">
                Metro & Tier-1 Cities:
              </strong>{" "}
              3–5 business days after dispatch.
            </li>
            <li>
              <strong className="font-semibold text-primary">
                Rest of India:
              </strong>{" "}
              5–7 business days after dispatch.
            </li>
            <li>
              <strong className="font-semibold text-primary">Note:</strong>{" "}
              Remote PIN codes may occasionally require additional time.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            4. Live, On-Site Tracking
          </h2>

          <p className="mt-3">
            You do not need to hunt for tracking links or visit third-party
            courier websites. Use our on-site Track Order page, enter the Order
            ID from your confirmation and the phone number used at checkout,
            and see the current visual timeline of your order’s journey.
          </p>
        </section>
      </article>
    </div>
  );
}
