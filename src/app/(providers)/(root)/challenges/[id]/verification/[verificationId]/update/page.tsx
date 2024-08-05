import { queryOptions } from '@/hooks/challenge/queries';
import Mobile from '@/layouts/Mobile';
import { createClient } from '@/supabase/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import VerificationUpdate from './_components/VerificationUpdate';

type VerificationUpdatePageProps = {
  params: {
    id: string;
    verificationId: string;
  };
};

const VerificationUpdatePage = async ({ params }: VerificationUpdatePageProps) => {
  const { id: cid, verificationId: vid } = params;
  const supabase = createClient();
  const queryClient = new QueryClient();

  const {
    data: { user: me },
  } = await supabase.auth.getUser();
  const { data: user } = await supabase
    .from('challengeVerify')
    .select('userId')
    .match({ id: vid, challengeId: cid })
    .single<{ userId: string }>();

  // console.log('누가 인증 글 썼느냐?', user?.userId);
  // console.log('그렇다면 너는 누구더냐?', me?.id);

  if (!me || user?.userId !== me?.id) {
    // console.log("저놈을 매우 쳐라!")
    return redirect(`/challenges/${cid}/verification/list`);
  }

  await queryClient.prefetchQuery(queryOptions.getVerification(supabase, cid, vid));

  return (
    <Mobile>
      <div className="size-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <VerificationUpdate cid={cid} vid={vid} me={me} />
        </HydrationBoundary>
      </div>
    </Mobile>
  );
};

export default VerificationUpdatePage;
