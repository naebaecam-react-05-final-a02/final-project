import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { fetchVerificationTotalData, getChallengeWithParticipants } from '../_hooks/useVerification';
import VerificationRegister from './_components/registerVerification/VerificationRegister';

const ChallengeVerificationRegisterPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();

  const response = await getChallengeWithParticipants(supabase, params.id);

  // 챌린지가 없거나 신청안한사람 접근
  if (!response || !response.isParticipant || response.isProgress !== 'RUN') {
    redirect(`/challenges/${params.id}/detail`);
    // return (
    //   <Mobile
    //     footerLayout={
    //       <Link className="w-full" href={'/'}>
    //         <Button>대시보드로 돌아가기</Button>
    //       </Link>
    //     }
    //   >
    //     <div className="size-full flex items-center justify-center select-none flex-col p-4 gap-y-4">
    //       <div className=" text-red-300 text-xl">잘못된 접근입니다.</div>
    //     </div>
    //   </Mobile>
    // );
  }

  const vData = await fetchVerificationTotalData(supabase, params.id);

  // console.log('verifications', vData.verifications);

  let userInfo = null;

  if (vData.verifications) {
    const userIds: string[] = vData.verifications.map((verification) => verification.user.id);

    const { data } = await supabase
      .from('users')
      .select('id,profileURL')
      .in('id', userIds)
      .returns<{ id: string; profileURL: string | null }[]>();

    userInfo = data;
  }

  // console.log('USERINFO___', userInfo);

  return (
    <VerificationRegister
      cid={params.id}
      userInfo={userInfo}
      challengeTitle={response.title}
      verifications={vData.verifications}
    />
  );
};

export default ChallengeVerificationRegisterPage;
