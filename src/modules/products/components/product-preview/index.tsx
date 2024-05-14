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
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
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
      className="group"
    >
      <div className="flex flex-col justify-between h-full" data-testid="product-wrapper">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="medium"
          isFeatured={isFeatured}
        />
        <div className="flex flex-col mt-4">
          <Text className="text-4xl text-pastel-pink" data-testid="product-title">
            {productPreview.title}
          </Text>
          <div className="flex items-center gap-x-2 mt-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice as PriceType} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
}