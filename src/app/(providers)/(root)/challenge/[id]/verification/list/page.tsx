import { createClient } from '@/supabase/server';
import { verificationsType } from '@/types/challenge';
import { fetchDataByInfinityQuery } from '@/utils/dataFetching';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import VerificationList from './_components/VerificationList';

const ChallengeVerificationListPage = async () => {
  const queryClient = new QueryClient();
  const supabase = createClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['verifications'],
    queryFn: () => fetchDataByInfinityQuery(supabase),
    getNextPageParam: (lastPage: verificationsType[], allPage: verificationsType[][]) => {
      const nextPage = lastPage.length ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 0,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VerificationList />
      </HydrationBoundary>
    </div>
  );
};

export default ChallengeVerificationListPage;
