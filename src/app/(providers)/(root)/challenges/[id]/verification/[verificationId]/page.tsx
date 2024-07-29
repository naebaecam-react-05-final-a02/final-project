import { createClient } from '@/supabase/server';
import { getVerification } from '@/utils/dataFetching';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import VerificationDetail from './_components/VerificationDetail';

type VerificationDetailPageType = {
  params: {
    id: string;
    verificationId: string;
  };
};

const VerificationDetailPage = async ({ params }: VerificationDetailPageType) => {
  const { id: challengeId, verificationId } = params;
  const supabase = createClient();
  const queryClient = new QueryClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await queryClient.prefetchQuery({
    queryKey: ['verifications', { cid: challengeId, vid: verificationId }],
    queryFn: () => getVerification(supabase, challengeId, verificationId),
    staleTime: Infinity,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VerificationDetail challengeId={challengeId} verificationId={verificationId} user={user!} />
      </HydrationBoundary>
    </main>
  );
};

export default VerificationDetailPage;
