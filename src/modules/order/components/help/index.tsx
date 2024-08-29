import { Heading } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import React from "react";

const Help = () => {
  return (
    <div
      className="mt-6 p-4 rounded-md bg-slate-gray"
      style={{ backgroundColor: '#0b1e35 !important' }} // Slate-gray color with !important
    >
      <Heading
        className="text-base-semi font-bold"
        style={{ color: '#ef9ed4 !important' }} // Pastel-pink color with !important
      >
        Need help?
      </Heading>
      <div
        className="my-2 text-base-regular"
        style={{ color: '#ef9ed4 !important' }} // Pastel-pink color with !important
      >
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink 
              href="/customer-service"
              className="font-bold hover:text-primary-green"
              style={{ color: '#ef9ed4 !important' }} // Pastel-pink color with !important
            >
              Visit our Customer Service page Click Here!
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Help;
