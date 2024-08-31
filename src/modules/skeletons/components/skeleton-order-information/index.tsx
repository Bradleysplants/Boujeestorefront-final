import SkeletonCartTotals from "@modules/skeletons/components/skeleton-cart-totals"

const SkeletonOrderInformation = () => {
  return (
    <div className="bg-slate-gray p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10 border-b border-darker-slate-gray">
        <div className="flex flex-col">
          <div className="w-32 h-4 bg-darker-slate-gray mb-4 rounded-md"></div>
          <div className="w-2/6 h-3 bg-darker-slate-gray rounded-md"></div>
          <div className="w-3/6 h-3 bg-darker-slate-gray my-2 rounded-md"></div>
          <div className="w-1/6 h-3 bg-darker-slate-gray rounded-md"></div>
        </div>
        <div className="flex flex-col">
          <div className="w-32 h-4 bg-darker-slate-gray mb-4 rounded-md"></div>
          <div className="w-2/6 h-3 bg-darker-slate-gray rounded-md"></div>
          <div className="w-3/6 h-3 bg-darker-slate-gray my-2 rounded-md"></div>
          <div className="w-2/6 h-3 bg-darker-slate-gray rounded-md"></div>
          <div className="w-1/6 h-3 bg-darker-slate-gray mt-2 rounded-md"></div>
          <div className="w-32 h-4 bg-darker-slate-gray my-4 rounded-md"></div>
          <div className="w-1/6 h-3 bg-darker-slate-gray rounded-md"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10">
        <div className="flex flex-col">
          <div className="w-32 h-4 bg-darker-slate-gray mb-4 rounded-md"></div>
          <div className="w-2/6 h-3 bg-darker-slate-gray rounded-md"></div>
          <div className="w-3/6 h-3 bg-darker-slate-gray my-4 rounded-md"></div>
        </div>

        <SkeletonCartTotals />
      </div>
    </div>
  )
}

export default SkeletonOrderInformation
