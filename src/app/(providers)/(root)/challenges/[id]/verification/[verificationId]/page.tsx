import { createClient } from '@/supabase/server';
import { getVerification } from '@/utils/dataFetching';
import VerificationCard from '../list/_components/VerificationCard';
import ButtonBox from './_components/ButtonBox';

type VerificationDetailPageType = {
  params: {
    id: string;
    verificationId: string;
  };
};

const VerificationDetailPage = async ({ params }: VerificationDetailPageType) => {
  const { id: challengeId, verificationId } = params;
  const supabase = createClient();
  const { data: verification, error, details } = await getVerification(supabase, challengeId, verificationId);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      {error && (
        <div className="bg-red-500 text-white font-bold p-2">
          <div className="text-lg">{error}</div>
          <div className="text-sm">{details}</div>
        </div>
      )}
      {verification && (
        <>
          <VerificationCard verification={verification} type="detail" />
          {verification?.users.id === user?.id && (
            <ButtonBox challengeId={challengeId} verificationId={verificationId} />
          )}
        </>
      )}
    </main>
  );
};

export default VerificationDetailPage;
