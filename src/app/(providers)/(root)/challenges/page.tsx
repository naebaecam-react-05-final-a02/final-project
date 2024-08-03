'use client';

import MyChallenges from './_components/MyChallenges';
import PopularChallengesSlider from './_components/PopularChallengesSlider/PopularChallengesSlider';

const ChallengePage = () => {
  return (
    <section className="flex flex-col gap-6">
      <PopularChallengesSlider />
      <MyChallenges />
    </section>
  );
};

export default ChallengePage;
