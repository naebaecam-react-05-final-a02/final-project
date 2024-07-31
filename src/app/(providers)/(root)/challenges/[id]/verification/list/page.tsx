export const dynamic = 'force-dynamic';
import {
  fetchDataByInfinityQuery,
  fetchVerificationTotalData,
} from '@/app/(providers)/(root)/challenges/[id]/verification/_hooks/useVerification';
import { createClient } from '@/supabase/server';
import { verificationsType } from '@/types/challenge';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import VerificationList from './_components/VerificationList';

//TODO hooks 작업?
const ChallengeVerificationListPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  const supabase = createClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['verifications'],
    queryFn: () => fetchDataByInfinityQuery(supabase, params.id),
    getNextPageParam: (lastPage: verificationsType[], allPage: verificationsType[][]) => {
      const nextPage = lastPage.length ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 0,
    staleTime: Infinity,
  });

  const counts = await fetchVerificationTotalData(supabase, params.id);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VerificationList counts={counts} />
      </HydrationBoundary>
    </div>
  );
};

export default ChallengeVerificationListPage;
