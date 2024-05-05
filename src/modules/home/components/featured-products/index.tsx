import { Region } from "@medusajs/medusa";
import ProductRail from "@modules/home/components/featured-products/product-rail";
import { ProductCollectionWithPreviews } from "types/global";
import React from 'react'; // Ensure React is imported when using JSX

export default function FeaturedProducts({
  collections,
  region,
}: {
  collections: ProductCollectionWithPreviews[];
  region: Region;
}) {
  // Check if there are any collections to display
  if (collections.length === 0) {
    return <p>No products available.</p>; // Display a message if no products are available
  }

  return (
    <ul className="list-none p-0 m-0" aria-label="Featured products list"> {/* Adding an aria-label for the product list */}
      {collections.map((collection) => (
        <li key={collection.id} className="mb-6" aria-label={`Product category: ${collection.title}`}> {/* Adding descriptive aria-labels for each collection */}
          <ProductRail collection={collection} region={region} aria-label={`View details for ${collection.title}`} />
        </li>
      ))}
    </ul>
  );
}
