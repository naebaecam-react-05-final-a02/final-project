'use client';
import { createClient } from '@/supabase/client';
import { fetchData } from '@/utils/utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import VerificationCard from './VerificationCard';

const VerificationList = () => {
  const supabase = createClient();

  const { data } = useInfiniteQuery({
    queryKey: ['ABC'],
    queryFn: () => fetchData(supabase),
    getNextPageParam: (lastPage: any) => lastPage.length + 1,
    initialPageParam: 0,
  });

  console.log('DATA___', data);
  return (
    <ul className="flex flex-col gap-y-4">
      {Array.from({ length: 4 }, () => '1').map((_, i) => (
        <li key={i}>
          <VerificationCard />
        </li>
      ))}
    </ul>
  );
};

export default VerificationList;
