export const dynamic = 'force-dynamic';
import {
  fetchDataByInfinityQuery,
  fetchVerificationTotalData,
} from '@/app/(providers)/(root)/challenges/[id]/verification/_hooks/useVerification';
import Button from '@/components/Button';
import TitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import Mobile from '@/layouts/Mobile';
import { createClient } from '@/supabase/server';
import { verificationsType } from '@/types/challenge';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
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
        <Mobile
          headerLayout={<TitleHeader>챌린지 인증 목록</TitleHeader>}
          footerLayout={
            <div className="p-[10px]">
              <Link href={`/challenges/${params.id}/verification/register`}>
                <Button>인증하기</Button>
              </Link>
            </div>
          }
        >
          <VerificationList counts={counts} />
        </Mobile>
      </HydrationBoundary>
    </div>
  );
};

export default ChallengeVerificationListPage;
