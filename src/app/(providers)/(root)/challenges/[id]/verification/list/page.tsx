export const dynamic = 'force-dynamic';
import {
  fetchDataByInfinityQuery,
  fetchVerificationTotalData,
  getChallengeWithParticipants,
} from '@/app/(providers)/(root)/challenges/[id]/verification/_hooks/useVerification';
import Button from '@/components/Button';
import { createClient } from '@/supabase/server';
import { verificationsType } from '@/types/challenge';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import VerificationList from './_components/VerificationList';

//TODO hooks 작업?
//TODO 인증은 한사람당 하루에 한번?
const ChallengeVerificationListPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  const supabase = createClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['verifications', { cid: params.id }],
    queryFn: () => fetchDataByInfinityQuery(supabase, params.id),
    getNextPageParam: (lastPage: verificationsType[], allPage: verificationsType[][]) => {
      const nextPage = lastPage.length ? allPage.length : undefined;
      return nextPage;
    },
    initialPageParam: 0,
    staleTime: Infinity,
  });

  const counts = await fetchVerificationTotalData(supabase, params.id);
  const cData = await getChallengeWithParticipants(supabase, params.id);

  // console.log(cData?.isProgress);

  const bottomButton = (
    <div className="w-full ">
      {cData?.isProgress === 'RUN' ? (
        <Link className="flex-1 " href={`/challenges/${params.id}/verification/register`}>
          <Button>인증하기</Button>
        </Link>
      ) : (
        <Button disabled>아직 시작하지 않았어요!</Button>
      )}
    </div>
  );

  return (
    <div className="relative">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VerificationList counts={counts} title={cData?.title ?? '챌린지 이름을 불러오지 못했어요..'} />
        {cData?.isParticipant && bottomButton}
      </HydrationBoundary>
    </div>
  );
};

export default ChallengeVerificationListPage;
