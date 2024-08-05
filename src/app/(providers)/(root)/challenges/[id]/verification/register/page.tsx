import Button from '@/components/Button';
import Mobile from '@/layouts/Mobile';
import { createClient } from '@/supabase/server';
import Link from 'next/link';
import { fetchVerificationTotalData } from '../_hooks/useVerification';
import VerificationRegister from './_components/registerVerification/VerificationRegister';

const ChallengeVerificationRegisterPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createClient();

  const response = await supabase.from('challenges').select('title', { count: 'exact' }).eq('id', params.id).single();

  // console.log('해당 챌린지 있는지 확인 COUNT___', data, count);
  // 챌린지가 없을 경우
  if (!response.count) {
    return (
      <div className="size-full flex items-center justify-center select-none flex-col p-4 gap-y-4">
        <div className=" text-red-300 text-xl">잘못된 접근입니다.</div>
        <Link className="w-full" href={'/'}>
          <Button>대시보드로 돌아가기</Button>
        </Link>
      </div>
    );
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
    <Mobile>
      <VerificationRegister
        cid={params.id}
        userInfo={userInfo}
        challengeTitle={response.data.title}
        verifications={vData.verifications}
      />
    </Mobile>
  );
};

export default ChallengeVerificationRegisterPage;

/**
 * if (!response.count) {
    return (
      <div className="size-full flex items-center justify-center select-none flex-col p-4 gap-y-4">
        <div className=" text-red-300 text-xl">잘못된 접근입니다.</div>
        <Link className="w-full" href={'/'}>
          <Button>대시보드로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  const data = await fetchVerificationTotalData(supabase, params.id);

  console.log('verifications', data.verifications);

  return (
    <Mobile>
      <VerificationRegister
        cid={params.id}
        challengeTitle={response.data.title}
        verifications={data.verifications}
        totalUsers={data.totalUsers}
      />
    </Mobile>
  );
 * 
 * 
 */
