import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6 bg-slate-gray p-4 rounded-md"> {/* Slate-gray background with padding and rounded corners */}
      <Heading className="text-pastel-pink text-base-semi font-bold"> {/* Pastel-pink bold heading */}
        Need help?
      </Heading>
      <div className="text-pastel-pink my-2 text-base-regular"> {/* Pastel-pink text */}
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink 
              href="/contact" 
              className="text-pastel-pink font-bold hover:text-primary-green" 
            > {/* Pastel-pink bold link with hover effect */}
              Contact
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink 
              href="/contact" 
              className="text-pastel-pink font-bold hover:text-primary-green" 
            > {/* Pastel-pink bold link with hover effect */}
              Returns & Exchanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
