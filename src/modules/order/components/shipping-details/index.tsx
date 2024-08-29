import { Order } from "@medusajs/medusa";
import { Heading, Text } from "@medusajs/ui";
import { formatAmount } from "@lib/util/prices";
import Divider from "@modules/common/components/divider";

type ShippingDetailsProps = {
  order: Order;
};

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const shippingAddress = order.shipping_address;
  const shippingMethod = order.shipping_methods[0];

  return (
    <div>
      <Heading
        level="h2"
        className="flex flex-row text-3xl-regular my-6 text-pastel-pink font-bold"
      >
        Delivery
      </Heading>
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-x-8">
        {/* Shipping Address Section */}
        <div
          className="flex flex-col sm:w-1/3 w-full mb-4 sm:mb-0"
          data-testid="shipping-address-summary"
        >
          <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold">
            Shipping Address
          </Text>
          {shippingAddress ? (
            <>
              <Text className="txt-medium text-pastel-pink">
                {shippingAddress.first_name} {shippingAddress.last_name}
              </Text>
              <Text className="txt-medium text-pastel-pink">
                {shippingAddress.address_1} {shippingAddress.address_2}
              </Text>
              <Text className="txt-medium text-pastel-pink">
                {shippingAddress.postal_code}, {shippingAddress.city}
              </Text>
              <Text className="txt-medium text-pastel-pink">
                {shippingAddress.country_code?.toUpperCase()}
              </Text>
            </>
          ) : (
            <Text className="txt-medium text-pastel-pink">
              Shipping address not available
            </Text>
          )}
        </div>

        {/* Contact Section */}
        <div
          className="flex flex-col sm:w-1/3 w-full mb-4 sm:mb-0"
          data-testid="shipping-contact-summary"
        >
          <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold">
            Contact
          </Text>
          {shippingAddress && (
            <Text className="txt-medium text-pastel-pink">
              {shippingAddress.phone}
            </Text>
          )}
          <Text className="txt-medium text-pastel-pink">{order.email}</Text>
        </div>

        {/* Shipping Method Section */}
        <div
          className="flex flex-col sm:w-1/3 w-full"
          data-testid="shipping-method-summary"
        >
          <Text className="txt-medium-plus text-pastel-pink mb-1 font-bold">
            Method
          </Text>
          {shippingMethod && (
            <Text className="txt-medium text-pastel-pink break-words">
              {shippingMethod.shipping_option?.name} (
              {formatAmount({
                amount: shippingMethod.price,
                region: order.region,
                includeTaxes: false,
              })
                .replace(/,/g, "")
                .replace(/\./g, ",")}
              )
            </Text>
          )}
        </div>
      </div>
      <Divider className="mt-8 border-pastel-pink" />
    </div>
  );
};

export default ShippingDetails;
