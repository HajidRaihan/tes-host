import React from 'react';
import { Skeleton } from '@nextui-org/react';

const DetailSekeleton = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex gap-5 h-96">
        <Skeleton className="w-1/3 h-full" />
        <div className="w-full flex flex-col gap-3">
          <Skeleton className="w-full h-10"></Skeleton>
          <Skeleton className="w-full h-10"></Skeleton>
          <Skeleton className="w-full h-10"></Skeleton>
          <Skeleton className="w-full h-10"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default DetailSekeleton;
