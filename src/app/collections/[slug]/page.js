import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import ProductCard from '@/components/shared/ProductCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export const revalidate = 10

export default async function CollectionPage({ params }) {
  const { slug } = await params

  // 1. Fetch the Collection details
  const collectionQuery = `*[_type == "collection" && slug.current == $slug][0]`
  const collection = await client.fetch(collectionQuery, { slug })

  if (!collection) {
    return <div className="text-center py-20 font-bold text-xl">Collection not found</div>
  }

  // 2. FIXED QUERY: Fetch all active products that reference this Collection
  const productsQuery = `*[_type == "product" && isActive == true && references($collectionId)] | order(_createdAt desc)`
  const rawProducts = await client.fetch(productsQuery, { collectionId: collection._id })

  const products = rawProducts.map(p => ({
    slug: p.slug?.current || '',
    title: p.title || 'Untitled',
    prepaidPrice: p.prepaidPrice || 0,
    codPrice: p.codPrice || 0,
    isCodAvailable: p.isCodAvailable || false,
    discountBadge: p.discountBadge || null,
    imageUrl: p.gallery?.length > 0 ? urlFor(p.gallery[0]).url() : ''
  }))

  return (
    <div className="min-h-screen bg-surface px-4 md:px-8 py-6">

      {/* Back Button & Title */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors mb-6">
          <ChevronLeft size={18} />
          Back to Home
        </Link>
        <h1 className="text-3xl font-black tracking-tight text-primary">
          {collection.title}
        </h1>
        {collection.shortDescription && (
          <p className="text-sm font-medium text-secondary mt-2">
            {collection.shortDescription}
          </p>
        )}
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-6 md:gap-y-10 pb-16">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-[#F3F4F6] rounded-3xl border border-border">
          <h3 className="text-lg font-bold text-primary mb-2">No products yet!</h3>
          <p className="text-sm text-secondary font-medium">
            We are curating new items for this collection. Check back soon.
          </p>
        </div>
      )}

    </div>
  )
}
