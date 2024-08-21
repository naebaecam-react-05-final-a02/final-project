'use client';

import ChallengesHeader from '@/components/Header/ChallengesHeader';
import Mobile from '@/layouts/Mobile';
import ChallengeList from '../_components/ChallengeList';
import WritingButton from '../_components/WritingButton';
import OrderTab from './_components/OrderTab/OrderTab';

const AllChallengesPage = () => {
  return (
    <Mobile headerLayout={<ChallengesHeader title={'챌린지 목록'} />}>
      <section className="flex flex-col gap-2 ">
        <OrderTab />
        <ChallengeList />
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

export default AllChallengesPage;
