import React from 'react';
import { Region } from "@medusajs/medusa";
import { Text } from "@medusajs/ui";

import InteractiveLink from "@modules/common/components/interactive-link";
import ProductPreview from "@modules/products/components/product-preview";
import { ProductCollectionWithPreviews } from "types/global";

export default function ProductRail({
  collection,
  region,
}: {
  collection: ProductCollectionWithPreviews;
  region: Region;
}) {
  const { products } = collection;

  if (!products || products.length === 0) {
    console.log("No products available for:", collection.title);
    return <Text className="text-2xl font-semibold text-slate-gray">No products available.</Text>;
  }

  return (
    <div className="content-container py-12 sm:py-24">
      <div className="flex justify-between items-center mb-8">
        <Text className="text-2xl font-semibold text-slate-gray">{collection.title}</Text>
        <InteractiveLink 
          href={`/collections/${collection.handle}`}
          className="text-primary-green hover:text-pastel-pink"
          aria-label={`View all products in ${collection.title}`}
        >
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-24 sm:gap-y-36">
        {products.map((product) => (
          <li key={product.id}>
            <ProductPreview
              productPreview={product}
              region={region}
              isFeatured
              aria-label={`Preview of ${product.title || 'product'}`} // Fallback if name is not defined
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
