const SkeletonButton = () => {
  return (
    <div
      className="w-full min-h-[50px] px-5 py-[10px] bg-darker-slate-gray rounded animate-pulse"
      style={{
        backgroundColor: '#0b1e35', // Slate gray background color
        borderColor: '#58576B', // Darker slate gray border color
        color: '#ef9ed4', // Pastel pink text color (if needed for text inside)
      }}
      aria-hidden="true"
    ></div>
  );
}

export default SkeletonButton;
