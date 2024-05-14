import React from "react";
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing";
import { clx } from "@medusajs/ui";
import { getProductPrice } from "@lib/util/get-product-price";
import { RegionInfo } from "types/global";

export default function ProductInfo({
  product,
  variant,
  region,
}: {
  product: PricedProduct;
  variant?: PricedVariant;
  region: RegionInfo;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    region,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-slate-gray animate-pulse" aria-label="Loading price" />;
  }

  return (
    <div className="flex flex-col font-complementary-sans text-pastel-pink" aria-labelledby="product-title" role="article">
      {/* Render the product title */}
      <h1 id="product-title" className="text-4xl font-bold text-pastel-pink" aria-label="Product title">
        {product.title}
      </h1>
      
      {/* Render the product price */}
      <span
        className={clx("text-xl hover:text-primary-green", {
          "text-pastel-pink": selectedPrice.price_type === "sale",
        })}
        aria-label="Current price"
      >
        {!variant && "From "}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p className="text-pastel-pink" aria-label="Original price">
            <span>Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-primary-green" aria-label="Discount percentage">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  );
}