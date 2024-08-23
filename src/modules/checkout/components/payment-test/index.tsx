import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge
      className={`bg-black text-pastel-pink border-2 border-pastel-pink font-bold ${className}`}
    >
      <span className="font-semibold">Attention:</span> For testing purposes
      only.
    </Badge>
  )
}

export default PaymentTest
