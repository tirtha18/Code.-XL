const SheetSkeletonLoader = ({ count = 8 }) => {
    return (
      <div className="grid sm:grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="p-5 rounded-xl h-44 flex flex-col bg-zinc-800 animate-pulse"
          >
            <div className="flex flex-row items-center mb-3">
              <div className="w-8 h-8 mr-3 bg-zinc-700 rounded"></div>
              <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
            </div>
            <div className="flex-grow"></div>
            <div className="h-4 bg-zinc-700 rounded w-1/4 mt-auto"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default SheetSkeletonLoader;