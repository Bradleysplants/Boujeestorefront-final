import { Product } from "@medusajs/medusa";
import { Metadata } from "next";
import { getCollectionsList, getProductsList, getRegion } from "@lib/data";
import FeaturedProducts from "@modules/home/components/featured-products";
import Hero from "@modules/home/components/hero";
import { ProductCollectionWithPreviews } from "types/global";
import { cache } from "react";

export const metadata: Metadata = {
  title: "DeLisa's Boujee Botanical Store – Exclusive Plant Boutique",
  description: "Discover exclusive plants and accessories tailored for your home or office environment. Experience premium horticulture with our curated collections.",
};

const getCollectionsWithProducts = cache(
  async (countryCode: string): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3);

    if (!collections) {
      return null;
    }

    const collectionsWithProducts = await Promise.all(
      collections.map(async (collection) => {
        const productsResponse = await getProductsList({
          queryParams: { collection_id: [collection.id] },
          countryCode,
        });

        return {
          ...collection,
          products: productsResponse.response.products as Product[],
          onInit: () => {}, // Ensure 'onInit' is included if required
        } as ProductCollectionWithPreviews; // Explicitly cast to the desired type
      })
    );

    return collectionsWithProducts;
  }
);

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode);
  const region = await getRegion(countryCode);

  if (!collections || !region) {
    return <div className="text-pastel-pink">Error loading data. Please try again later.</div>;
  }

  return (
    <div className="bg-slate-gray min-h-screen">
      <Hero />
      <div className="container mx-auto py-12">
        <FeaturedProducts collections={collections} region={region} />
      </div>
    </div>
  );
}
