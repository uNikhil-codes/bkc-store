import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="px-5 py-10 max-w-3xl mx-auto min-h-screen">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors mb-8">
        <ChevronLeft size={18} /> Back to store
      </Link>

      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">The Fine Print, Made Clear</p>
      <h1 className="text-3xl font-black tracking-tight mb-6">Terms of Service</h1>

      <p className="text-base font-medium text-secondary leading-relaxed mb-10">
        Welcome to BigKidFinds. By browsing our site and placing an order, you agree to the terms below. We have kept them short and simple because we believe in clarity.
      </p>

      <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-primary/90">
        <h3 className="text-lg font-bold text-primary mt-8 mb-3">1. Our Business Model</h3>
        <p className="font-medium mb-6">BigKidFinds is a curated e-commerce marketplace. We are not the manufacturer of the products. We source unique, high-quality items from a network of domestic and international suppliers, makers, and fulfillment platforms.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">2. Order Acceptance</h3>
        <p className="font-medium mb-6">Your placement of an order does not constitute our acceptance of that order. We reserve the right to accept, decline, or cancel your order for any reason. Common reasons for cancellation include (but are not limited to): the item becoming unavailable, a clear pricing error on the website, or if our fraud-detection system flags the order as suspicious. If we cancel an order you have already paid for, we will issue an immediate and full refund.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">3. Payment</h3>
        <p className="font-medium mb-6">All prices are listed in Indian Rupees (INR). Prices are subject to change without notice. We offer Prepaid (UPI) and Cash on Delivery (COD) payment methods. COD is available only on select products and pin codes, at our discretion.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">4. User Conduct</h3>
        <p className="font-medium mb-6">You agree not to copy, reproduce, or resell any part of our website's design, photography, or written copy. Our brand and its assets are our intellectual property.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">5. Governing Law</h3>
        <p className="font-medium mb-6">By using our service, you agree that any disputes will be governed by the laws of India.</p>

        <hr className="border-border my-8" />
        <p className="font-medium text-secondary">For more specific rules, please refer to our dedicated Privacy, Refund, and Shipping policies.</p>
      </div>
    </div>
  )
}
