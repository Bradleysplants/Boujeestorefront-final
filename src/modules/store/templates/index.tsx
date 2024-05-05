import { Suspense } from "react";

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid";
import RefinementList from "@modules/store/components/refinement-list";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

import PaginatedProducts from "./paginated-products";

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions;
  page?: string;
  countryCode: string;
}) => {
  const pageNumber = page ? parseInt(page) : 1;

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container bg-slate-gray" data-testid="category-container" aria-label="Store Product List">
      <RefinementList sortBy={sortBy || "created_at"} aria-label="Product Sorting Options" />
      <div className="w-full" aria-label="Product Display Area">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title" className="text-pastel-pink" aria-label="Page Title: All Products">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid aria-label="Loading Products" />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
            aria-label="Products Pagination"
          />
        </Suspense>
      </div>
    </div>
  );
};

export default StoreTemplate;
