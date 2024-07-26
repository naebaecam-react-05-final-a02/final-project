import { createClient } from '@/supabase/server';
import { verificationsType } from '@/types/challenge';
import { fetchDataByInfinityQuery, fetchVerificationTotalData } from '@/utils/dataFetching';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import VerificationList from './_components/VerificationList';

//TODO hooks 작업?
//TODO dashboard랑 합친 다음에 오늘 데이터 뽑아오도록 변경해야함(getStartDayISO)
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
