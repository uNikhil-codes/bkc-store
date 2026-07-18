"use client"
import { useState } from 'react'
import { Search, X, PackageSearch } from 'lucide-react'
import Link from 'next/link'
import ProductCard from '@/components/shared/ProductCard'

export default function SearchClientUI({ products }) {
  const [query, setQuery] = useState('')

  // Live filter logic (as-you-type) against REAL products
  const results = query.length > 0
    ? products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    : []

  // Get 4 random products to show if search fails
  const fallbackProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-surface">

      {/* Sticky Search Header */}
      <div className="sticky top-14 md:top-16 z-40 bg-surface border-b border-border px-4 py-4 md:px-8">
        <div className="relative max-w-2xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            autoFocus
            type="text"
            placeholder="Search for toys, gadgets, decor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 bg-[#F3F4F6] rounded-2xl pl-11 pr-10 text-sm font-bold text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
          {query.length > 0 && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1"
            >
              <X size={16} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 py-6 md:px-8 max-w-5xl mx-auto">

        {/* STATE 1: Typing but NO results found */}
        {query.length > 0 && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <div className="h-16 w-16 bg-[#F3F4F6] rounded-full flex items-center justify-center text-secondary mb-4">
              <PackageSearch size={28} />
            </div>
            <h2 className="text-xl font-bold tracking-tight mb-2">No results for "{query}"</h2>
            <p className="text-sm text-secondary font-medium mb-6 max-w-sm">
              We might not have this right now, but we can source it for you!
            </p>
            <Link
              href={`/request?item=${encodeURIComponent(query)}`}
              className="bg-primary text-surface px-6 py-3 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform mb-12"
            >
              Request this product
            </Link>

            {/* FALLBACK PRODUCTS - As you requested! */}
            <div className="w-full text-left">
              <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">Suggested Products</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
                {fallbackProducts.map(product => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STATE 2: Results found */}
        {query.length > 0 && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
            {results.map(product => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}

        {/* STATE 3: Empty State (Haven't typed yet) */}
        {query.length === 0 && (
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">All Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
              {products.map(product => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
