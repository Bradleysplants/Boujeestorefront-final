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
    return <p className="text-pastel-pink">Unable to fetch the products. Please try again later.</p>;  // User-friendly error message with pastel-pink text.
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
      <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 bg-slate-gray text-pastel-pink" aria-label="Product list" data-testid="products-list">
        {products.map((product) => (
          <li key={product.id} className="border-primary-green text-pastel-pink" aria-label={`Product ${product.title}`}>
            <ProductPreview productPreview={product} region={region} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          className="text-primary-green hover:text-pastel-pink"
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
          aria-label="Pagination for product list"
        />
      )}
    </>
  );
}
