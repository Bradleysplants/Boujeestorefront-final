import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string; // Allow external styling
  "aria-label"?: string; // Allow setting an aria-label for accessibility
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className, // Destructure className from props
  "aria-label": ariaLabel, // Destructure aria-label from props
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={`flex gap-x-1 items-center group ${className}`} // Use template literal to include external className
      href={href}
      onClick={onClick}
      aria-label={ariaLabel} // Add aria-label for accessibility
      {...props}
    >
      <Text className="text-pastel-pink underline group-hover:text-primary-green font-bold">
        {children}
      </Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
        color="var(--pastel-pink)"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
