import React from "react";

const DashboardSkeleton = () => {
  return (
    <div className="max-w-full h-screen p-4 animate-pulse">
      <div className="flex h-full ">
        <div className="w-1/4 mr-4 ">
          <div className="bg-zinc-800 h-32 w-32 rounded-full mx-auto mb-4"></div>
          <div className="bg-zinc-800 h-6 w-3/4 mx-auto mb-2"></div>
          <div className="bg-zinc-800 h-4 w-1/2 mx-auto mb-4"></div>
          <div className="bg-zinc-800 h-10 w-full mb-2"></div>
          <div className="bg-zinc-800 h-10 w-full"></div>
        </div>
        <div className="flex flex-col h-full flex-grow">
          <div className="flex flex-row h-1/2 mb-4">
            <div className="bg-zinc-800 h-full w-1/2 rounded-lg mr-4"></div>
            <div className="bg-zinc-800 rounded-lg h-full w-1/2"></div>
          </div>
          <div className="bg-zinc-800 h-1/2 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
