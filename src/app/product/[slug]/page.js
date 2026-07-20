import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductClientUI from "./ProductClientUI";

export const revalidate = 10;

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const rawProduct = await client.fetch(query, { slug });

  if (!rawProduct) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-[24px] border border-border bg-surface px-6 py-10 text-center">
          <PackageSearch
            size={32}
            strokeWidth={1.7}
            className="mx-auto text-secondary"
          />
          <h1 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-primary">
            Product not found
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-secondary">
            This item may have sold out or been removed. Browse what is
            currently available instead.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              Back to the store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const product = {
    slug: rawProduct.slug.current,
    title: rawProduct.title,
    prepaidPrice: rawProduct.prepaidPrice,
    codPrice: rawProduct.codPrice || rawProduct.prepaidPrice,
    isCodAvailable: rawProduct.isCodAvailable,
    discountBadge: rawProduct.discountBadge,
    tagline: rawProduct.tagline,
    deliveryEstimate: rawProduct.deliveryEstimate || "5-7 Days",
    highlights: rawProduct.highlights || [],
    gallery: rawProduct.gallery
      ? rawProduct.gallery.map((img) => urlFor(img).url())
      : [],
  };

  return <ProductClientUI product={product} />;
}
