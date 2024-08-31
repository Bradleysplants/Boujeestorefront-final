import React from 'react';
import { Metadata } from "next";
import { retrieveOrder } from "@lib/data";
import { LineItem, Order } from "@medusajs/medusa";
import { enrichLineItems } from "@modules/cart/actions";
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template";
import { notFound } from "next/navigation";
import Footer from '@modules/layout/templates/footer';

type Props = {
  params: { id: string }
};

async function getOrder(id: string) {
  try {
    const order = await retrieveOrder(id);
    if (!order) {
      return null;
    }
    const enrichedItems = await enrichLineItems(order.items, order.region_id);
    return {
      ...order,
      items: enrichedItems as LineItem[],
    } as Order;
  } catch (error) {
    console.error("Failed to retrieve or enrich order:", error);
    return null;
  }
}

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your purchase was successful",
};

export default async function OrderConfirmedPage({ params }: Props) {
  const order = await getOrder(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="bg-slate-gray min-h-screen">
      <header className="bg-darker-slate-gray text-pastel-pink py-4 px-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Order Confirmation
        </h1>
      </header>

      <main id="main-content" className="flex items-center justify-center flex-grow">
        <OrderCompletedTemplate order={order} />
      </main>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
}
