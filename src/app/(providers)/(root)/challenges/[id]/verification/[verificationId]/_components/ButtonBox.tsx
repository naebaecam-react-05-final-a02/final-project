'use client';

import { createClient } from '@/supabase/client';
import { deleteVerification } from '@/utils/dataFetching';
import { useRouter } from 'next/navigation';

type ButtonBoxType = {
  challengeId: string;
  verificationId: string;
};

const ButtonBox = ({ challengeId, verificationId }: ButtonBoxType) => {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    try {
      const { data, error, details } = await deleteVerification(supabase, challengeId, verificationId);
      alert('데이터가 삭제되었습니다.');
      router.replace(`/challenges/${challengeId}/verification/list`);
    } catch (error) {
      alert('모종의 이유로 실패!');
    }
  };
  return (
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
        onClick={handleDelete}
      >
        삭제
      </button>
    </div>
  );
};

export default ButtonBox;
