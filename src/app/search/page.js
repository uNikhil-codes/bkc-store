import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import SearchClientUI from './SearchClientUI'

export const revalidate = 10

export default async function SearchPage() {
  // Fetch ALL active products from your real Sanity database
  const rawProducts = await client.fetch(`*[_type == "product" && isActive == true] | order(_createdAt desc)`)

  const products = rawProducts.map(p => ({
    slug: p.slug?.current || '',
    title: p.title || 'Untitled',
    prepaidPrice: p.prepaidPrice || 0,
    codPrice: p.codPrice || 0,
    isCodAvailable: p.isCodAvailable || false,
    discountBadge: p.discountBadge || null,
    imageUrl: p.gallery?.length > 0 ? urlFor(p.gallery[0]).url() : ''
  }))

  // Pass them to the client UI
  return <SearchClientUI products={products} />
}
