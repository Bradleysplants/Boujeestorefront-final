"use client";

import { Popover, Transition } from "@headlessui/react";
import { Cart } from "@medusajs/medusa";
import { Button } from "@medusajs/ui";
import { useParams, usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { formatAmount } from "@lib/util/prices";
import DeleteButton from "@modules/common/components/delete-button";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "@modules/products/components/thumbnail";

const CartDropdown = ({
  cart: cartState,
  className, // Add className prop
}: {
  cart?: Omit<Cart, "beforeInsert" | "afterLoad"> | null;
  className?: string; // Declare className as an optional prop
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const { countryCode } = useParams();

  const open = useCallback(() => setCartDropdownOpen(true), []);
  const close = useCallback(() => setCartDropdownOpen(false), []);

  const totalItems = cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const itemRef = useRef<number>(totalItems || 0);

  const timedOpen = useCallback(() => {
    open();
    const timer = setTimeout(close, 5000);
    setActiveTimer(timer);
  }, [open, close]);

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer);
    }
    open();
  };

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer);
      }
    };
  }, [activeTimer]);

  const pathname = usePathname();

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen();
    }
  }, [totalItems, pathname, timedOpen]);

  return (
    <div
      className={`h-full z-50 ${className}`}
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <Popover.Button
          className="h-full text-base sm:text-lg lg:text-xl hover:text-primary-green text-pastel-pink"
          aria-label="Open cart"
          onClick={openAndCancel}
        >
          <span className="hover:text-primary-green text-pastel-pink">
            {`Cart (${totalItems})`}
          </span>
        </Popover.Button>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[95vw] sm:w-[500px] max-w-md text-ui-fg-base"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-3 flex items-center justify-center">
              <h3 className="text-medium-semi text-pastel-pink">Cart</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[250px] sm:max-h-[350px] px-3 grid grid-cols-1 gap-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
                    .map((item) => (
                      <div
                        className="grid grid-cols-[90px_1fr] gap-x-3"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.variant.product.handle}`}
                          className="w-20"
                          aria-label={`View product ${item.title}`}
                        >
                          <Thumbnail thumbnail={item.thumbnail} size="square" />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col justify-between flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-3 w-[140px]">
                                <h3 className="text-small-regular overflow-hidden text-ellipsis text-pastel-pink">
                                  <LocalizedClientLink
                                    href={`/products/${item.variant.product.handle}`}
                                    data-testid="product-link"
                                    aria-label={`View details for ${item.title}`}
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                  aria-label={`Quantity: ${item.quantity}`}
                                >
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  region={cartState.region}
                                  item={item}
                                  style="tight"
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1 text-pastel-pink"
                            data-testid="cart-item-remove-button"
                            aria-label="Remove item"
                          >
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-3 flex flex-col gap-y-3 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-fg-base font-semibold text-pastel-pink">
                      Subtotal <span className="font-normal">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-medium-semi text-pastel-pink"
                      data-testid="cart-subtotal"
                      data-value={cartState.subtotal || 0}
                      aria-label="Cart subtotal"
                    >
                      {formatAmount({
                        amount: cartState.subtotal || 0,
                        region: cartState.region,
                        includeTaxes: false,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full"
                      size="base"
                      data-testid="go-to-cart-button"
                      aria-label="Go to cart to checkout"
                    >
                      Go to cart
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex py-12 flex-col gap-y-3 items-center justify-center">
                <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                  <span>0</span>
                </div>
                <span className="text-pastel-pink">Your shopping bag is empty.</span>
                <div>
                  <LocalizedClientLink href="/store">
                    <Button onClick={close} aria-label="Explore products">
                      Explore products
                    </Button>
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default CartDropdown;
