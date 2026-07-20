import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import CollectionRow from "@/components/home/CollectionRow";
import HomeSearch from "@/components/home/HomeSearch";
import ProductCard from "@/components/shared/ProductCard";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 10;

const trustLine = [
  "Hand-checked curation",
  "Razorpay-secured checkout",
  "COD on most items",
  "Live delivery tracking",
];

export default async function Home() {
  const rawProducts = await client.fetch(
    `*[_type == "product" && isActive == true] | order(_createdAt desc)[0...8]`
  );
  // Every collection WITH its own newest drops embedded — one query
  const rawCollections = await client.fetch(
    `*[_type == "collection"]{
      _id,
      title,
      "slug": slug.current,
      image,
      "products": *[_type == "product" && isActive == true && collection._ref == ^._id]
        | order(_createdAt desc)[0...6]{
          _id,
          title,
          "slug": slug.current,
          prepaidPrice,
          codPrice,
          isCodAvailable,
          discountBadge,
          gallery
        }
    }`
  );

  const toCard = (p) => ({
    // store-wide query returns slug as an object ({ current: "..." }),
    // the per-collection subquery projects it to a plain string — accept both
    slug: typeof p.slug === "string" ? p.slug : p.slug?.current || "",
    title: p.title || "Untitled",
    prepaidPrice: p.prepaidPrice || 0,
    codPrice: p.codPrice || 0,
    isCodAvailable: p.isCodAvailable || false,
    discountBadge: p.discountBadge || null,
    imageUrl: p.gallery?.length > 0 ? urlFor(p.gallery[0]).url() : "",
  });

  const products = rawProducts.map(toCard);

  const collections = rawCollections.map((c) => ({
    slug: c.slug || "",
    title: c.title || "Untitled",
    imageUrl: c.image ? urlFor(c.image).url() : "",
  }));

  const collectionSections = rawCollections
    .map((c) => ({
      id: c._id,
      slug: c.slug || "",
      title: c.title || "Untitled",
      products: (c.products || []).map(toCard),
    }))
    .filter((c) => c.slug && c.products.length > 0);

  return (
    <div className="min-h-screen pb-12 sm:pb-16">
      {/* HERO — one promise, one action, nothing else */}
      <section className="rise px-4 pt-9 sm:pt-12 md:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.13em] text-secondary">
            Curated finds · Shipped across India
          </p>
          <h1 className="mt-3 max-w-2xl text-[38px] font-semibold leading-[1.07] tracking-[-0.055em] text-primary sm:text-5xl">
            The find you’ll be glad you found.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-6 text-secondary sm:text-base">
            Curated products. Transparent prices. Cash on Delivery on most
            items.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="#new"
              className="pressable inline-flex h-13 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              Shop new arrivals
              <ArrowRight size={17} strokeWidth={2.2} />
            </Link>
            <Link
              href="/track"
              className="pressable inline-flex h-13 items-center justify-center rounded-full border border-border bg-surface px-6 text-[15px] font-medium text-primary transition-colors hover:border-[#a1a1a6]"
            >
              Track order
            </Link>
          </div>
        </div>

        <HomeSearch />
      </section>

      {collections.length > 0 && <CollectionRow collections={collections} />}

      {/* NEW ARRIVALS */}
      <section id="new" className="rise rise-2 scroll-mt-24 px-4 pt-9 md:px-8 md:pt-12">
        <div className="mb-5 flex items-end justify-between sm:mb-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
              New arrivals
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl">
              Just dropped
            </h2>
          </div>
          <Link
            href="/search"
            className="hidden items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-65 sm:inline-flex"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-border bg-surface px-6 py-12 text-center">
            <p className="text-base font-medium text-primary">No products yet.</p>
            <p className="mt-1 text-sm text-secondary">
              Add your first product in Sanity Studio.
            </p>
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link
            href="/search"
            className="pressable flex h-13 items-center justify-center gap-2 rounded-full border border-border bg-surface text-sm font-medium text-primary"
          >
            Browse everything <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* FRESH DROPS PER COLLECTION */}
      {collectionSections.map((collection) => (
        <section
          key={collection.id}
          id={`c-${collection.slug}`}
          className="rise rise-3 scroll-mt-24 pt-9 md:pt-12"
        >
          <div className="mb-4 flex items-end justify-between px-4 md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
                Fresh in {collection.title}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl">
                {collection.title}
              </h2>
            </div>
            <Link
              href={`/collections/${collection.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-opacity hover:opacity-65"
            >
              View all <ArrowRight size={15} />
            </Link>
          </div>

          <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 md:px-8">
            {collection.products.map((product) => (
              <div
                key={product.slug}
                className="w-[158px] shrink-0 snap-start sm:w-[176px]"
              >
                <ProductCard product={product} />
              </div>
            ))}

            <Link
              href={`/collections/${collection.slug}`}
              aria-label={`View everything in ${collection.title}`}
              className="pressable flex w-[116px] shrink-0 snap-start items-center justify-center rounded-[22px] border border-dashed border-border bg-surface/60 text-center transition-colors hover:border-[#a1a1a6] sm:w-[124px]"
            >
              <span className="px-3">
                <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-primary">
                  <ArrowRight size={16} strokeWidth={2.2} />
                </span>
                <span className="mt-2 block text-xs font-semibold leading-4 text-primary">
                  View all {collection.title}
                </span>
              </span>
            </Link>
          </div>
        </section>
      ))}

      {/* TRUST — one quiet line, nothing more */}
      <section className="rise rise-4 px-4 pt-10 md:px-8 md:pt-12">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {trustLine.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 text-xs text-secondary"
            >
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* REQUEST — a single quiet invitation */}
      <section className="rise rise-5 px-4 pt-6 md:px-8">
        <Link
          href="/request"
          className="group pressable flex items-center gap-4 rounded-[22px] border border-border bg-surface px-5 py-4 transition-colors hover:border-[#a1a1a6] sm:px-6"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-2 text-primary">
            <Sparkles size={18} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold tracking-[-0.015em] text-primary">
              Can’t find what you’re looking for?
            </span>
            <span className="mt-0.5 block text-xs leading-5 text-secondary">
              Tell us — if we can source it well, we’ll list it for you.
            </span>
          </span>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-secondary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
          />
        </Link>
      </section>
    </div>
  );
}
