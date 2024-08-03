'use client';

import Mobile from '@/layouts/Mobile';
import MyChallenges from './_components/MyChallenges';
import PopularChallengesSlider from './_components/PopularChallengesSlider/PopularChallengesSlider';

const ChallengePage = () => {
  return (
    <Mobile>
      <section className="flex flex-col gap-6">
        <PopularChallengesSlider />
        <MyChallenges />
      </section>
    </Mobile>
  );
};

export default ChallengePage;
