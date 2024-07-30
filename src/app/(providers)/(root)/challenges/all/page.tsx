import Mobile from '@/layouts/Mobile';
import Categories from '../_components/Categories';
import AllChallengeList from './_components/AllChallengeList';

const AllChallengesPage = () => {
  return (
    <Mobile>
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex justify-start items-center">
          <h2 className="font-bold text-3xl">챌린지</h2>
        </div>
        <Categories />
        <AllChallengeList />
      </div>
    </Mobile>
  );
};

export default AllChallengesPage;
