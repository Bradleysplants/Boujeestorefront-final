import { Order } from "@medusajs/medusa"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div>
      <Text className="text-pastel-pink font-bold">
        We have sent the order confirmation details to{" "}
        <span className="text-primary-green font-semibold" data-testid="order-email">
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2 text-pastel-pink font-bold">
        Order date: <span data-testid="order-date">{new Date(order.created_at).toDateString()}</span>
      </Text>
      <Text className="mt-2 text-primary-green font-bold">
        Order number: <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text className="text-pastel-pink font-bold">
              Order status:{" "}
              <span className="text-darker-slate-gray font-semibold" data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text className="text-pastel-pink font-bold">
              Payment status:{" "}
              <span className="text-darker-slate-gray font-semibold" data-testid="order-payment-status">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
