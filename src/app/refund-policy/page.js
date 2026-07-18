import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function RefundPage() {
  return (
    <div className="px-5 py-10 max-w-3xl mx-auto min-h-screen">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors mb-8">
        <ChevronLeft size={18} /> Back to store
      </Link>

      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Fair & Transparent</p>
      <h1 className="text-3xl font-black tracking-tight mb-6">Refund & Issue Policy</h1>

      <p className="text-base font-medium text-secondary leading-relaxed mb-10">
        We want every order to feel right. Our products are curated for quality, and we stand behind them. To protect both you, our valued customer, and our small business from fraud, we have a strict, clear, and transparent policy for handling issues.
      </p>

      <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-primary/90">
        <h3 className="text-lg font-bold text-primary mt-8 mb-3">1. When Claims Are Accepted (Our Promise)</h3>
        <p className="font-medium mb-3">We will provide a full refund or a free replacement under the following conditions only:</p>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-3">
          <li><strong>Wrong Item Received:</strong> The product that arrived is not the product you ordered. <br/><span className="text-red-600 font-bold">BUT MANDATORY RECORDING OF UNBOXING OF FULL PRODUCT IS REQUIRED WITH SHOWING LABEL CLEARLY FIRST BEFORE OPENING.</span></li>
          <li><strong>Item Unavailable Post-Payment:</strong> You prepaid for an item, but it became out of stock before we could dispatch it. In this rare case, we will proactively contact you and issue an instant full refund.</li>
        </ul>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">2. The Unboxing Video (Your Responsibility & Protection)</h3>
        <p className="font-medium mb-3">This is the most important part of our policy. No exceptions will be made.</p>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-3">
          <li>The video must start before you open the outer package and clearly show the shipping label is intact while recording. <span className="text-red-600 font-bold">MANDATORY RECORDING OF UNBOXING OF FULL PRODUCT IS REQUIRED WITH SHOWING LABEL CLEARLY FIRST BEFORE OPENING.</span></li>
          <li>The video must continue without any cuts or edits, showing you opening the package and revealing the product for the first time.</li>
        </ul>
        <p className="font-medium mb-6">This policy is in place to protect against fraudulent claims and allows us to quickly process legitimate issues with our fulfillment partners. Without a valid unboxing video, your claim will be rejected.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">3. What Is Not Covered?</h3>
        <p className="font-medium mb-3">We do not accept returns or refunds for the following reasons:</p>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-2">
          <li>"Change of mind" or if you simply do not like the product. Please order thoughtfully.</li>
          <li>Slight variations in color or texture. The products are shot under professional lighting, and slight differences can occur depending on your screen.</li>
          <li>Claims submitted more than 48 hours after the delivery date recorded by the courier.</li>
        </ul>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">4. How to Raise a Claim</h3>
        <p className="font-medium mb-6">If your issue meets our criteria, please send a DM to our Instagram (@bkc.finds) or use our Contact page within 48 hours of delivery. Include your Order ID, and we will guide you on how to email us your unboxing video. Once verified, we resolve all claims within 5-7 business days.</p>
      </div>
    </div>
  )
}
