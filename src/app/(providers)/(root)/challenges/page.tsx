import Mobile from '@/layouts/Mobile';
import api from '@/service/service';
import { createClient } from '@/supabase/server';
import MyChallenges from './_components/MyChallenges';
import PopularChallengesSlider from './_components/PopularChallengesSlider/PopularChallengesSlider';
import WritingButton from './_components/WritingButton';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'default-no-store';

const ChallengePage = async () => {
  const supabase = createClient();
  const data = await api.dashboard.getJoinedMyChallenges(supabase);

  if (!data) return <p>Loading...</p>;
  return (
    <Mobile>
      <section className="flex flex-col gap-6">
        <PopularChallengesSlider />
        <MyChallenges data={data} />
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
