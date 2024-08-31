import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse" role="status" aria-label="Loading product preview">
      <Container className="aspect-[9/16] w-full bg-gray-100 rounded-md" />
      <div className="flex justify-between text-base-regular mt-2">
        <div className="w-2/5 h-6 bg-gray-100 rounded"></div>
        <div className="w-1/5 h-6 bg-gray-100 rounded"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
