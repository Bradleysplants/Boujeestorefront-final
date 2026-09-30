"use client";

import React, { useState } from "react";
import { Cart, PaymentSession } from "@medusajs/medusa";
import { Button } from "@medusajs/ui";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import { placeOrder } from "@modules/checkout/actions";
import ErrorMessage from "../error-message";
import Spinner from "@modules/common/icons/spinner";

type PaymentButtonProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  "data-testid"?: string;
  className?: string; // New optional prop
  inputClassName?: string; // New optional prop
};

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
    cart.shipping_methods.length < 1;

  const paidByGiftcard =
    cart?.gift_cards?.length > 0 && cart?.total === 0;

  if (paidByGiftcard) {
    return (
      <GiftCardPaymentButton
        className={className}
        inputClassName={inputClassName}
      />
    );
  }

  const paymentSession = cart.payment_session as PaymentSession;

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
      );
    case "manual":
      return (
        <ManualTestPaymentButton
          notReady={notReady}
          data-testid={dataTestId}
          className={className}
          inputClassName={inputClassName}
        />
      );
    case "paypal":
      return (
        <PayPalPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          className={className}
          inputClassName={inputClassName}
        />
      );
    default:
      return <Button disabled>Select a payment method</Button>;
  }
};

// GiftCardPaymentButton component
type GiftCardPaymentButtonProps = {
  className?: string;
  inputClassName?: string; // May not be used
};

const GiftCardPaymentButton: React.FC<GiftCardPaymentButtonProps> = ({
  className,
  inputClassName, // May not be used
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOrder = async () => {
    setSubmitting(true);
    try {
      await placeOrder();
    } catch (error: any) {
      console.error("Error placing gift card order:", error);
      setErrorMessage("An error occurred, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOrder}
        isLoading={submitting}
        className={className} // Apply className here
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      {errorMessage && (
        <ErrorMessage
          error={errorMessage}
          data-testid="giftcard-payment-error-message"
        />
      )}
    </>
  );
};

// StripePaymentButton component
type StripePaymentButtonProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  notReady: boolean;
  "data-testid"?: string;
  className?: string;
  inputClassName?: string;
};

const StripePaymentButton: React.FC<StripePaymentButtonProps> = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  className,
  inputClassName,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState<boolean>(false);

  const stripe = useStripe();
  const elements = useElements();
  const cardElement = elements?.getElement("card");

  const onPaymentCompleted = async () => {
    try {
      await placeOrder();
    } catch (error: any) {
      console.error("Error completing Stripe payment:", error);
      setErrorMessage("An error occurred, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const session = cart.payment_session as PaymentSession;

  const handlePayment = async () => {
    setSubmitting(true);

    if (!stripe || !elements || !cardElement || !cart) {
      setSubmitting(false);
      setErrorMessage("Stripe is not properly initialized.");
      return;
    }

    try {
      const result = await stripe.confirmCardPayment(
        session.data.client_secret as string,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${cart.billing_address.first_name} ${cart.billing_address.last_name}`,
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
        }
      );

      if (result.error) {
        const pi = result.error.payment_intent;
        if (
          (pi && pi.status === "requires_capture") ||
          (pi && pi.status === "succeeded")
        ) {
          await onPaymentCompleted();
        }

        setErrorMessage(result.error.message || null);
        return;
      }

      if (
        result.paymentIntent &&
        (result.paymentIntent.status === "requires_capture" ||
          result.paymentIntent.status === "succeeded")
      ) {
        await onPaymentCompleted();
      }
    } catch (error: any) {
      console.error("Error processing Stripe payment:", error);
      setErrorMessage("An error occurred, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = !stripe || !elements;

  const handleCardChange = (e: StripeCardElementChangeEvent) => {
    setCardBrand(
      e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
    );
    setErrorMessage(e.error?.message || null); // Corrected from setError to setErrorMessage
    setCardComplete(e.complete);
  };

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        className={className} // Apply className here
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <div className="mt-5 transition-all duration-150 ease-in-out">
        <CardElement
          options={{
            style: {
              base: {
                fontFamily: "Inter, sans-serif",
                color: "#424270",
                "::placeholder": {
                  color: "rgb(107 114 128)",
                },
              },
            },
            classes: {
              base: inputClassName || "default-input-class", // Apply inputClassName or default
            },
          }}
          onChange={handleCardChange}
        />
      </div>
      {errorMessage && (
        <ErrorMessage
          error={errorMessage}
          data-testid="stripe-payment-error-message"
        />
      )}
    </>
  );
};

// PayPalPaymentButton component
type PayPalPaymentButtonProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  notReady: boolean;
  "data-testid"?: string;
  className?: string;
  inputClassName?: string; // May not be used
};

const PayPalPaymentButton: React.FC<PayPalPaymentButtonProps> = ({
  cart,
  notReady,
  "data-testid": dataTestId,
  className,
  inputClassName, // May not be used
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const session = cart.payment_session as PaymentSession;

  // Prefixed parameters to indicate they're intentionally unused
  const createOrder = async (
    _data: any,
    _actions: any
  ): Promise<string> => {
    // Assuming session.data.id is the PayPal order ID created by MedusaJS backend
    return Promise.resolve(session.data.id as string);
  };

  const onApprove = async (
    _data: any,
    _actions: any
  ) => {
    try {
      await placeOrder();
    } catch (error: any) {
      console.error("Error completing PayPal payment:", error);
      setErrorMessage("An error occurred, please try again.");
    }
  };

  const [{ isPending, isResolved }] = usePayPalScriptReducer();

  if (isPending) {
    return <Spinner />;
  }

  return isResolved ? (
    <div className={className}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(error: any) => {
          console.error("Error processing PayPal payment:", error);
          setErrorMessage(
            error.message ||
              "An error occurred processing the PayPal payment."
          );
        }}
        onCancel={() => {
          console.log("PayPal payment cancelled.");
        }}
        disabled={notReady || isPending}
        data-testid={dataTestId}
      />
      {errorMessage && (
        <ErrorMessage
          error={errorMessage}
          data-testid="paypal-payment-error-message"
        />
      )}
    </div>
  ) : null;
};

// ManualTestPaymentButton component
type ManualTestPaymentButtonProps = {
  notReady: boolean;
  "data-testid"?: string;
  className?: string;
  inputClassName?: string; // May not be used
};

const ManualTestPaymentButton: React.FC<ManualTestPaymentButtonProps> = ({
  notReady,
  "data-testid": dataTestId,
  className,
  inputClassName, // May not be used
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    try {
      await placeOrder();
    } catch (error: any) {
      console.error("Error completing manual payment:", error);
      setErrorMessage("An error occurred, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = () => {
    setSubmitting(true);
    onPaymentCompleted();
  };

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        className={className} // Apply className here
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      {errorMessage && (
        <ErrorMessage
          error={errorMessage}
          data-testid="manual-payment-error-message"
        />
      )}
    </>
  );
};

export default PaymentButton;
