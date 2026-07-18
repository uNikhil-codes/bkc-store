import Link from 'next/link'

export default function CollectionRow({ collections }) {
  return (
    <div className="w-full py-4">
      {/* hide-scrollbar is from our globals.css */}
      <div className="flex w-full gap-3 overflow-x-auto hide-scrollbar px-4 pb-2">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            className="flex-shrink-0 relative overflow-hidden rounded-xl bg-border h-24 w-32 border border-border"
          >
            {collection.imageUrl && (
  <img
    src={collection.imageUrl}
    alt={collection.title}
    className="absolute inset-0 h-full w-full object-cover brightness-[0.70]"
  />
)}
            <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
              <span className="text-sm font-bold text-white tracking-tight drop-shadow-md">
                {collection.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
