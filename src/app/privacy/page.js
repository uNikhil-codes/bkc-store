import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="px-5 py-10 max-w-3xl mx-auto min-h-screen">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors mb-8">
        <ChevronLeft size={18} /> Back to store
      </Link>

      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Your Data, Respected</p>
      <h1 className="text-3xl font-black tracking-tight mb-6">Privacy Policy</h1>

      <p className="text-base font-medium text-secondary leading-relaxed mb-10">
        Your privacy is critically important to us. We believe in radical transparency and collect only the absolute minimum data required to run our store and deliver your order. This policy explains what we collect and why.
      </p>

      <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-primary/90">
        <h3 className="text-lg font-bold text-primary mt-8 mb-3">1. What We Collect</h3>
        <p className="font-medium mb-3">To successfully deliver your order, we collect the following essential information at checkout:</p>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-2">
          <li><strong>Contact Information:</strong> Your full name, email address, and mobile phone number.</li>
          <li><strong>Delivery Information:</strong> Your full shipping address, including house number, street, city, state, and PIN code.</li>
        </ul>
        <p className="font-medium mb-6">We do not collect, see, or store any of your payment information (like credit card numbers or UPI details). All payments are handled securely by our payment partners.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">2. How We Use Your Data</h3>
        <p className="font-medium mb-3">Your data has one purpose and one purpose only: to get your product to you.</p>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-2">
          <li><strong>Fulfillment:</strong> Your name, address, and phone number are shared securely and programmatically with our network of trusted fulfillment partners and courier services (such as Delhivery, Ecom Express, Shadowfax, or Meesho-backed logistics) for the sole purpose of dispatching and delivering your package.</li>
          <li><strong>Communications:</strong> Your email address is used to send you automated transactional emails: your order confirmation and shipping updates. We will never send you marketing spam.</li>
          <li><strong>Support:</strong> If you contact us with a query, we will use your provided details to look up your order and resolve your issue.</li>
        </ul>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">3. What We Will NEVER Do</h3>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-2">
          <li>We will never sell your data to third-party marketers.</li>
          <li>We will never send you unsolicited marketing emails or SMS messages.</li>
          <li>We will never ask for sensitive personal information beyond what is required for delivery.</li>
        </ul>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">4. Cookies & Device Memory</h3>
        <p className="font-medium mb-3">To enhance your experience, we use minimal, privacy-focused "localStorage" on your device.</p>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-2">
          <li><strong>Ghost Cart:</strong> We temporarily save your checkout form details on your device so if you accidentally close the page, you don't have to type everything again. This data never leaves your device until you submit the order.</li>
          <li><strong>Order Tracking:</strong> After you place an order, we save your Order ID on your device so you can easily track it later without having to search your emails.</li>
        </ul>
        <p className="font-medium text-secondary">You can clear this data at any time from your browser's settings.</p>
      </div>
    </div>
  )
}
