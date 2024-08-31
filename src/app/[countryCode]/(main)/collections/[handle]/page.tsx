import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCollectionByHandle,
  getCollectionsList,
  listRegions,
} from "@lib/data";
import CollectionTemplate from "@modules/collections/templates";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

type Props = {
  params: { handle: string; countryCode: string };
  searchParams: {
    page?: string;
    sortBy?: SortOptions;
  };
};

export const PRODUCT_LIMIT = 12;

export async function generateStaticParams() {
  const collections = await getCollectionsList();

  if (!collections?.collections) {
    return [];
  }

  const countryCodes = await listRegions().then((regions) =>
    regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  );

  if (!countryCodes) {
    return [];
  }

  const collectionHandles = collections.collections.map((collection) => collection.handle);

  return countryCodes
    .map((countryCode) =>
      collectionHandles.map((handle) => ({
        countryCode,
        handle,
      }))
    )
    .flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  return {
    title: `${collection.title} | Delisa's Boujee Botanical Store`,
    description: `${collection.title} collection`,
  };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { sortBy, page } = searchParams;

  const collection = await getCollectionByHandle(params.handle);

  if (!collection) {
    notFound();
  }

  return (
    <CollectionTemplate
      collection={collection}
      page={page}
      sortBy={sortBy}
      countryCode={params.countryCode}
    />
  );
}
