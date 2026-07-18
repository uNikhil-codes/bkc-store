import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">

        <p className="text-base md:text-lg font-bold tracking-tight mb-6">BigKidFinds.</p>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-secondary mb-8">
          <Link href="/track" className="hover:text-primary transition-colors">Track Order</Link>
          <Link href="/request" className="hover:text-primary transition-colors">Request a Product</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-secondary/60 mb-6">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="/shipping" className="hover:text-primary transition-colors">Shipping</Link>
          <Link href="/refund-policy" className="hover:text-primary transition-colors">Refunds</Link>
        </div>

        <p className="text-xs text-secondary/40">
          © {new Date().getFullYear()} BigKidFinds. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
