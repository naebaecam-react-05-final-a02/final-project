import Mobile from '@/layouts/Mobile';
import ChallengeList from '../_components/ChallengeList';
import OrderTab from './_components/OrderTab/OrderTab';

const AllChallengesPage = () => {
  return (
    <Mobile>
      <section className="px-4 flex flex-col gap-2">
        <OrderTab />

        <ChallengeList />
      </section>
    </Mobile>
  );
};

export default AllChallengesPage;
