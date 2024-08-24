import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { LineItem } from "@medusajs/medusa";

import { enrichLineItems } from "@modules/cart/actions";
import Wrapper from "@modules/checkout/components/payment-wrapper";
import CheckoutForm from "@modules/checkout/templates/checkout-form";
import CheckoutSummary from "@modules/checkout/templates/checkout-summary";
import { getCart } from "@lib/data";

export const metadata: Metadata = {
  title: "Checkout",
};

const fetchCart = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    return notFound();
  }

  const cart = await getCart(cartId).then((cart) => cart);

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as LineItem[];
  }

  return cart;
};

export default async function Checkout() {
  const cart = await fetchCart();

  if (!cart) {
    return notFound();
  }

  return (
    <div className="content-container py-12 bg-slate-gray text-pastel-pink">
      {/* Checkout Summary at the top for smaller screens */}
      <div className="block small:hidden mb-8">
        <CheckoutSummary />
      </div>

      {/* Main Content and Checkout Summary Side by Side on larger screens */}
      <div className="grid grid-cols-1 small:grid-cols-[1fr_416px] gap-x-40">
        <Wrapper cart={cart}>
          <CheckoutForm />
        </Wrapper>
        
        {/* Checkout Summary on the right for larger screens */}
        <div className="hidden small:block">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
