import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="px-5 py-10 max-w-3xl mx-auto min-h-screen">
      <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors mb-8">
        <ChevronLeft size={18} /> Back to store
      </Link>

      <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Fast & Reliable</p>
      <h1 className="text-3xl font-black tracking-tight mb-6">Shipping & Delivery</h1>

      <div className="bg-[#F3F4F6] border border-border rounded-2xl p-5 mb-8">
        <p className="text-sm font-bold text-primary leading-relaxed">
          REMEMBER, WE DON'T HAVE OUR OWN PRODUCTS, WE JUST CURATE THE PRODUCTS. THEREFORE WHILE DELIVERY TIME YOU MAY GET A CALL FROM DELIVERY PARTNERS OF MEESHO, AMAZON, FLIPKART OR ANY OTHER WEBSITE. Our mission is to get your curated find into your hands as quickly and reliably as possible. We ship free of charge, all across India as we need to pay for shipment too.
        </p>
      </div>

      <div className="prose prose-sm md:prose-base prose-neutral max-w-none text-primary/90">
        <h3 className="text-lg font-bold text-primary mt-8 mb-3">1. Our 24-Hour Dispatch Rule</h3>
        <p className="font-medium mb-6">We are not a mega-corporation with slow processing times. We are a fast-moving studio. Our internal target is to process and dispatch every single order within 24 hours of confirmation. Orders placed before 11 AM IST are typically dispatched the very same day.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">2. Our Fulfillment Network</h3>
        <p className="font-medium mb-3">To provide a seamless delivery experience across all pin codes in India, we work with a hybrid network of trusted partners. Depending on your location and the product's warehouse, your order will be shipped via:</p>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-3">
          <li><strong>Important note:</strong> REMEMBER, WE DON'T HAVE OUR OWN PRODUCTS, WE JUST CURATE THE PRODUCTS. THEREFORE WHILE DELIVERY TIME YOU MAY GET A CALL FROM DELIVERY PARTNERS OF MEESHO, AMAZON, FLIPKART OR ANY OTHER WEBSITE. Our mission is to get your curated find into your hands as quickly and reliably as possible.</li>
          <li><strong>Courier Partners may include:</strong> Delhivery, Ecom Express, Shadowfax, Meesho partners, Amazon partners and many more. Kindly don't raise complaints regarding getting different calls from delivery partners.</li>
          <li><strong>Curated Supplier Networks:</strong> Including the robust and reliable Meesho fulfillment network, ensuring deep reach into Tier-2 and Tier-3 cities.</li>
        </ul>
        <p className="font-medium mb-6">Your checkout details are shared securely and only with the partner responsible for delivering your specific order.</p>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">3. Estimated Delivery Timelines</h3>
        <ul className="font-medium list-disc pl-5 mb-6 space-y-2">
          <li><strong>Metro & Tier-1 Cities:</strong> 3-5 Business Days after dispatch.</li>
          <li><strong>Rest of India:</strong> 5-7 Business Days after dispatch.</li>
          <li><strong>Note:</strong> Remote pin codes may occasionally take longer.</li>
        </ul>

        <h3 className="text-lg font-bold text-primary mt-8 mb-3">4. Live, On-Site Tracking</h3>
        <p className="font-medium mb-6">You do not need to hunt for tracking links or visit third-party courier websites. Simply use our on-site Track Order page. Enter the Order ID from your confirmation email and the phone number you used at checkout to see a live, visual timeline of your order's journey.</p>
      </div>
    </div>
  )
}
