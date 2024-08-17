import { Text } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "@modules/products/components/thumbnail";
import PreviewPrice from "./price";
import { PriceType } from "../product-actions"; // Ensure correct path to PriceType

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
  className,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
  className?: string;
}) {
  if (!productPreview || !productPreview.id) {
    console.error("productPreview or productPreview.id is undefined", { productPreview });
    return null;
  }

  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product);

  if (!pricedProduct) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  });

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className={`group ${className} flex flex-col justify-between h-full`}
    >
      <Thumbnail
        thumbnail={productPreview.thumbnail}
        size="medium"
        isFeatured={isFeatured}
        className="mx-auto w-full max-w-full"
      />
      <div className="flex flex-col mt-2 text-center"> {/* Centered and reduced text size */}
        <Text className="text-xl sm:text-2xl text-pastel-pink" data-testid="product-title">
          {productPreview.title}
        </Text>
        <div className="flex justify-center items-center gap-x-1 mt-1">
          {cheapestPrice && <PreviewPrice price={cheapestPrice as PriceType} />}
        </div>
      </div>
    </LocalizedClientLink>
  );
}
