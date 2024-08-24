import { Heading } from "@medusajs/ui"
import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { cookies } from "next/headers"
import { getCart } from "@lib/data"

const CheckoutSummary = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = await getCart(cartId).then((cart) => cart)

  if (!cart) {
    return null
  }

  return (
    <div className="w-full bg-slate-gray flex flex-col">
      <Divider className="my-6 small:hidden" />
      <div className="relative bg-darker-slate-gray p-4 rounded-md shadow-[0_0_20px_5px_rgba(255,197,225,0.75)]">
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline text-pastel-pink"
        >
          In your Cart
        </Heading>
      </div>
      <Divider className="my-6" />
      <CartTotals data={cart} />
      <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
      <div className="my-6">
        <DiscountCode cart={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary
