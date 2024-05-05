import React from 'react';
import { getCategoriesList, getCollectionsList } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";
import { Text, clx } from "@medusajs/ui"; 


export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6);
  const { product_categories } = await getCategoriesList(0, 6);

  return (
    <footer className="border-t border-gray-300 w-full bg-darker-slate-gray">
      <div className="content-container flex flex-col w-full py-40">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-pastel-pink hover:text-primary-green uppercase"
              aria-label="Back to homepage"
            >
              DeLisa&apos;s Boujee Botanical Store
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 text-pastel-pink">
            {/* Adding the standard links */}
            <div className="flex flex-col gap-y-2" aria-label="Helpful Links">
              <span className="txt-small-plus text-pastel-pink">
                Helpful Links
              </span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li>
                  <LocalizedClientLink
                    href="/terms"
                    className="hover:text-primary-green"
                    aria-label="Terms and Conditions"
                  >
                    Terms and Conditions
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/returns"
                    className="hover:text-primary-green"
                    aria-label="Returns"
                  >
                    Returns
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/privacy"
                    className="hover:text-primary-green"
                    aria-label="Privacy Policy"
                  >
                    Privacy Policy
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
            {/* Existing categories and collections links */}
            {product_categories && product_categories.length > 0 && (
              <div className="flex flex-col gap-y-2" aria-label="Product categories">
                <span className="txt-small-plus text-pastel-pink">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                  {product_categories.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null; // Skip categories with a parent category
                    }
                    return (
                      <li
                        className="flex flex-col gap-2 text-pastel-pink"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className="hover:text-primary-green"
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                          aria-label={`View products in ${c.name}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-pastel-pink">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} DeLisa&apos;s Boujee Botanical Store. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  );
}
