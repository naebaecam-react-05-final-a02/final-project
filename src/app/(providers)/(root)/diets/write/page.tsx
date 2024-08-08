'use client';
import Header from '@/components/Header';
import Mobile from '@/layouts/Mobile';
import { useRouter } from 'next/navigation';
import DietForm from './_components/DietForm';

const PostDietPage = ({ searchParams }: { searchParams: { mode: string } }) => {
  const router = useRouter();
  const isEditMode = searchParams.mode === 'edit';

  return (
    <Mobile
      headerLayout={
        <Header
          title={`식단 추가하기`}
          // titleIcon={<DownIcon />}
        />
      }
    >
      <div className="flex flex-col">
        <span className="w-10 mb-8" aria-hidden="true" role="presentation"></span>
        {/* <header className="flex justify-between items-center">
          <button
            className="flex w-10 h-10 justify-center items-center rounded-xl backdrop-blur-[5px] shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_hsla(0, 0%, 100%, 0.1)]"
            onClick={() => {
              router.back();
            }}
          >
            <LeftIcon />
          </button>
          <h1 className="text-center text-sm font-semibold">식단 {isEditMode ? '수정' : '추가'}하기</h1>
          <div className="w-10"></div>
        </header> */}
        <DietForm />
      </div>
    </Mobile>
  );
};

export default PostDietPage;
