import Link from 'next/link';
import DashBoard from './_components/DashBoard';

const RootPage = () => {
  return (
    <div className="min-h-screen">
      <p>메인 페이지</p>
      <div className="flex flex-row gap-3">
        <Link
          className="bg-[#A6A6A6] rounded-md pt-2 pb-2 pl-6 pr-6 transition-all duration-300 ease-in-out hover:translate-y-1 active:translate-y-2 hover:shadow-md border-b-4 border-[#858585]"
          href={'/auth_test'}
        >
          Auth 관련
        </Link>
        <Link
          className="bg-[#A6A6A6] rounded-md pt-2 pb-2 pl-6 pr-6 transition-all duration-300 ease-in-out hover:translate-y-1 active:translate-y-2 hover:shadow-md border-b-4 border-[#858585]"
          href={'/challenge/detail/15'}
        >
          챌린지 상세 관련
        </Link>
      </div>
      <DashBoard />
    </div>
  );
};

export default RootPage;
