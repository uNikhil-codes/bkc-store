// FIXED: Changed urlForImage to urlFor
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import ProductClientUI from './ProductClientUI'

export const revalidate = 10

export default async function ProductPage({ params }) {
  const { slug } = await params

  const query = `*[_type == "product" && slug.current == $slug][0]`
  const rawProduct = await client.fetch(query, { slug })

  if (!rawProduct) {
    return <div className="text-center py-20 font-bold text-xl">Product not found 🔍</div>
  }

  const product = {
    slug: rawProduct.slug.current,
    title: rawProduct.title,
    originalPrice: rawProduct.prepaidPrice + Math.floor(rawProduct.prepaidPrice * 0.4),
    prepaidPrice: rawProduct.prepaidPrice,
    codPrice: rawProduct.codPrice || rawProduct.prepaidPrice,
    isCodAvailable: rawProduct.isCodAvailable,
    discountBadge: rawProduct.discountBadge,
    tagline: rawProduct.tagline,
    deliveryEstimate: rawProduct.deliveryEstimate || '5-7 Days',
    highlights: rawProduct.highlights || [],
    // FIXED here too
    gallery: rawProduct.gallery ? rawProduct.gallery.map(img => urlFor(img).url()) : []
  }

  return <ProductClientUI product={product} />
}
