import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed";

export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <SkeletonOrderConfirmed />
      <span className="sr-only">Loading order confirmation details...</span>
    </div>
  );
}
