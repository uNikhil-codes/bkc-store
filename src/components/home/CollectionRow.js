import Link from "next/link";

export default function CollectionRow({ collections }) {
  return (
    <section className="rise rise-2 w-full pt-7 sm:pt-8" aria-label="Shop collections">
      <div className="mb-4 flex items-end justify-between px-4 md:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
            Collections
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em] text-primary">
            Shop by collection
          </h2>
        </div>
      </div>

      {/* Compact circle rail — the pattern shoppers already know */}
      <div className="hide-scrollbar flex w-full snap-x gap-4 overflow-x-auto px-4 pb-1 sm:gap-5 md:px-8">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/collections/${collection.slug}`}
            aria-label={`Browse ${collection.title}`}
            className="group pressable flex w-[70px] shrink-0 snap-start flex-col items-center gap-2 sm:w-[78px]"
          >
            <span className="flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full border border-black/[0.06] bg-surface sm:h-[78px] sm:w-[78px]">
              {collection.imageUrl ? (
                <img
                  src={collection.imageUrl}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              ) : (
                <span className="text-xl font-semibold tracking-[-0.03em] text-primary">
                  {collection.title.charAt(0)}
                </span>
              )}
            </span>
            <span className="line-clamp-2 w-full text-center text-[11px] font-medium leading-[1.25] text-primary">
              {collection.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
