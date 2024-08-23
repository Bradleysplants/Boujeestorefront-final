import { RadioGroup } from "@headlessui/react"
import { InformationCircleSolid } from "@medusajs/icons"
import { PaymentSession } from "@medusajs/medusa"
import { Text, Tooltip, clx } from "@medusajs/ui"
import React from "react"

import Radio from "@modules/common/components/radio"

import PaymentTest from "../payment-test"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selectedPaymentOptionId: string | null
  disabled?: boolean
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
  inputClassName?: string // Add the inputClassName prop
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
  inputClassName, // Destructure the inputClassName prop
}) => {
  const isDevelopment = process.env.NODE_ENV === "development"

  return (
    <>
      <RadioGroup.Option
        key={paymentSession.id}
        value={paymentSession.provider_id}
        disabled={disabled}
        className={clx(
          "flex flex-col gap-y-2 text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active bg-black text-pastel-pink font-bold", // Apply black background, pastel-pink text, and bold font
          {
            "border-pastel-pink": // Apply pastel-pink border when selected
              selectedPaymentOptionId === paymentSession.provider_id,
          }
        )}
      >
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-x-4">
            <Radio
              checked={selectedPaymentOptionId === paymentSession.provider_id}
              className={inputClassName} // Apply the inputClassName prop to the Radio component
            />
            <Text className="text-base-regular">
              {paymentInfoMap[paymentSession.provider_id]?.title ||
                paymentSession.provider_id}
            </Text>
            {process.env.NODE_ENV === "development" &&
              !Object.hasOwn(paymentInfoMap, paymentSession.provider_id) && (
                <Tooltip
                  content="You can add a user-friendly name and icon for this payment provider in 'src/modules/checkout/components/payment/index.tsx'"
                  className="min-w-fit"
                >
                  <InformationCircleSolid color="var(--fg-muted)" />
                </Tooltip>
              )}

            {paymentSession.provider_id === "manual" && isDevelopment && (
              <PaymentTest className="hidden small:block" />
            )}
          </div>
          <span className="justify-self-end text-pastel-pink"> {/* Ensure icon text is pastel-pink */}
            {paymentInfoMap[paymentSession.provider_id]?.icon}
          </span>
        </div>
        {paymentSession.provider_id === "manual" && isDevelopment && (
          <PaymentTest className="small:hidden text-[10px]" />
        )}
      </RadioGroup.Option>
    </>
  )
}

export default PaymentContainer
