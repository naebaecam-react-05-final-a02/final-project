'use client';

import { RANGE_OPTIONS } from '@/utils/dateFormatter';
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
      {Object.entries(RANGE_OPTIONS).map(([key, value]) => (
        <button
          key={key}
          onClick={() => handleRange(key)}
          className="bg-white rounded py-px flex-1 hover:shadow-md active:shadow-[inset_0_2px_4px_gray]"
        >
          {value.label}
        </button>
      ))}
    </div>
  );
};

export default DateRange;
