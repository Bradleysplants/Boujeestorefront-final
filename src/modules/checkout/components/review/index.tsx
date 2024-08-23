"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"

const Review = ({
  cart,
  inputClassName, // Added inputClassName prop
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  inputClassName?: string // Optional inputClassName prop
}) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_session || paidByGiftcard)

  return (
    <div className="bg-slate-gray text-pastel-pink p-6 rounded-md"> {/* Apply slate-gray background and pastel-pink text */}
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline font-bold", // Apply bold text
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold"> {/* Ensure text is bold and pastel-pink */}
                By clicking the Place Order button, you confirm that you have
                read, understand and accept our Terms of Use, Terms of Sale and
                Returns Policy and acknowledge that you have read Medusa
                Store&apos;s Privacy Policy.
              </Text>
            </div>
          </div>
          <PaymentButton 
            cart={cart} 
            data-testid="submit-order-button" 
            className="w-full bg-black text-pastel-pink font-bold border-2 border-pastel-pink" // Apply consistent button styling
            inputClassName={inputClassName} // Pass the inputClassName prop to PaymentButton
          />
        </>
      )}
    </div>
  )
}

export default Review
