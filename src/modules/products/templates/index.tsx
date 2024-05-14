import React, { Suspense } from "react";
import { Region } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import ProductInfo from "@modules/products/templates/product-info";
import ProductTabs from "@modules/products/components/product-tabs";
import ImageGallery from "@modules/products/components/image-gallery";
import ProductActions from "@modules/products/components/product-actions";
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta";
import RelatedProducts from "@modules/products/components/related-products";
import ProductActionsWrapper from "./product-actions-wrapper";
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products";
import { notFound } from "next/navigation";

type ProductTemplateProps = {
  product: PricedProduct;
  region: Region;
  countryCode: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound();
  }

  return (
    <>
      <div
        className="flex flex-col small:flex-row items-start py-6 relative bg-slate-gray text-pink-300 min-h-screen"
        data-testid="product-container"
        aria-label="Product details section"
      >
        <div className="flex flex-col sticky top-48 py-0 max-w-xs w-full gap-6">
          <ProductInfo product={product} region={region} />
          <ProductTabs product={product} />
        </div>
        <div className="w-full">
          <ImageGallery images={product?.images || []} className="max-h-96 w-full object-cover" />
        </div>
        <div className="flex flex-col sticky top-48 py-8 w-full gap-12 bg-slate-gray">
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <div className="opacity-50">
                <ProductActions disabled={true} product={product} region={region} className="text-green-500" />
              </div>
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>
      <div
        className="my-16 mx-auto bg-slate-gray min-h-50vh" 
        data-testid="related-products-container"
        aria-label="Related products section"
      >
        <Suspense fallback={<SkeletonRelatedProducts className="bg-slate-gray" />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  );
};

export default ProductTemplate;