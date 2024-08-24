import {
  createPaymentSessions,
  getCustomer,
  listCartShippingMethods,
} from "@lib/data"
import { getCheckoutStep } from "@lib/util/get-checkout-step"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { cookies } from "next/headers"
import { CartWithCheckoutStep } from "types/global"

export default async function CheckoutForm() {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  if (!cart) {
    return null
  }

  cart.checkout_step = cart && getCheckoutStep(cart)

  const availableShippingMethods = await listCartShippingMethods(cart.id).then(
    (methods) => methods?.filter((m) => !m.is_return)
  )

  if (!availableShippingMethods) {
    return null
  }

  const customer = await getCustomer()

  return (
    <div className="w-full grid grid-cols-1 gap-y-8 p-4 small:p-8 bg-slate-gray rounded-md max-w-full overflow-hidden">
      {/* Use responsive classes and ensure the layout doesn't overflow */}
      <div className="bg-slate-gray text-pastel-pink font-bold p-4 small:p-6 rounded-md max-w-full">
        <Addresses
          cart={cart}
          customer={customer}
          inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md w-full"
          // Set width to 100% for responsive behavior
        />
      </div>

      <div className="bg-slate-gray text-pastel-pink font-bold p-4 small:p-6 rounded-md max-w-full">
        <Shipping
          cart={cart}
          availableShippingMethods={availableShippingMethods}
          inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md w-full"
        />
      </div>

      <div className="bg-slate-gray text-pastel-pink font-bold p-4 small:p-6 rounded-md max-w-full">
        <Payment
          cart={cart}
          inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md w-full"
        />
      </div>

      <div className="bg-slate-gray text-pastel-pink font-bold p-4 small:p-6 rounded-md max-w-full">
        <Review
          cart={cart}
          inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md w-full"
        />
      </div>
    </div>
  )
}
