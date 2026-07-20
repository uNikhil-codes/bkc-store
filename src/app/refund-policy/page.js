import Link from "next/link";
import { ArrowLeft, CircleAlert, FileCheck2, ShieldCheck } from "lucide-react";

export default function RefundPage() {
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
        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#fff4e8] text-[#a85f00]">
          <FileCheck2 size={23} strokeWidth={1.8} />
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-secondary">
          Clear claims process
        </p>

        <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.055em] text-primary sm:text-4xl">
          Refund Policy
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
          We want every order to feel right. Our products are curated for
          quality, and we stand behind them with a clear and transparent claims
          process.
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
              Designed to protect legitimate claims
            </p>
            <p className="mt-1 text-xs leading-5 text-secondary">
              An uninterrupted unboxing video is required for claims involving
              a wrong or damaged item. This protects both customers and our
              fulfilment partners.
            </p>
          </div>
        </div>
      </section>

      <article className="mt-10 space-y-9 text-[15px] leading-7 text-secondary">
        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            1. When Claims Are Accepted
          </h2>

          <p className="mt-3">
            We provide a full refund or a free replacement in the following
            situations:
          </p>

          <ul className="mt-3 list-disc space-y-3 pl-5 marker:text-primary">
            <li>
              <strong className="font-semibold text-primary">
                Wrong Item Received:
              </strong>{" "}
              The product delivered is not the product you ordered. A full,
              uninterrupted unboxing video is mandatory. The shipping label
              must be shown clearly before the package is opened.
            </li>

            <li>
              <strong className="font-semibold text-primary">
                Item Unavailable Post-Payment:
              </strong>{" "}
              You paid for an item that became unavailable before dispatch. In
              this rare situation, we will contact you and issue a full refund.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            2. The Unboxing Video
          </h2>

          <p className="mt-3">
            The unboxing recording is required for any eligible wrong-item or
            damage-related claim. It must be complete and uninterrupted.
          </p>

          <div className="mt-4 rounded-[18px] border border-[#f3c5c0] bg-[#fff8f7] p-4">
            <div className="flex items-start gap-3">
              <CircleAlert
                size={19}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-[#b42318]"
              />

              <p className="text-sm leading-6 text-[#7a271a]">
                The recording must begin before the outer package is opened and
                clearly show the shipping label first. Without a valid unboxing
                video, the claim cannot be accepted.
              </p>
            </div>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              The video must start before opening the outer package and clearly
              show that the shipping label and package are intact.
            </li>
            <li>
              The recording must continue without cuts or edits while opening
              the package and revealing the product for the first time.
            </li>
          </ul>

          <p className="mt-4">
            This policy helps prevent fraudulent claims and allows us to
            resolve legitimate issues faster with our fulfilment partners.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            3. What Is Not Covered?
          </h2>

          <p className="mt-3">
            We do not accept returns or refunds for the following reasons:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              Change of mind, or if you simply do not like the product. Please
              order thoughtfully.
            </li>
            <li>
              Slight variations in colour or texture. Products are photographed
              under professional lighting, and small differences may occur
              depending on your screen.
            </li>
            <li>
              Claims submitted more than 48 hours after the courier-recorded
              delivery date.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            4. How to Raise a Claim
          </h2>

          <p className="mt-3">
            If your issue meets the conditions above, send a DM to our
            Instagram account, <strong className="font-semibold text-primary">@bkc.finds</strong>,
            {" "}or use our Contact page within 48 hours of delivery. Include your
            Order ID and we will guide you on how to send the unboxing video.
          </p>

          <p className="mt-4">
            Once your claim is verified, we resolve eligible cases within 5–7
            business days.
          </p>
        </section>
      </article>
    </div>
  );
}
