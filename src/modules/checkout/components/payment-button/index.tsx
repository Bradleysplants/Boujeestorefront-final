"use client";

import React, { useState } from "react";
import { Cart, PaymentSession } from "@medusajs/medusa";
import { Button } from "@medusajs/ui";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { placeOrder } from "@modules/checkout/actions";
import ErrorMessage from "../error-message";
import Spinner from "@modules/common/icons/spinner";
import axios from "axios"; // Ensure axios is imported

// Setup Axios Debug for logging requests/responses
const setupAxiosDebug = () => {
  axios.interceptors.request.use(config => {
    console.log('Request:', config);
    return config;
  });

  axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  }, error => {
    console.error('Error:', error);
    return Promise.reject(error);
  });
};

// Invoke Axios debug setup
setupAxiosDebug();

type OnApproveData = {
  orderID: string;
};

import type {
  OnApproveActions as PayPalOnApproveActions,
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js/types/components/buttons";

type PaymentButtonProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  "data-testid"?: string;
  className?: string; // Added className here
  inputClassName?: string; // Added inputClassName here
};

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
  className, // Added className here
  inputClassName, // Added inputClassName here
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
    return <GiftCardPaymentButton />;
  }

  const paymentSession = cart.payment_session as PaymentSession;

  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      );
    case "manual":
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      );
    case "paypal":
      return (
        <PayPalPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      );
    default:
      return <Button disabled>Select a payment method</Button>;
  }
};

// GiftCardPaymentButton component
const GiftCardPaymentButton = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleOrder = async () => {
    setSubmitting(true);
    try {
      await placeOrder();
    } catch (error) {
      console.error("Error placing gift card order:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Button
      onClick={handleOrder}
      isLoading={submitting}
      data-testid="submit-order-button"
    >
      Place order
    </Button>
  );
};

// StripePaymentButton component
const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  notReady: boolean;
  "data-testid"?: string;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();
  const cardElement = elements?.getElement("card");

  const onPaymentCompleted = async () => {
    try {
      await placeOrder();
    } catch (error) {
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
    } catch (error) {
      console.error("Error processing Stripe payment:", error);
      setErrorMessage("An error occurred, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const disabled = !stripe || !elements;

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  );
};

// PayPalPaymentButton component
const PayPalPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  notReady: boolean;
  "data-testid"?: string;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    try {
      await placeOrder();
    } catch (error) {
      console.error("Error completing PayPal payment:", error);
      setErrorMessage("An error occurred, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const session = cart.payment_session as PaymentSession;

  const handlePayment = async (
    _data: OnApproveData,
    actions: PayPalOnApproveActions
  ) => {
    try {
      const authorization = await actions.order?.authorize();
      if (authorization?.status !== "COMPLETED") {
        console.error("PayPal authorization status:", authorization);
        throw new Error(`An error occurred, status: ${authorization?.status}`);
      }
      await onPaymentCompleted();
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error processing PayPal payment:", error);
      setErrorMessage(errorMessage);
      setSubmitting(false);
    }
  };

  const createOrder = (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '100.00',
          },
        },
      ],
      intent: 'AUTHORIZE',  // Ensure intent is either 'CAPTURE' or 'AUTHORIZE'
    });
  };

  const [{ isPending, isResolved }] = usePayPalScriptReducer();

  if (isPending) {
    return <Spinner />;
  }

  return isResolved ? (
    <>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={createOrder}
        onApprove={handlePayment}
        onError={(error: any) => {
          console.error("Error processing PayPal payment:", error);
          setErrorMessage(error.message || "An error occurred processing the PayPal payment.");
        }}
        disabled={notReady || submitting || isPending}
        data-testid={dataTestId}
      />
      <ErrorMessage error={errorMessage} data-testid="paypal-payment-error-message" />
    </>
  ) : null;
};

// ManualTestPaymentButton component
const ManualTestPaymentButton = ({
  notReady,
  "data-testid": dataTestId,
}: {
  notReady: boolean;
  "data-testid"?: string;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    try {
      await placeOrder();
    } catch (error) {
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
        data-testid="submit-order-button"
      >
        Place order
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  );
};

export default PaymentButton;
