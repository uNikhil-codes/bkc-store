import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductCard from "@/components/shared/ProductCard";

export const revalidate = 10;

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const collectionQuery = `*[_type == "collection" && slug.current == $slug][0]`;
  const collection = await client.fetch(collectionQuery, { slug });

  if (!collection) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="max-w-md rounded-[24px] border border-border bg-surface px-6 py-10 text-center">
          <PackageSearch
            size={32}
            strokeWidth={1.7}
            className="mx-auto text-secondary"
          />
          <h1 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-primary">
            Collection not found
          </h1>
          <p className="mt-2 text-sm leading-6 text-secondary">
            This collection may have moved or is no longer available.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
          >
            Back to store
          </Link>
        </div>
      </div>
    );
  }

  const productsQuery = `*[_type == "product" && isActive == true && references($collectionId)] | order(_createdAt desc)`;
  const rawProducts = await client.fetch(productsQuery, {
    collectionId: collection._id,
  });

  const products = rawProducts.map((product) => ({
    slug: product.slug?.current || "",
    title: product.title || "Untitled",
    prepaidPrice: product.prepaidPrice || 0,
    codPrice: product.codPrice || 0,
    isCodAvailable: product.isCodAvailable || false,
    discountBadge: product.discountBadge || null,
    imageUrl:
      product.gallery?.length > 0 ? urlFor(product.gallery[0]).url() : "",
  }));

  return (
    <div className="min-h-screen bg-background px-4 py-9 pb-14 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-lg text-sm font-medium text-secondary transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back to store
        </Link>

        <header className="rise mt-8 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondary">
            Collection
          </p>
          <h1 className="mt-2 text-[34px] font-semibold leading-[1.08] tracking-[-0.055em] text-primary sm:text-5xl">
            {collection.title}
          </h1>
          {collection.shortDescription && (
            <p className="mt-3 text-sm leading-6 text-secondary sm:text-base">
              {collection.shortDescription}
            </p>
          )}
          <p className="mt-4 text-xs text-secondary">
            {products.length === 1
              ? "1 item available"
              : `${products.length} items available`}
          </p>
        </header>

        {products.length > 0 ? (
          <div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-[24px] border border-border bg-surface px-6 py-14 text-center">
            <PackageSearch
              size={32}
              strokeWidth={1.7}
              className="mx-auto text-secondary"
            />
            <h2 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-primary">
              New finds are on the way.
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-secondary">
              We’re currently curating products for this collection. Please
              check back soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
