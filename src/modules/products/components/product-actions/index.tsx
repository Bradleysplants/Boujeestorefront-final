"use client";
import { Region } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import { Button } from "@medusajs/ui";
import { isEqual } from "lodash";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { useIntersection } from "@lib/hooks/use-in-view";
import { addToCart } from "@modules/cart/actions";
import Divider from "@modules/common/components/divider";
import OptionSelect from "@modules/products/components/option-select";

import MobileActions from "../mobile-actions";
import ProductPrice from "../product-price";

export type PriceType = {
  calculated_price: string;
  original_price?: string;
  price_type?: "sale" | "default";
  percentage_diff?: string;
};

type ProductActionsProps = {
  product: PricedProduct;
  region: Region;
  disabled?: boolean;
  className?: string;
};

export default function ProductActions({
  product,
  region,
  disabled,
  className,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);

  const countryCode = useParams().countryCode as string;

  const variants = product.variants;

  useEffect(() => {
    const optionObj: Record<string, string> = {};
    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined });
    }
    setOptions(optionObj);
  }, [product]);

  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};
    for (const variant of variants) {
      if (!variant.options || !variant.id) continue;
      const temp: Record<string, string> = {};
      for (const option of variant.options) {
        temp[option.option_id] = option.value;
      }
      map[variant.id] = temp;
    }
    return map;
  }, [variants]);

  const variant = useMemo(() => {
    let variantId: string | undefined = undefined;
    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key;
      }
    }
    return variants.find((v) => v.id === variantId);
  }, [options, variantRecord, variants]);

  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id]);
    }
  }, [variants, variantRecord]);

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update });
  };

  const inStock = useMemo(() => {
    if (variant && !variant.manage_inventory) {
      return true;
    }
    if (variant && variant.allow_backorder) {
      return true;
    }
    if (variant?.inventory_quantity && variant.inventory_quantity > 0) {
      return true;
    }
    return false;
  }, [variant]);

  const actionsRef = useRef<HTMLDivElement>(null);
  const inView = useIntersection(actionsRef, "0px");

  const handleAddToCart = async () => {
    if (!variant?.id) return null;
    setIsAdding(true);
    await addToCart({
      variantId: variant.id,
      quantity: 1,
      countryCode,
    });
    setIsAdding(false);
  };

  return (
    <>
      <div className={`flex flex-col gap-y-2 ${className}`} ref={actionsRef}>
        <div>
          {product.variants.length > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => (
                <div key={option.id}>
                  <OptionSelect
                    option={option}
                    current={options[option.id]}
                    updateOption={updateOptions}
                    title={option.title}
                    data-testid="product-options"
                    disabled={!!disabled || isAdding}
                  />
                </div>
              ))}
              <Divider />
            </div>
          )}
        </div>
        <ProductPrice product={product} variant={variant} region={region} />
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !variant || !!disabled || isAdding}
          variant="primary"
          className="w-full h-10 bg-black border-2 border-pastel-pink text-pastel-pink font-bold"
          isLoading={isAdding}
          data-testid="add-product-button"
          style={{
            backgroundColor: "black",
            borderColor: "#FFC5E1", // Assuming this is your pastel-pink color
            color: "#FFC5E1", // Pastel-pink text color
            fontWeight: "bold",
          }}
        >
          {!variant ? "Select variant" : !inStock ? "Out of stock" : "Add to cart"}
        </Button>
        <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  );
}
