import React from 'react';
import { Skeleton } from '@nextui-org/react';

const GrafikSkeleton = () => {
  return (
    <div className="lg:m-3 mt-3 mb-10 w-1/2 col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex"></div>

      <div className="mb-10">
        <Skeleton id="chartTwo" className="-ml-5 -mb-9 h-[350px]"></Skeleton>
      </div>
    </div>
  );
};

export default GrafikSkeleton;
