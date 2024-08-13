'use client';

import ChallengesHeader from '@/components/Header/ChallengesHeader';
import Mobile from '@/layouts/Mobile';
import ChallengeList from '../_components/ChallengeList';
import WritingButton from '../_components/WritingButton';
import OrderTab from './_components/OrderTab/OrderTab';

const AllChallengesPage = () => {
  return (
    <Mobile headerLayout={<ChallengesHeader title={'챌린지 목록'} />}>
      <section className="px-4 flex flex-col gap-2 ">
        <OrderTab />
        <ChallengeList />
        <WritingButton />
      </section>
    </Mobile>
  );
};

export default AllChallengesPage;
