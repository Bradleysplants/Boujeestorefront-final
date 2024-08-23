"use client"

import { Button, Heading } from "@medusajs/ui"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { CartWithCheckoutStep } from "types/global"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SummaryProps = {
  cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
  return (
    <div className="flex flex-col gap-y-4 text-pastel-pink"> {/* Ensure all text is pastel-pink */}
      <Heading level="h2" className="text-[2rem] leading-[2.75rem] text-pastel-pink">
        Summary
      </Heading>
      <DiscountCode cart={cart} /> {/* Removed className prop */}
      <Divider />
      <CartTotals data={cart} />
      <LocalizedClientLink href={"/checkout?step=" + cart.checkout_step} data-testid="checkout-button">
        <Button className="w-full h-10 bg-black border-2 border-pastel-pink text-pastel-pink font-bold">
          Go to checkout
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
