import Mobile from '@/layouts/Mobile';
import Link from 'next/link';
import ChallengeList from '../_components/ChallengeList';
import OrderTab from './_components/OrderTab/OrderTab';

const AllChallengesPage = () => {
  return (
    <Mobile>
      <section className="px-4 flex flex-col gap-2">
        <div className="w-full flex justify-end text-primary-100">
          <Link href={'/challenges/register'}>글 작성하기</Link>
        </div>
        <OrderTab />
        <ChallengeList />
      </section>
    </Mobile>
  );
};

export default AllChallengesPage;
