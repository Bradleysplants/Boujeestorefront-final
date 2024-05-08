"use client";
import React, { useState } from 'react';
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";
import { Text } from "@medusajs/ui";
import TermsAndConditionsModal from '@modules/layout/components/terms-and-conditions-modal/index';
import ReturnPolicyModal from '@modules/layout/components/returns-modal/index';

function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showReturns, setShowReturns] = useState(false);

  const toggleTermsModal = () => setShowTerms(!showTerms);
  const toggleReturnsModal = () => setShowReturns(!showReturns);

  return (
    <footer className="border-t border-gray-300 w-full bg-darker-slate-gray">
      <div className="content-container flex flex-col w-full py-4">
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
            <div className="flex flex-col gap-y-2" aria-label="Helpful Links">
              <span className="txt-small-plus text-pastel-pink">
                Helpful Links
              </span>
              <ul className="grid grid-cols-1 gap-y-2">
                <li>
                  <button
                    onClick={toggleTermsModal}
                    className="text-pastel-pink hover:text-primary-green"
                    aria-label="Open Terms and Conditions"
                  >
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleReturnsModal}
                    className="text-pastel-pink hover:text-primary-green"
                    aria-label="Open Return Policy"
                  >
                    Return Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between text-pastel-pink">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} DeLisa&apos;s Boujee Botanical Store. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
      {showTerms && <TermsAndConditionsModal onClose={toggleTermsModal} />}
      {showReturns && <ReturnPolicyModal onClose={toggleReturnsModal} />}
    </footer>
  );
}

export default Footer;