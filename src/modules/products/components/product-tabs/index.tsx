"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Accordion from "./accordion"

type ProductTabsProps = {
  product: PricedProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label} // Pass a string here
            headingSize="medium"
            value={tab.label} // This should also be a string
          >
            <span className="text-pastel-pink font-bold">{tab.label}</span>
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <span className="font-semibold">Shipping:</span>
          <p>Free standard shipping on orders over $100.</p>
        </div>
        <div className="flex items-center gap-x-4">
          <span className="font-semibold">Returns:</span>
          <p>30-day return policy. See our returns policy for details.</p>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
