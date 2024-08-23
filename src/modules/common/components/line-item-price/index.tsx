import { formatAmount } from "@lib/util/prices"
import { LineItem, Region } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"

import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { CalculatedVariant } from "types/medusa"

type LineItemPriceProps = {
  item: Omit<LineItem, "beforeInsert">
  region: Region
  style?: "default" | "tight"
}

const LineItemPrice = ({
  item,
  region,
  style = "default",
}: LineItemPriceProps) => {
  const originalPrice =
    (item.variant as CalculatedVariant).original_price * item.quantity
  const hasReducedPrice = (item.total || 0) < originalPrice

  return (
    <div className="flex flex-col gap-x-2 items-end text-pastel-pink"> {/* Ensuring all text is pastel-pink */}
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p>
              {style === "default" && (
                <span className="text-pastel-pink">Original: </span>
              )}
              <span className="line-through text-pastel-pink" data-testid="product-original-price"> {/* Line-through price pastel-pink */}
                {formatAmount({
                  amount: originalPrice,
                  region: region,
                  includeTaxes: false,
                })}
              </span>
            </p>
            {style === "default" && (
              <span className="text-pastel-pink">
                -{getPercentageDiff(originalPrice, item.total || 0)}% {/* Discount percentage pastel-pink */}
              </span>
            )}
          </>
        )}
        <span
          className={clx("text-base-regular text-pastel-pink", { /* Final price pastel-pink */
            "text-pastel-pink": hasReducedPrice,
          })}
          data-testid="product-price"
        >
          {formatAmount({
            amount: item.total || 0,
            region: region,
            includeTaxes: false,
          })}
        </span>
      </div>
    </div>
  )
}

export default LineItemPrice
