import Link from 'next/link';
import DashBoard from './_components/DashBoard';

const data = [
  { weight: 60, date: '07-01' },
  { weight: 62, date: '07-02' },
  { weight: 63, date: '07-03' },
  { weight: 63, date: '07-04' },
  { weight: 64, date: '07-05' },
  { weight: 65, date: '07-06' },
  { weight: 65, date: '07-07' },
  { weight: 66, date: '07-08' },
  { weight: 65, date: '07-09' },
  { weight: 63, date: '07-10' },
  { weight: 61, date: '07-11' },
  { weight: 59, date: '07-12' },
  { weight: 58, date: '07-13' },
  { weight: 58, date: '07-14' },
  { weight: 60, date: '07-15' },
  { weight: 63, date: '07-16' },
  { weight: 64, date: '07-16' },
  { weight: 63, date: '07-17' },
  { weight: 65, date: '07-18' },
  { weight: 66, date: '07-19' },
  { weight: 65, date: '07-20' },
  { weight: 63, date: '07-21' },
  { weight: 62, date: '07-22' },
  { weight: 61, date: '07-23' },
  { weight: 59, date: '07-24' },
  { weight: 58, date: '07-25' },
  { weight: 57, date: '07-26' },
  { weight: 55, date: '07-28' },
  { weight: 57, date: '07-29' },
  { weight: 58, date: '07-30' },
  { weight: 59, date: '07-31' },

  // { weight: 60, date: '08-01' },
  // { weight: 62, date: '08-02' },
  // { weight: 63, date: '08-03' },
  // { weight: 63, date: '08-04' },
  // { weight: 64, date: '08-05' },
  // { weight: 65, date: '08-06' },
  // { weight: 65, date: '08-07' },
  // { weight: 66, date: '08-08' },
  // { weight: 65, date: '08-09' },
  // { weight: 63, date: '08-10' },
  // { weight: 61, date: '08-11' },
  // { weight: 59, date: '08-12' },
  // { weight: 58, date: '08-13' },
  // { weight: 58, date: '08-14' },
  // { weight: 60, date: '08-15' },
  // { weight: 63, date: '08-16' },
  // { weight: 64, date: '08-16' },
  // { weight: 63, date: '08-17' },
  // { weight: 65, date: '08-18' },
  // { weight: 66, date: '08-19' },
  // { weight: 65, date: '08-20' },
  // { weight: 63, date: '08-21' },
  // { weight: 62, date: '08-22' },
  // { weight: 61, date: '08-23' },
  // { weight: 59, date: '08-24' },
  // { weight: 58, date: '08-25' },
  // { weight: 57, date: '08-26' },
  // { weight: 55, date: '08-28' },
  // { weight: 57, date: '08-29' },
  // { weight: 58, date: '08-30' },
  // { weight: 59, date: '08-31' },
];

// 식단은 넘기는거 말고 오늘것만
// 체중은

const getDate = () => {};

const RootPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
  console.log('QUERY___', query);
  return (
    <div className="h-screen">
      <Link
        className="bg-[#A6A6A6] rounded-md pt-2 pb-2 pl-6 pr-6 transition-all duration-300 ease-in-out hover:translate-y-1 active:translate-y-2 hover:shadow-md border-b-4 border-[#858585]"
        href={'/auth_test'}
      >
        Auth 관련
      </Link>
      <DashBoard />
    </div>
  );
};

export default RootPage;
