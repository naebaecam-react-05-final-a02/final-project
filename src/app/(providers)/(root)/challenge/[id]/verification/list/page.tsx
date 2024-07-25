import { createClient } from '@/supabase/server';
import { fetchData } from '@/utils/utils';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import VerificationList from './_components/VerificationList';

const ChallengeVerificationListPage = async () => {
  const queryClient = new QueryClient();
  const supabase = createClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['ABC'],
    queryFn: () => fetchData(supabase),
    getNextPageParam: (lastPage: any) => lastPage.length + 1,
    initialPageParam: 0,
  });

  return (
    <div className="bg-red-200">
      <h4 className="text-right text-xs font-bold mb-5">오늘 벌써 총 456명이 인증했어요!</h4>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VerificationList />
      </HydrationBoundary>
    </div>
  );
};

export default ChallengeVerificationListPage;
