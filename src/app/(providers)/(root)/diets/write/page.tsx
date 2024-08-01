'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import DietForm from './_components/DietForm';
import LeftIcon from '/public/icons/chevron-left.svg';

const PostDietPage = () => {
  const router = useRouter();
  const isEditMode = useSearchParams().get('mode') === 'edit';

  return (
    // TODO: svg bg 뒤에 있는 것들은 나중에 빼야할 듯
    <div className="flex flex-col gap-8 bg-[url('/bg.svg')] text-white leading-normal tracking-[-0.35px]">
      <header className="flex justify-between items-center">
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
      </header>
      <DietForm />
    </div>
  );
};

export default PostDietPage;
