import Link from 'next/link'
import { Search, Package } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto w-full">

        <Link href="/" className="font-bold text-xl md:text-2xl tracking-tight">
          BigKidFinds.
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/track" className="p-2 text-secondary hover:text-primary transition-colors" aria-label="Track Order">
            <Package size={22} strokeWidth={2} />
          </Link>
          <Link href="/search" className="p-2 -mr-2 text-primary transition-opacity hover:opacity-70" aria-label="Search">
            <Search size={24} strokeWidth={2} />
          </Link>
        </div>

      </div>
    </header>
  )
}
