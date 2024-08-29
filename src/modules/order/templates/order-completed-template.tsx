import { Order } from "@medusajs/medusa";
import { Heading } from "@medusajs/ui";
import { cookies } from "next/headers";

import CartTotals from "@modules/common/components/cart-totals";
import Help from "@modules/order/components/help";
import Items from "@modules/order/components/items";
import OnboardingCta from "@modules/order/components/onboarding-cta";
import OrderDetails from "@modules/order/components/order-details";
import ShippingDetails from "@modules/order/components/shipping-details";
import PaymentDetails from "@modules/order/components/payment-details";

type OrderCompletedTemplateProps = {
  order: Order;
};

export default function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const isOnboarding = cookies().get("_medusa_onboarding")?.value === "true";

  return (
    <div className="py-6 min-h-[calc(100vh-64px)] bg-slate-gray">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-6 max-w-4xl h-full bg-darker-slate-gray w-full p-10 rounded-lg shadow-lg"
          data-testid="order-complete-container"
        >
          <Heading
            level="h1"
            className="text-3xl font-bold text-pastel-pink mb-6 text-center"
          >
            <span>Thank you!</span>
            <span>Your order was placed successfully.</span>
          </Heading>
          <OrderDetails order={order} />
          <Heading
            level="h2"
            className="text-2xl font-semibold text-pastel-pink mt-8"
          >
            Summary
          </Heading>
          <Items items={order.items} region={order.region} />
          <CartTotals data={order} />
          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  );
}
