import React from 'react';

const VerificationCardSkeleton = () => {
  return (
    <div className="bg-blue-200 p-4 flex flex-col gap-y-4 border border-gray-400 rounded-lg animate-pulse">
      <div className="flex gap-x-2 items-center">
        <div className="rounded-full bg-gray-200 size-8" />
        <div className="bg-gray-200 rounded-lg text-sm font-bold w-20 h-4" />
      </div>
      <div className="size-full ">
        <div className="w-full aspect-video bg-gray-200 " />
        <div className="text-xs font-bold p-2">
          <p className="w-full h-4 rounded-md bg-gray-200"></p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCardSkeleton;
