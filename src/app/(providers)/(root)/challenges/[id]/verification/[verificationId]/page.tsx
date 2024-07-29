'use client';

import { queryClient } from '@/providers/QueryProvider';
import { verificationsType } from '@/types/challenge';
import { usePathname } from 'next/navigation';
import VerificationCard from '../list/_components/VerificationCard';

type queryDataType = {
  pages: verificationsType[][];
};

//TODO caching 데이터 없어지면 에러뜸, SSR로 변경 후 다시 받아와야할듯?
const VerificationDetailPage = () => {
  const path = usePathname();
  const pathArr = path.split('/');
  const pathData = {
    challengeId: Number(pathArr[2]),
    verificationId: Number(pathArr.at(-1)),
  };
  const queryData = queryClient.getQueryData<queryDataType>(['verifications']);
  const verification = queryData?.pages
    .flat()
    .find((data) => data.challengeId == pathData.challengeId && data.id == pathData.verificationId);

  console.log(verification);

  return (
    <main>
      <VerificationCard verification={verification!} type="detail" />
      <div className="flex w-full justify-between gap-x-2 my-2">
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
