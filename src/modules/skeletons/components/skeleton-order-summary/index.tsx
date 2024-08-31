import SkeletonButton from "@modules/skeletons/components/skeleton-button";
import SkeletonCartTotals from "@modules/skeletons/components/skeleton-cart-totals";

const SkeletonOrderSummary = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <SkeletonCartTotals header={false} />
      <div className="mt-4">
        <SkeletonButton />
      </div>
    </div>
  );
};

export default SkeletonOrderSummary;
