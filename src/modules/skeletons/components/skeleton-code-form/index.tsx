const SkeletonCodeForm = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-slate-gray h-7 w-24 mb-4 rounded-md animate-pulse"></div>
      <div className="grid grid-cols-[1fr_80px] gap-x-2">
        <div className="bg-darker-slate-gray h-12 rounded-md animate-pulse"></div>
        <div className="bg-darker-slate-gray h-12 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}

export default SkeletonCodeForm;
