import Link from 'next/link'

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#F3F4F6] border border-border">
        {product.discountBadge && (
          <div className="absolute top-2 left-2 z-10 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-surface uppercase tracking-wider">
            {product.discountBadge}
          </div>
        )}
        {/* CHANGED: object-contain instead of object-cover */}
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col px-1">
        <h3 className="text-sm font-medium leading-tight line-clamp-1">{product.title}</h3>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold">₹{product.prepaidPrice}</span>
          {product.isCodAvailable && (
            <span className="text-[10px] font-medium text-secondary bg-border/50 px-1.5 py-0.5 rounded-md">
              COD Available
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
