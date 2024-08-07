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
        <WritingButton />
      </section>
    </Mobile>
  );
};

export default ChallengePage;
