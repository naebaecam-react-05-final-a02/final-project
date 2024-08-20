import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import { redirect } from 'next/navigation';
import ChallengeUpdate from './_components/ChallengeUpdate';

type ChallengeUpdatePageProp = {
  params: {
    id: string;
    verificationId: string;
  };
};

const ChallengeUpdatePage = async ({ params }: ChallengeUpdatePageProp) => {
  const { id: cid } = params;
  const supabase = createClient();

  const {
    data: { user: me },
  } = await supabase.auth.getUser();

  const { data: challenge } = await supabase
    .from('challenges')
    .select('*')
    .match({ createdBy: me?.id, id: cid })
    .single<Tables<'challenges'>>();

  // console.log('누가 인증 글 썼느냐?', user?.createdBy);
  // console.log('그렇다면 너는 누구더냐?', me?.id);

  if (!me || challenge?.createdBy !== me?.id) {
    // console.log('저놈을 매우 쳐라!');
    return redirect(`/challenges`);
  }

  return (
    <div className="size-full">
      <ChallengeUpdate challenge={challenge} />
    </div>
  );
};

export default ChallengeUpdatePage;
