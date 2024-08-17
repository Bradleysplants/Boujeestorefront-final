import React, { Suspense } from 'react';
import { listRegions } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import CartButton from "@modules/layout/components/cart-button";
import SideMenu from "@modules/layout/components/side-menu";

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions);

  return (
    <div className="sticky top-0 inset-x-0 z-50 group bg-darker-slate-gray">
      <header className="relative h-16 mx-auto border-b duration-200 bg-darker-slate-gray border-pastel-pink">
        <nav className="content-container flex items-center justify-between w-full h-full text-small-regular px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex-1 flex items-center justify-start">
            <SideMenu regions={regions} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-pastel-pink" />
          </div>

          <div className="flex items-center justify-center flex-1 text-center">
            <LocalizedClientLink
              href="/"
              className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl hover:text-primary-green uppercase leading-tight text-pastel-pink break-word"
              aria-label="Navigate to homepage"
            >
              DeLisa&apos;s Boujee&nbsp;<br className="hidden sm:block" />
              Botanical Store
            </LocalizedClientLink>
          </div>

          <div className="flex-1 flex items-center justify-end gap-x-4">
            <Suspense fallback={<div>Loading cart...</div>}>
              <CartButton className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-pastel-pink" />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
}
