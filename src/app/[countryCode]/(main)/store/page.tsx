import { Metadata } from "next";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import StoreTemplate from "@modules/store/templates";

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
};

interface StorePageParams {
  searchParams: {
    sortBy?: SortOptions;
    page?: string;
  };
  params: {
    countryCode: string;
  };
}

export default async function StorePage({ searchParams, params }: StorePageParams) {
  const sortBy: SortOptions | undefined = searchParams.sortBy; // Allow undefined
  const page = searchParams.page || "1";
  const { countryCode } = params;

  return (
    <StoreTemplate
      sortBy={sortBy} // Pass undefined or a valid SortOptions value
      page={page}
      countryCode={countryCode}
    />
  );
}

