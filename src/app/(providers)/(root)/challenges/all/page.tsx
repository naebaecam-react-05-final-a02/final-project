import Categories from '../_components/Categories';
import AllChallengeList from './_components/AllChallengeList';

const AllChallengesPage = () => {
  return (
    <div className="px-4 h-full">
      <div className="flex flex-col gap-4 w-full h-full">
        <div className="flex justify-start items-center">
          <h2 className="font-bold text-3xl">챌린지</h2>
        </div>
        <Categories />
        <AllChallengeList />
      </div>
    </div>
  );
};

export default AllChallengesPage;
