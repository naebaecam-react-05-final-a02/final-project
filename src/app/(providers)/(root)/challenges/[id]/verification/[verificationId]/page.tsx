import { createClient } from '@/supabase/server';
import { getVerification } from '@/utils/dataFetching';
import VerificationCard from '../list/_components/VerificationCard';

type VerificationDetailPageType = {
  params: {
    id: string;
    verificationId: string;
  };
};

const VerificationDetailPage = async ({ params }: VerificationDetailPageType) => {
  const { id, verificationId } = params;
  const supabase = createClient();
  const verification = await getVerification(supabase, id, verificationId);

  return (
    <main>
      <VerificationCard verification={verification} type="detail" />
      <div className="flex w-full justify-between gap-x-2 my-2 select-none">
        <button
          className="w-full bg-blue-300 hover:bg-blue-400 hover:shadow-lg 
        active:shadow-[inset_0_4px_8px_blue]
        rounded py-2 text-white font-bold"
        >
          수정
        </button>
        <button
          className="w-full bg-red-300 hover:bg-red-400 hover:shadow-lg 
        active:shadow-[inset_0_4px_8px_red]
        rounded py-2 text-white font-bold"
        >
          삭제
        </button>
      </div>
    </main>
  );
};

export default VerificationDetailPage;
