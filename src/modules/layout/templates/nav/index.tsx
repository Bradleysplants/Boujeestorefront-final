import React, { Suspense } from 'react';
import { listRegions } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions);

  return (
    <div className="sticky top-0 inset-x-0 z-50 group bg-darker-slate-gray"> {/* Background color */}
      <header className="relative h-16 mx-auto border-b duration-200 bg-darker-slate-gray border-pastel-pink">
        <nav className="content-container txt-xsmall-plus text-pastel-pink flex items-center justify-between w-full h-full text-small-regular" aria-label="Main navigation">
          <div className="flex-1 basis-0 h-full flex items-center">
            <SideMenu regions={regions} />
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-primary-green uppercase"
              data-testid="nav-store-link"
              aria-label="Navigate to homepage"
            >
              DeLisa&apos;s Boujee Botanical Store
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-primary-green"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                  aria-label="Search products"
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-primary-green"
                href="/account"
                data-testid="nav-account-link"
                aria-label="Access account settings"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense fallback={<div>Loading cart...</div>}>
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}
