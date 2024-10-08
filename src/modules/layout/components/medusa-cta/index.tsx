import { Text } from "@medusajs/ui"

import Medusa from "../../../common/icons/medusa"
import NextJs from "../../../common/icons/nextjs"

const MedusaCTA = () => {
  return (
    <Text className="flex gap-x-2 txt-compact-small-plus items-center">
      Powered by
      <a
        href="https://www.medusajs.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit MedusaJS website"
      >
        <Medusa fill="#9ca3af" className="fill-[#9ca3af]" aria-hidden="true" />
      </a>
      &
      <a
        href="https://nextjs.org"
        target="_blank"
        rel="noreferrer"
        aria-label="Visit Next.js website"
      >
        <NextJs fill="#9ca3af" aria-hidden="true" />
      </a>
    </Text>
  )
}

export default MedusaCTA
