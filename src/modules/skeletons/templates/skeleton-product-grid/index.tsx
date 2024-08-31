import repeat from "@lib/util/repeat";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";

const SkeletonRelatedProducts = ({ className = "" }) => {
  return (
    <div className={`product-page-constraint ${className}`}>
      <div className="flex flex-col gap-4 items-center text-center mb-8" role="status" aria-label="Loading related products">
        <div className="w-16 h-4 animate-pulse bg-slate-gray" aria-hidden="true"></div>
        <div className="flex flex-col gap-2 items-center text-center mb-8">
          <div className="w-72 h-8 animate-pulse bg-slate-gray" aria-hidden="true"></div>
          <div className="w-36 h-6 animate-pulse bg-slate-gray" aria-hidden="true"></div>
        </div>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-6 flex-1" aria-label="Related products list">
        {repeat(8).map((index) => (
          <li key={index} role="status" aria-label="Loading product">
            <SkeletonProductPreview />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkeletonRelatedProducts;
