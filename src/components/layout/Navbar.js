import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      {/* Changed to max-w-7xl and added md:px-8 for laptop padding */}
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto w-full">

        <Link href="/" className="font-bold text-xl md:text-2xl tracking-tight">
          BigKidFinds.
        </Link>

        <Link href="/search" className="p-2 -mr-2 text-primary transition-opacity hover:opacity-70" aria-label="Search">
          <Search size={24} strokeWidth={2} />
        </Link>

      </div>
    </header>
  )
}
