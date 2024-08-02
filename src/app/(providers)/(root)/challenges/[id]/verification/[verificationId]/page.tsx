import { queryOptions } from '@/hooks/challenge/queries';
import { createClient } from '@/supabase/server';
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

  await queryClient.prefetchQuery(queryOptions.getVerification(supabase, challengeId, verificationId));

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VerificationDetail challengeId={challengeId} verificationId={verificationId} />
      </HydrationBoundary>
    </main>
  );
};

export default VerificationDetailPage;
