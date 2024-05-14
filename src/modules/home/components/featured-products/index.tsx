import React from 'react';
import { Region } from "@medusajs/medusa";
import ProductRail from "@modules/home/components/featured-products/product-rail";
import { ProductCollectionWithPreviews } from "types/global";

export default function FeaturedProducts({
  collections,
  region,
}: {
  collections: ProductCollectionWithPreviews[];
  region: Region;
}) {
  console.log("Collections in FeaturedProducts:", collections);
  console.log("Region in FeaturedProducts:", region);

  if (collections.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="bg-slate-gray">
      <ul className="list-none p-0 m-0" aria-label="Featured products list">
        {collections.map((collection) => (
          <li key={collection.id} className="mb-6" aria-label={`Product category: ${collection.title}`}>
            <ProductRail collection={collection} region={region} />
          </li>
        ))}
      </ul>
    </div>
  );
}