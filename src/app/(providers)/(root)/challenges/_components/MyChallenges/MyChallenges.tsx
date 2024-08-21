import { joinedMyChallengesDataType } from '@/types/challenge';

import MyChallengeList from './_components/MyChallengeList';

interface MyChallengesProps {
  data: joinedMyChallengesDataType;
}

const MyChallenges = () => {
  return (
    <section className="flex flex-col gap-4">
      <MyChallengeList />
    </section>
  );
};

export default MyChallenges;
