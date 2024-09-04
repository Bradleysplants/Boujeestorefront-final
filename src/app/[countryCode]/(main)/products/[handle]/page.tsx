import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductByHandle,
  getRegion,
  retrievePricedProductById,
} from "@lib/data";
import { Region } from "@medusajs/medusa";
import ProductTemplate from "@modules/products/templates";

type Props = {
  params: { countryCode: string; handle: string };
};

export async function getServerSideProps({ params }: { params: { countryCode: string; handle: string } }) {
  const { countryCode, handle } = params;
  
  const region = await getRegion(countryCode);
  if (!region) {
    return { notFound: true };
  }

  const product = await getProductByHandle(handle).then((result) => result.product);
  if (!product || !product.id) {
    return { notFound: true };
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  });

  if (!pricedProduct) {
    return { notFound: true };
  }

  return {
    props: {
      product: pricedProduct,
      region,
      countryCode,
    },
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params;

  const product = await getProductByHandle(handle).then((result) => result.product);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} | Delisa's Boujee Botanical Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Delisa's Boujee Botanical Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : ["/default-thumbnail.jpg"], // Default image
    },
  };
}

export default function ProductPage({ product, region, countryCode }: { product: any; region: Region; countryCode: string }) {
  return (
    <ProductTemplate
      product={product}
      region={region}
      countryCode={countryCode}
    />
  );
}
