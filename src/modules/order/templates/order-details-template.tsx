"use client";

import { Order } from "@medusajs/medusa";
import { XMark } from "@medusajs/icons";
import React from "react";

import Help from "@modules/order/components/help";
import Items from "@modules/order/components/items";
import OrderDetails from "@modules/order/components/order-details";
import OrderSummary from "@modules/order/components/order-summary";
import ShippingDetails from "@modules/order/components/shipping-details";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type OrderDetailsTemplateProps = {
  order: Order;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-4 p-4 bg-slate-gray rounded-lg shadow-lg sm:gap-y-6 sm:p-6">
      <div className="flex flex-col gap-2 justify-between items-start sm:flex-row sm:items-center sm:gap-4">
        <h1 className="text-2xl font-bold text-pastel-pink sm:text-3xl">Order Details</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-pastel-pink hover:text-primary-green"
          data-testid="back-to-overview-button"
        >
          <XMark className="w-5 h-5 sm:w-6 sm:h-6" /> Back to Overview
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-4 bg-darker-slate-gray p-4 rounded-lg sm:gap-6 sm:p-6"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items items={order.items} region={order.region} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
