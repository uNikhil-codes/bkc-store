import Link from 'next/link'
import { ChevronLeft, Mail, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="px-5 py-8 max-w-2xl mx-auto min-h-screen">

      <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors mb-8">
        <ChevronLeft size={18} />
        Back to store
      </Link>

      <h1 className="text-3xl font-black tracking-tight mb-2">Get in touch.</h1>
      <p className="text-sm text-secondary font-medium mb-10">
        Have a question about your order or want to suggest a product? We are here to help.
      </p>

      <div className="flex flex-col gap-4">

        {/* Email Support */}
        <a
          href="mailto:support@bigkidfinds.online"
          className="flex items-center p-5 bg-[#F3F4F6] rounded-3xl border border-border hover:border-primary transition-colors group"
        >
          <div className="h-12 w-12 bg-surface rounded-full flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform">
            <Mail size={20} />
          </div>
          <div className="ml-4">
            <h3 className="text-base font-bold text-primary">Email Support</h3>
            <p className="text-sm font-medium text-secondary">support@bigkidfinds.online</p>
          </div>
        </a>

        {/* Store Instagram */}
        <a
          href="https://instagram.com/bkc.finds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-5 bg-[#F3F4F6] rounded-3xl border border-border hover:border-primary transition-colors group"
        >
          <div className="h-12 w-12 bg-surface rounded-full flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform">
            {/* Native SVG for Instagram to avoid library errors */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-base font-bold text-primary">Instagram</h3>
            <p className="text-sm font-medium text-secondary">@bkc.finds</p>
          </div>
        </a>

        {/* Business / Collab Instagram */}
        <a
          href="https://instagram.com/bkc.finds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-5 bg-[#F3F4F6] rounded-3xl border border-border hover:border-primary transition-colors group"
        >
          <div className="h-12 w-12 bg-surface rounded-full flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-110 transition-transform">
            <MessageCircle size={20} />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-base font-bold text-primary">Business & Collabs</h3>
            <p className="text-sm font-medium text-secondary">DM us for partnerships</p>
          </div>
        </a>

      </div>

      <p className="text-xs text-secondary/60 font-medium text-center mt-12">
        We typically reply within 24 hours.
      </p>
    </div>
  )
}
