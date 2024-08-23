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

  // create payment sessions and get cart
  const cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  if (!cart) {
    return null
  }

  cart.checkout_step = cart && getCheckoutStep(cart)

  // get available shipping methods
  const availableShippingMethods = await listCartShippingMethods(cart.id).then(
    (methods) => methods?.filter((m) => !m.is_return)
  )

  if (!availableShippingMethods) {
    return null
  }

  // get customer if logged in
  const customer = await getCustomer()

  return (
    <div className="w-full grid grid-cols-1 gap-y-8 p-8 bg-slate-gray rounded-md"> {/* Apply slate-gray background to the entire form */}
      <div className="bg-slate-gray text-pastel-pink font-bold p-6 rounded-md"> {/* Background slate-gray, text pastel-pink, bold */}
        <Addresses cart={cart} customer={customer} inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md" /> {/* Pass the input className */}
      </div>

      <div className="bg-slate-gray text-pastel-pink font-bold p-6 rounded-md"> {/* Background slate-gray, text pastel-pink, bold */}
        <Shipping cart={cart} availableShippingMethods={availableShippingMethods} inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md" /> {/* Pass the input className */}
      </div>

      <div className="bg-slate-gray text-pastel-pink font-bold p-6 rounded-md"> {/* Background slate-gray, text pastel-pink, bold */}
        <Payment cart={cart} inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md" /> {/* Pass the input className */}
      </div>

      <div className="bg-slate-gray text-pastel-pink font-bold p-6 rounded-md"> {/* Background slate-gray, text pastel-pink, bold */}
        <Review cart={cart} inputClassName="font-bold text-pastel-pink bg-black border-2 border-pastel-pink p-2 rounded-md" /> {/* Pass the input className */}
      </div>
    </div>
  )
}
