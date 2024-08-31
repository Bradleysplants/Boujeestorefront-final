const SkeletonCartTotals = ({ header = true }) => {
  return (
    <div className="flex flex-col">
      {header && <div className="w-32 h-4 bg-slate-gray mb-4 rounded-md animate-pulse"></div>}
      
      <div className="flex items-center justify-between">
        <div className="w-32 h-3 bg-darker-slate-gray rounded-md animate-pulse"></div>
        <div className="w-32 h-3 bg-darker-slate-gray rounded-md animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="w-24 h-3 bg-slate-gray rounded-md animate-pulse"></div>
        <div className="w-24 h-3 bg-slate-gray rounded-md animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="w-28 h-3 bg-darker-slate-gray rounded-md animate-pulse"></div>
        <div className="w-20 h-3 bg-darker-slate-gray rounded-md animate-pulse"></div>
      </div>

      <div className="w-full border-b border-primary-green border-dashed my-4"></div>

      <div className="flex items-center justify-between">
        <div className="w-32 h-6 bg-slate-gray mb-4 rounded-md animate-pulse"></div>
        <div className="w-24 h-6 bg-slate-gray mb-4 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}

export default SkeletonCartTotals;
