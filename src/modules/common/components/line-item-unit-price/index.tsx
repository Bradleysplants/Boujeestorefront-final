import { formatAmount } from "@lib/util/prices"
import { LineItem, Region } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"

import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { CalculatedVariant } from "types/medusa"

type LineItemUnitPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemUnitPrice = ({
  item,
  region,
  style = "default",
}: LineItemUnitPriceProps) => {
  const originalPrice = (item.variant as CalculatedVariant).original_price
  const hasReducedPrice = (originalPrice * item.quantity || 0) > item.total!
  const reducedPrice = (item.total || 0) / item.quantity!

  return (
    <div className="flex flex-col text-pastel-pink justify-center h-full"> {/* Ensuring all text is pastel-pink */}
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-pastel-pink">Original: </span>
            )}
            <span className="line-through text-pastel-pink" data-testid="product-unit-original-price"> {/* Line-through price pastel-pink */}
              {formatAmount({
                amount: originalPrice,
                region: region,
                includeTaxes: false,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-pastel-pink">
              -{getPercentageDiff(originalPrice, reducedPrice || 0)}% {/* Discount percentage pastel-pink */}
            </span>
          )}
        </>
      )}
      <span
        className={clx("text-base-regular text-pastel-pink", { /* Final price pastel-pink */
          "text-pastel-pink": hasReducedPrice,
        })}
        data-testid="product-unit-price"
      >
        {formatAmount({
          amount: reducedPrice || item.unit_price || 0,
          region: region,
          includeTaxes: false,
        })}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
