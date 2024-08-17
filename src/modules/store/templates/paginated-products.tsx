import { getProductsListWithSort, getRegion } from "@lib/data";
import ProductPreview from "@modules/products/components/product-preview";
import { Pagination } from "@modules/store/components/pagination";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
};

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions;
  page: number;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
  countryCode: string;
}) {
  const region = await getRegion(countryCode);

  if (!region) {
    return <p className="text-pastel-pink">Unable to fetch the products. Please try again later.</p>; 
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  if (collectionId) {
    queryParams.collection_id = [collectionId];
  }

  if (categoryId) {
    queryParams.category_id = [categoryId];
  }

  if (productsIds) {
    queryParams.id = productsIds;
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  });

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden mx-auto"> {/* Constrain and center */}
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full bg-slate-gray text-pastel-pink"
          aria-label="Product list"
          data-testid="products-list"
        >
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-center items-center w-full max-w-full"
              aria-label={`Product ${product.title}`}
            >
              <ProductPreview
                productPreview={product}
                region={region}
                className="w-full max-w-full h-auto"  // Ensure no overflow
              />
            </li>
          ))}
        </ul>
      </div>
      {totalPages > 1 && (
        <Pagination
          className="text-primary-green hover:text-pastel-pink mt-8"
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
          aria-label="Pagination for product list"
        />
      )}
    </>
  );
}

