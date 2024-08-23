"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { RadioGroup } from "@headlessui/react"
import ErrorMessage from "@modules/checkout/components/error-message"
import { Cart } from "@medusajs/medusa"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, Tooltip, clx } from "@medusajs/ui"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"

import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import PaymentContainer from "@modules/checkout/components/payment-container"
import { setPaymentMethod } from "@modules/checkout/actions"
import { paymentInfoMap } from "@lib/constants"
import { StripeContext } from "@modules/checkout/components/payment-wrapper"

const Payment = ({
  cart,
  inputClassName, // Add inputClassName prop
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
  inputClassName?: string // Optional inputClassName prop
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = cart?.payment_session?.provider_id === "stripe"
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (cart?.payment_session && cart?.shipping_methods.length !== 0) ||
    paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#FFC5E1", // Use pastel-pink color for text
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: clx(
          "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-black text-pastel-pink font-bold border-2 border-pastel-pink rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out", // Black background, pastel-pink text, bold text
          inputClassName // Apply custom input className
        ),
      },
    }
  }, [inputClassName])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const set = async (providerId: string) => {
    setIsLoading(true)
    await setPaymentMethod(providerId)
      .catch((err) => setError(err.toString()))
      .finally(() => {
        if (providerId === "paypal") return
        setIsLoading(false)
      })
  }

  const handleChange = (providerId: string) => {
    setError(null)
    set(providerId)
  }

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    router.push(pathname + "?" + createQueryString("step", "review"), {
      scroll: false,
    })
  }

  useEffect(() => {
    setIsLoading(false)
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-slate-gray text-pastel-pink p-6 rounded-md"> {/* Apply slate-gray background and pastel-pink text */}
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline font-bold", // Apply bold text
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-pastel-pink hover:text-primary-green underline font-bold" // Apply pastel-pink, underline, bold text
              data-testid="edit-payment-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && cart?.payment_sessions?.length ? (
            <>
              <RadioGroup
                value={cart.payment_session?.provider_id || ""}
                onChange={(value: string) => handleChange(value)}
              >
                {cart.payment_sessions
                  .sort((a, b) => {
                    return a.provider_id > b.provider_id ? 1 : -1
                  })
                  .map((paymentSession) => {
                    return (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentSession={paymentSession}
                        key={paymentSession.id}
                        selectedPaymentOptionId={
                          cart.payment_session?.provider_id || null
                        }
                      />
                    )
                  })}
              </RadioGroup>
              {isStripe && stripeReady && (
                <div className="mt-5 transition-all duration-150 ease-in-out">
                  <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold"> {/* Ensure text is pastel-pink and bold */}
                    Enter your card details:
                  </Text>

                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand &&
                          e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              )}
            </>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold"> {/* Ensure text is pastel-pink and bold */}
                Payment method
              </Text>
              <Text
                className="txt-medium text-pastel-pink font-bold"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-ui-fg-base">
              <Spinner />
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6 bg-black text-pastel-pink font-bold border-2 border-pastel-pink" // Apply black background, pastel-pink text, bold text
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripe && !cardComplete) ||
              (!cart?.payment_session && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            Continue to review
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && cart.payment_session ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold"> {/* Ensure text is pastel-pink and bold */}
                  Payment method
                </Text>
                <Text
                  className="txt-medium text-pastel-pink font-bold"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[cart.payment_session.provider_id]?.title ||
                    cart.payment_session.provider_id}
                </Text>
                {process.env.NODE_ENV === "development" &&
                  !Object.hasOwn(
                    paymentInfoMap,
                    cart.payment_session.provider_id
                  ) && (
                    <Tooltip content="You can add a user-friendly name and icon for this payment provider in 'src/modules/checkout/components/payment/index.tsx'" />
                  )}
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold"> {/* Ensure text is pastel-pink and bold */}
                  Payment details
                </Text>
                <div
                  className="flex gap-2 txt-medium text-pastel-pink font-bold"
                  data-testid="payment-details-summary"
                >
                  <CreditCard />
                  {cart.payment_session.provider_id === "stripe" ? (
                    <>{cardBrand || "Credit Card"}</>
                  ) : (
                    <>{paymentInfoMap[cart.payment_session.provider_id]?.title}</>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-8 text-ui-fg-base">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment
