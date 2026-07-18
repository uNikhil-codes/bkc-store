import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="px-5 py-8 max-w-2xl mx-auto min-h-screen">

      <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors mb-8">
        <ChevronLeft size={18} />
        Back to store
      </Link>

      <h1 className="text-3xl font-black tracking-tight mb-2">Terms & Conditions</h1>
      <p className="text-sm text-secondary font-medium mb-10">Last updated: October 2024</p>

      {/* Content formatting wrapper */}
      <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-primary/80">

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">1. Introduction</h3>
        <p className="mb-4 leading-relaxed font-medium">
          Welcome to BigKidFinds. By accessing our website and placing an order, you agree to be bound by these Terms and Conditions. We curate premium products and fulfill them through verified third-party partners.
        </p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">2. Fulfillment & Packaging</h3>
        <p className="mb-4 leading-relaxed font-medium">
          To ensure the fastest delivery times and best prices, BigKidFinds utilizes third-party logistics networks. This means your order may arrive in packaging branded by our partners (such as Amazon or Meesho). This is normal and ensures the safety of your product.
        </p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">3. Pricing & Cash on Delivery</h3>
        <p className="mb-4 leading-relaxed font-medium">
          All prepaid orders enjoy priority dispatch. Orders placed using Cash on Delivery (COD) are subject to an additional non-refundable convenience fee to cover risk and manual collection costs by our logistics partners.
        </p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">4. Returns & Refunds</h3>
        <p className="mb-4 leading-relaxed font-medium">
          Because of the viral nature of our products, we only accept returns in the case of damaged or incorrect items. Unboxing videos are required to process damage claims. "Change of mind" returns are not accepted.
        </p>

      </div>
    </div>
  )
}
