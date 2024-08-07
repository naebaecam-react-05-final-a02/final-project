'use client';
import ChevronLeft from '@/icons/ChevronLeft';
import DotsVertical from '@/icons/DotsVertical';
import { useRouter } from 'next/navigation';

const Headert = () => {
  const router = useRouter();
  return (
    <header
      className="fixed w-full left-0 top-0 py-2 px-8 h-14 flex justify-between items-center z-10 text-white"
      style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.50)14.29%, rgba(0, 0, 0, 0.00)100%)' }}
    >
      <button onClick={() => router.back()} aria-label="뒤로가기">
        <ChevronLeft />
      </button>
      <h2 className="text-[14px] font-medium">챌린지 상세</h2>
      <DotsVertical width={24} height={24} />
    </header>
  );
};

export default Headert;
