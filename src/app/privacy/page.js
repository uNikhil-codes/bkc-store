import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
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
          <LockKeyhole size={23} strokeWidth={1.8} />
        </div>

        <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-secondary">
          Your data, respected
        </p>

        <h1 className="mt-2 text-[34px] font-semibold tracking-[-0.055em] text-primary sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-secondary sm:text-base">
          Your privacy is critically important to us. We believe in clear
          communication and collect only the information required to run our
          store and deliver your order.
        </p>
      </header>

      <div className="mt-8 flex items-start gap-3 rounded-[20px] border border-border bg-[#f8f8fa] p-4">
        <ShieldCheck
          size={20}
          strokeWidth={1.8}
          className="mt-0.5 shrink-0 text-primary"
        />
        <div>
          <p className="text-sm font-semibold text-primary">
            Our privacy commitment
          </p>
          <p className="mt-1 text-xs leading-5 text-secondary">
            We do not sell your personal information. Payment information is
            handled securely by our payment partners and is not stored by
            BigKidFinds.
          </p>
        </div>
      </div>

      <article className="mt-10 space-y-9 text-[15px] leading-7 text-secondary">
        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            1. What We Collect
          </h2>

          <p className="mt-3">
            To successfully deliver your order, we collect the following
            essential information at checkout:
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              <strong className="font-semibold text-primary">
                Contact Information:
              </strong>{" "}
              Your full name, email address, and mobile phone number.
            </li>
            <li>
              <strong className="font-semibold text-primary">
                Delivery Information:
              </strong>{" "}
              Your full shipping address, including house number, street, city,
              state, and PIN code.
            </li>
          </ul>

          <p className="mt-4">
            We do not collect, see, or store payment information such as card
            numbers or UPI details. All payments are handled securely by our
            payment partners.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            2. How We Use Your Data
          </h2>

          <p className="mt-3">
            Your data has one purpose: to get your product to you and provide
            support when you need it.
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              <strong className="font-semibold text-primary">
                Fulfillment:
              </strong>{" "}
              Your name, address, and phone number are shared securely with
              trusted fulfilment partners and courier services, such as
              Delhivery, Ecom Express, Shadowfax, or Meesho-backed logistics,
              solely to dispatch and deliver your package.
            </li>
            <li>
              <strong className="font-semibold text-primary">
                Communications:
              </strong>{" "}
              Your email address may be used for transactional communication,
              including order confirmation and shipping updates. We will not
              send marketing spam.
            </li>
            <li>
              <strong className="font-semibold text-primary">Support:</strong>{" "}
              If you contact us, we use the details you provide to locate your
              order and resolve your query.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            3. What We Will Never Do
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-primary">
            <li>We will never sell your data to third-party marketers.</li>
            <li>
              We will never send unsolicited marketing emails or SMS messages.
            </li>
            <li>
              We will never ask for sensitive personal information beyond what
              is required for delivery.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-[-0.025em] text-primary">
            4. Cookies & Device Memory
          </h2>

          <p className="mt-3">
            To enhance your experience, we use minimal, privacy-focused local
            storage on your device.
          </p>

          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              <strong className="font-semibold text-primary">
                Ghost Cart:
              </strong>{" "}
              We temporarily save checkout-form details on your device so you
              do not have to type them again if the page is accidentally
              closed. This information does not leave your device until you
              submit your order.
            </li>
            <li>
              <strong className="font-semibold text-primary">
                Order Tracking:
              </strong>{" "}
              After an order is placed, we save your Order ID on your device so
              you can track it more easily without searching through emails.
            </li>
          </ul>

          <p className="mt-4">
            You can clear this locally stored information at any time through
            your browser settings.
          </p>
        </section>
      </article>
    </div>
  );
}
