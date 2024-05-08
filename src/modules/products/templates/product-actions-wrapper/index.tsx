import { retrievePricedProductById } from "@lib/data";
import { Region } from "@medusajs/medusa";
import ProductActions from "@modules/products/components/product-actions";

/**
 * Fetches real-time pricing for a product and renders the product actions component with optional external styling.
 * Ensures the background is consistently slate gray.
 */
export default async function ProductActionsWrapper({
  id,
  region,
  className // Added className to props
}: {
  id: string;
  region: Region;
  className?: string; // Declare className as an optional string
}) {
  const product = await retrievePricedProductById({ id, regionId: region.id });

  if (!product) {
    return null;
  }

  // Apply className to ProductActions if needed or to a wrapping element, ensuring background is slate gray
  const wrapperClass = `bg-slate-gray ${className || ''}`; // Ensures background color is set

  return (
    <div className={wrapperClass}>
      <ProductActions product={product} region={region} />
    </div>
  );
}