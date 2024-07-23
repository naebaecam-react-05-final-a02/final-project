'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const DateRange = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRange = (range: string) => {
    const params = new URLSearchParams(searchParams);
    if (typeof range === 'string') {
      params.set('query', range);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex text-xs gap-x-2 justify-around">
      <button onClick={() => handleRange('last_7_days')} className=" bg-blue-300 flex-1 py-px px-2 rounded">
        7일
      </button>
      <button onClick={() => handleRange('last_30_days')} className=" bg-blue-300 flex-1 py-px px-2 rounded">
        30일
      </button>
      <button onClick={() => handleRange('last_90_days')} className=" bg-blue-300 flex-1 py-px px-2 rounded">
        90일
      </button>
      <button onClick={() => handleRange('last_365_days')} className=" bg-blue-300 flex-1 py-px px-2 rounded">
        365일
      </button>
      <button onClick={() => handleRange('all_time')} className=" bg-blue-300 flex-1 py-px px-2 rounded">
        All
      </button>
    </div>
  );
};

export default DateRange;
