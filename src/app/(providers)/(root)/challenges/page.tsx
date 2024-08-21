import Mobile from '@/layouts/Mobile';
import MyChallenges from './_components/MyChallenges';
import PopularChallengesSlider from './_components/PopularChallengesSlider/PopularChallengesSlider';
import WritingButton from './_components/WritingButton';

const ChallengePage = async () => {
  return (
    <Mobile>
      <section className="flex flex-col gap-6">
        <PopularChallengesSlider />
        <MyChallenges />
        <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
          <div className="max-w-[800px] mx-auto px-4 relative">
            <div className="absolute bottom-24 right-4 md:right-10 pointer-events-auto">
              <WritingButton />
            </div>
          </div>
        </div>
      </section>
    </Mobile>
  );
};

export default ChallengePage;
