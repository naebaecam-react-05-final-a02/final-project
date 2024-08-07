import Mobile from '@/layouts/Mobile';

import api from '@/service/service';
import { createClient } from '@/supabase/server';
import PopularChallengesSlider from './_components/PopularChallengesSlider/PopularChallengesSlider';
import WritingButton from './_components/WritingButton';

const ChallengePage = async () => {
  const supabase = createClient();
  const { data } = await api.dashboard.getJoinedChallenges(supabase);

  if (!data) return <></>;
  return (
    <Mobile>
      <section className="flex flex-col gap-6">
        <PopularChallengesSlider />
        {/* <MyChallenges challenges={data} /> */}

        <WritingButton />
      </section>
    </Mobile>
  );
};

export default ChallengePage;
