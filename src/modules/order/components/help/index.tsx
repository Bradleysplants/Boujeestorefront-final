import { Heading } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import React from "react";

const Help = () => {
  return (
    <div
      className="mt-6 p-4 rounded-md"
      style={{
        backgroundColor: '#0b1e35', // Slate-gray color
        borderColor: '#B6B9DB', // Primary-green color
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Heading className="text-base-semi font-bold" style={{ color: '#ef9ed4' }}>
        Need help?
      </Heading>
      <div className="my-2 text-base-regular" style={{ color: '#ef9ed4' }}>
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink
              href="/customer-service"
              className="font-bold hover:text-primary-green"
              style={{ color: '#ef9ed4' }}
            >
              Visit our Customer Service page Click Here!
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Help;
