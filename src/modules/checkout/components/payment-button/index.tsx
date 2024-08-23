"use client"

import { Cart, PaymentSession } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { placeOrder } from "@modules/checkout/actions"
import React, { useState, useEffect, useRef } from "react"
import ErrorMessage from "../error-message"
import Spinner from "@modules/common/icons/spinner"

type PaymentButtonProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  "data-testid"?: string
  className?: string
  inputClassName?: string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
  className,
  inputClassName,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    cart.shipping_methods.length < 1
      ? true
      : false

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  if (paidByGiftcard) {
    return <GiftCardPaymentButton className={className} />
  }

  const paymentSession = cart.payment_session as PaymentSession

  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          className={className}
          inputClassName={inputClassName}
        />
      )
    case "manual":
      return (
        <ManualTestPaymentButton
          notReady={notReady}
          data-testid={dataTestId}
          className={className}
          inputClassName={inputClassName}
        />
      )
    case "paypal":
      return (
        <PayPalPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          className={className}
          inputClassName={inputClassName}
        />
      )
    default:
      return (
        <Button
          className={`bg-black text-pastel-pink font-bold ${className}`}
          disabled
          aria-disabled="true"
          aria-label="Select a payment method"
        >
          Select a payment method
        </Button>
      )
  }
}

const GiftCardPaymentButton = ({
  className,
}: {
  className?: string
}) => {
  const [submitting, setSubmitting] = useState(false)

  const handleOrder = async () => {
    setSubmitting(true)
    await placeOrder()
  }

  return (
    <Button
      onClick={handleOrder}
      isLoading={submitting}
      data-testid="submit-order-button"
      className={`bg-black text-pastel-pink font-bold ${className}`}
      aria-label="Place order using gift card"
    >
      Place order
    </Button>
  )
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  className,
  inputClassName,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  notReady: boolean
  "data-testid"?: string
  className?: string
  inputClassName?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (errorMessage) {
      errorRef.current?.focus()
    }
  }, [errorMessage])

  const onPaymentCompleted = async () => {
    await placeOrder().catch(() => {
      setErrorMessage("An error occurred, please try again.")
      setSubmitting(false)
    })
  }

  const stripe = useStripe()
  const elements = useElements()
  const card = elements?.getElement("card")

  const session = cart.payment_session as PaymentSession

  const disabled = !stripe || !elements ? true : false

  const handlePayment = async () => {
    setSubmitting(true)

    if (!stripe || !elements || !card || !cart) {
      setSubmitting(false)
      return
    }

    await stripe
      .confirmCardPayment(session.data.client_secret as string, {
        payment_method: {
          card: card,
          billing_details: {
            name:
              cart.billing_address.first_name +
              " " +
              cart.billing_address.last_name,
            address: {
              city: cart.billing_address.city ?? undefined,
              country: cart.billing_address.country_code ?? undefined,
              line1: cart.billing_address.address_1 ?? undefined,
              line2: cart.billing_address.address_2 ?? undefined,
              postal_code: cart.billing_address.postal_code ?? undefined,
              state: cart.billing_address.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address.phone ?? undefined,
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            onPaymentCompleted()
          }

          setErrorMessage(error.message || null)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return onPaymentCompleted()
        }

        return
      })
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
        className={`bg-black text-pastel-pink font-bold ${className}`}
        aria-label="Place order using Stripe"
      >
        Place order
      </Button>
      <div ref={errorRef} tabIndex={-1} aria-live="assertive">
        <ErrorMessage
          error={errorMessage}
          data-testid="stripe-payment-error-message"
          className={inputClassName}
        />
      </div>
    </>
  )
}

const PayPalPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  className,
  inputClassName,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  notReady: boolean
  "data-testid"?: string
  className?: string
  inputClassName?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (errorMessage) {
      errorRef.current?.focus()
    }
  }, [errorMessage])

  const onPaymentCompleted = async () => {
    await placeOrder().catch(() => {
      setErrorMessage("An error occurred, please try again.")
      setSubmitting(false)
    })
  }

  const session = cart.payment_session as PaymentSession

  const handlePayment = async (
    _data: OnApproveData,
    actions: OnApproveActions
  ) => {
    actions?.order
      ?.authorize()
      .then((authorization) => {
        if (authorization.status !== "COMPLETED") {
          setErrorMessage(`An error occurred, status: ${authorization.status}`)
          return
        }
        onPaymentCompleted()
      })
      .catch(() => {
        setErrorMessage(`An unknown error occurred, please try again.`)
        setSubmitting(false)
      })
  }

  const [{ isPending, isResolved }] = usePayPalScriptReducer()

  if (isPending) {
    return <Spinner />
  }

  if (isResolved) {
    return (
      <>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={async () => session.data.id as string}
          onApprove={handlePayment}
          disabled={notReady || submitting || isPending}
          data-testid={dataTestId}
        />
        <div ref={errorRef} tabIndex={-1} aria-live="assertive">
          <ErrorMessage
            error={errorMessage}
            data-testid="paypal-payment-error-message"
            className={inputClassName}
          />
        </div>
      </>
    )
  }
}

const ManualTestPaymentButton = ({
  notReady,
  className,
  inputClassName,
}: {
  notReady: boolean
  className?: string
  inputClassName?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (errorMessage) {
      errorRef.current?.focus()
    }
  }, [errorMessage])

  const onPaymentCompleted = async () => {
    await placeOrder().catch((err) => {
      setErrorMessage(err.toString())
      setSubmitting(false)
    })
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
        className={`bg-black text-pastel-pink font-bold ${className}`}
        aria-label="Place order using Manual payment method"
      >
        Place order
      </Button>
      <div ref={errorRef} tabIndex={-1} aria-live="assertive">
        <ErrorMessage
          error={errorMessage}
          data-testid="manual-payment-error-message"
          className={inputClassName}
        />
      </div>
    </>
  )
}

export default PaymentButton
