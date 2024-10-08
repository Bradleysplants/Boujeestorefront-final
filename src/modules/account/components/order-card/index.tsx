import { Order } from "@medusajs/medusa";
import { Button } from "@medusajs/ui";
import { useMemo } from "react";

import Thumbnail from "@modules/products/components/thumbnail";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { formatAmount } from "@lib/util/prices";

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items.length;
  }, [order]);

  return (
    <div className="bg-black text-pastel-pink flex flex-col p-4 rounded-lg shadow-md" data-testid="order-card">
      <div className="uppercase text-large-semi mb-1 text-pastel-pink">
        #<span data-testid="order-display-id">{order.display_id}</span>
      </div>
      <div className="flex items-center divide-x divide-darker-slate-gray text-small-regular">
        <span className="pr-2" data-testid="order-created-at">
          {new Date(order.created_at).toDateString()}
        </span>
        <span className="px-2" data-testid="order-amount">
          {formatAmount({
            amount: order.total,
            region: order.region,
            includeTaxes: false,
          })}
        </span>
        <span className="pl-2">{`${numberOfLines} ${
          numberOfLines > 1 ? "items" : "item"
        }`}</span>
      </div>
      <div className="grid grid-cols-2 small:grid-cols-4 gap-4 my-4">
        {order.items.slice(0, 3).map((i) => {
          return (
            <div
              key={i.id}
              className="flex flex-col gap-y-2"
              data-testid="order-item"
            >
              <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
              <div className="flex items-center text-small-regular text-pastel-pink">
                <span
                  className="font-semibold"
                  data-testid="item-title"
                >
                  {i.title}
                </span>
                <span className="ml-2">x</span>
                <span data-testid="item-quantity">{i.quantity}</span>
              </div>
            </div>
          );
        })}
        {numberOfProducts > 4 && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-small-regular text-pastel-pink">
              + {numberOfLines - 4}
            </span>
            <span className="text-small-regular text-pastel-pink">more</span>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <Button data-testid="order-details-link" className="bg-black text-pastel-pink border-pastel-pink hover:bg-darker-slate-gray">
            See details
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default OrderCard;
