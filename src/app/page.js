import { Search } from 'lucide-react'
import Link from 'next/link'
import CollectionRow from '@/components/home/CollectionRow'
import ProductCard from '@/components/shared/ProductCard'

// FIXED: Changed urlForImage to urlFor
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 10

export default async function Home() {
  const rawProducts = await client.fetch(`*[_type == "product" && isActive == true] | order(_createdAt desc)`)
  const rawCollections = await client.fetch(`*[_type == "collection"]`)

  const products = rawProducts.map(p => ({
    slug: p.slug?.current || '',
    title: p.title || 'Untitled',
    prepaidPrice: p.prepaidPrice || 0,
    codPrice: p.codPrice || 0,
    isCodAvailable: p.isCodAvailable || false,
    discountBadge: p.discountBadge || null,
    // FIXED here too
    imageUrl: p.gallery?.length > 0 ? urlFor(p.gallery[0]).url() : ''
  }))

  const collections = rawCollections.map(c => ({
    slug: c.slug?.current || '',
    title: c.title || 'Untitled',
    // FIXED here too
    imageUrl: c.image ? urlFor(c.image).url() : ''
  }))

  return (
    <div className="pb-10 min-h-screen">
      <div className="px-4 md:px-8 pt-6 pb-2">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Things you didn't know you needed.
        </h1>
        <p className="text-sm text-secondary">Premium aesthetic finds, delivered.</p>
      </div>

      <div className="px-4 md:px-8 py-3">
        <Link href="/search" className="flex items-center gap-3 w-full bg-[#F3F4F6] border border-border rounded-xl px-4 py-3 text-secondary transition-opacity hover:opacity-80">
          <Search size={18} />
          <span className="text-sm font-medium">Search for products...</span>
        </Link>
      </div>

      {collections.length > 0 && <CollectionRow collections={collections} />}

      <div className="px-4 md:px-8 pt-6 md:pt-10">
        <h2 className="text-lg md:text-2xl font-bold tracking-tight mb-4 md:mb-6">Just Dropped</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-6 md:gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-secondary font-medium bg-[#F3F4F6] rounded-2xl mx-4">
            No products found. Add your first product in Sanity Studio!
          </div>
        )}
      </div>
    </div>
  )
}
