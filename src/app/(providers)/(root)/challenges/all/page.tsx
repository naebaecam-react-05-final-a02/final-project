import Mobile from '@/layouts/Mobile';
import ChallengeList from '../_components/ChallengeList';
import OrderTab from './_components/OrderTab/OrderTab';

const AllChallengesPage = () => {
  return (
    <Mobile>
      <section className="px-4 flex flex-col gap-2">
        <OrderTab />
        <p className="text-white/50 text-[12px]">총 999개의 챌린지가 있습니다.</p>
        <ChallengeList />
      </section>
    </Mobile>
  );
};

export default AllChallengesPage;
