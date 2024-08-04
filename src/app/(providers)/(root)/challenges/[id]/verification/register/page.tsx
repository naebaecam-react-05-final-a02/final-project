import Button from '@/components/Button';
import Mobile from '@/layouts/Mobile';
import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { getStartOfDayISO } from '@/utils/dateFormatter';
import Link from 'next/link';
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

  const { data: verifications } = await supabase
    .from('challengeVerify')
    .select('*')
    .eq('challengeId', params.id)
    .returns<Tables<'challengeVerify'>[]>();

  let userInfo = null;

  if (verifications) {
    const userIds = verifications.map((verification) => verification.userId);
    const { data } = await supabase
      .from('users')
      .select('id,profileURL')
      .gte('date', getStartOfDayISO())
      .lte('date', getStartOfDayISO())
      .in('id', userIds)
      .returns<{ id: string; profileURL: string | null }[]>();

    userInfo = data;
  }

  return (
    <Mobile>
      <VerificationRegister params={params} userInfo={userInfo} challengeTitle={response.data.title} />
    </Mobile>
  );
};

export default ChallengeVerificationRegisterPage;
