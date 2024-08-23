"use client";

import { Order } from "@medusajs/medusa";
import { Button } from "@medusajs/ui";

import OrderCard from "../order-card";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const OrderOverview = ({ orders }: { orders: Order[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-8 w-full">
        {orders.map((o) => (
          <div
            key={o.id}
            className="border-b border-darker-slate-gray pb-6 last:pb-0 last:border-none"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4 bg-slate-gray text-pastel-pink p-6 rounded-lg"
      data-testid="no-orders-container"
    >
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {":)"}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button className="bg-black text-pastel-pink border-pastel-pink hover:bg-darker-slate-gray" data-testid="continue-shopping-button">
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderOverview;
